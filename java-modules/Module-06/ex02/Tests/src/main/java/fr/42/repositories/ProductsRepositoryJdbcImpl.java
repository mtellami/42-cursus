package fr._42.numbers.repositories;

import fr._42.numbers.models.Product;

import java.sql.*;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

public class ProductsRepositoryJdbcImpl implements ProductsRepository {
  private final Connection connection;

  public ProductsRepositoryJdbcImpl(Connection connection) {
    this.connection = connection;
  }

  @Override
  public List<Product> findAll() {
    List<Product> products = new LinkedList<>();
    try {
      Statement statement = connection.createStatement();
      ResultSet resultSet = statement.executeQuery("SELECT * FROM Product");
      while (resultSet.next()) {
        products.add(new Product(
          resultSet.getLong("id"),
          resultSet.getString("name"),
          resultSet.getInt("price")
        ));
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }
    return products;
  }

  @Override
  public Optional<Product> findById(Long id) {
    try {
      PreparedStatement statement = connection.prepareStatement("SELECT * FROM Product WHERE id = ?");
      statement.setLong(1, id);
      ResultSet resultSet = statement.executeQuery();
      if (resultSet.next()) {
        return Optional.of(new Product(
          resultSet.getLong("id"),
          resultSet.getString("name"),
          resultSet.getInt("price")
        ));
      } else {
        throw new RuntimeException();
      }
    } catch (SQLException e) {
      // e.printStackTrace();
      return Optional.empty();
    }
  }

  @Override
  public void update(Product product) {
    try {
      PreparedStatement statement = connection.prepareStatement("UPDATE Product SET name = ?, price = ? WHERE id = ?");
      statement.setString(1, product.getName());
      statement.setInt(2, product.getPrice());
      statement.setLong(3, product.getId());
      statement.executeUpdate();
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }

  @Override
  public void save(Product product) {
    try {
      PreparedStatement statement = connection.prepareStatement("INSERT INTO Product (name, price) VALUES (?, ?)");
      statement.setString(1, product.getName());
      statement.setInt(2, product.getPrice());
      statement.executeUpdate();
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }

  @Override
  public void delete(Long id) {
    try {
      PreparedStatement statement = connection.prepareStatement("DELETE FROM Product WHERE id = ?");
      statement.setLong(1, id);
      statement.executeUpdate();
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }
}
