package fr._42.chat.app;

import fr._42.chat.models.Message;
import fr._42.chat.repositories.MessagesRepositoryJdbcImpl;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.Optional;
import java.util.Scanner;

public class Program {
  private static final String DB_URL = "jdbc:postgresql://localhost:5432/datasource";
  private static final String DB_USERNAME = "postgres";
  private static final String DB_PASSWORD = "password";

  public static Connection connect() {
    try {
      HikariConfig hikariConfig = new HikariConfig();
      hikariConfig.setJdbcUrl(DB_URL);
      hikariConfig.setUsername(DB_USERNAME);
      hikariConfig.setPassword(DB_PASSWORD);

      HikariDataSource hikariDataSource = new HikariDataSource(hikariConfig);
      Connection connection = hikariDataSource.getConnection();

      if (connection == null) {
        throw new SQLException("Database connection failed");
      }
      return connection;
    } catch (SQLException e) {
      return null;
    }
  }

  public static void main(String[] atgs) {

    Connection connection = connect();
    if (connection == null) {
      System.err.println("Database connection failed.");
      System.exit(-1);
    }

    Scanner scanner = new Scanner(System.in);
    System.out.print("Enter message Id: ");
    if (!scanner.hasNextLong()) {
      System.err.println("invalid id format");
      System.exit(-1);
    }

    Long id = scanner.nextLong();
    MessagesRepositoryJdbcImpl messagesRepository = new MessagesRepositoryJdbcImpl(connection);
    
    try {
      Optional<Message> message = messagesRepository.findById(id);
      if (message.isPresent()) {
        System.out.println(message.get());
      } else {
        System.out.println("Message not found");
      }
    } catch (SQLException e) {
      System.out.println(e.getMessage());
    }
  }
}
