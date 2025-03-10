package fr._42.chat.repositories;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import fr._42.chat.models.User;

public class UsersRepositoryJdbcImpl implements UsersRepository {
  private final Connection connection;

  public UsersRepositoryJdbcImpl(Connection datasource) {
    this.connection = datasource;
  }

  @Override
  public List<User> findAll(int page, int size) throws SQLException {
    int offset = page * size;
    List<User> users = new ArrayList<>();

    PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM User LIMIT ? OFFSET ?");
    preparedStatement.setInt(1, size);
    preparedStatement.setInt(2, offset);
    
    ResultSet rs = preparedStatement.executeQuery();
    while (rs.next()) {
      Long userId = rs.getLong("id");
      String userLogin = rs.getString("login");
      String userPassword = rs.getString("password");

      User user = new User(userId, userLogin, UserPassword, null, null);
      // wrong database table implementation, cant get it in SINGLE query , reimplement it latter.

      users.add(user);
    }
    return users;
  }
}
