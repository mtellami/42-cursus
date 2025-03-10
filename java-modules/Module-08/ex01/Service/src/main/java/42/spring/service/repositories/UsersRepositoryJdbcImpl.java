package _42.spring.service.repositories;

import java.beans.Statement;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.sql.DataSource;

import _42.spring.service.models.User;

public class UserRepositoryJdbcImpl implements UserRepository {
  private DataSource datasource;

  public UserRepositoryJdbcImpl(DataSource datasource) {
    this.datasource = datasource;
  }

  @Override
  public Optional<User> findById(Long id) {
    try (Connection connection = datasource.getConnection()) {
      Statement st = connection.createStatement();
      ResultSet rs = st.executeQuery("SELECT * FROM User WHERE id = " + id);

      if (rs.next()) {
        Long userId = rs.getLong("id");
        String email = rs.getString("email");
        return Optional.of(new User(userId, email));
      }
      st.close();
    } catch (SQLException e) {
      e.printStackTrace();
    }
    return Optional.empty();
  }

  @Override
  public List<User> findAll() { List<User> users = new ArrayList<>();
    try (Connection connection = datasource.getConnection()) {
      Statement st = connection.createStatement();
      ResultSet rs = st.executeQuery("SELECT * FROM User");

      while (rs.next()) {
        Long id = rs.getLong("id");
        String email = rs.getString("email");
        users.add(new User(id, email));
      }
      st.close();
    } catch (SQLException e) {
      e.printStackTrace();
    }
    return users;
  }

  @Override
  public void save(User entity) {
    try (Connection connection = datasource.getConnection()) {
      PreparedStatement st = connection.prepareStatement("INSERT INTO User(email) VALUES (?)", Statement.RETURN_GENERATED_KEYS);
      st.setString(1, entity.getEmail());
      st.executeUpdate();

      ResultSet rs = st.getGeneratedKeys();
      if (rs.next()) {
        Long id = rs.getLong("id");
        entity.setId(id);
      }
      st.close();
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }

  @Override
  public void update(User entity) {
    try (Connection connection = datasource.getConnection()) {
      PreparedStatement st = connection.prepareStatement("UPDATE User SET email = ? WHERE id = ?");
      st.setString(1, entity.getEmail());
      st.setLong(2, entity.getId());
      st.executeUpdate();
      st.close();
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }

  @Override
  public void delete(Long id) {
    try (Connection connection = datasource.getConnection()) {
      PreparedStatement st = connection.prepareStatement("DELETE FROM User WHERE id = ?");
      st.setLong(1, id);
      st.executeUpdate();
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }

  @Override
  public Optional<User> findByEmail(String email) {
    try (Connection connection = datasource.getConnection()) {
      Statement st = connection.createStatement();
      ResultSet rs = st.executeQuery("SELECT * FROM User WHERE email = " + email);

      if (rs.next()) {
        Long id = rs.getLong("id");
        String userEmail = rs.getString("email");
        return Optional.of(new User(id, userEmail));
      } else {
        throw new SQLException();
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }
    return Optional.empty();
  }
}
