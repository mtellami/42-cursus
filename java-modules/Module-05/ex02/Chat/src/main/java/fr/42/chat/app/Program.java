package fr._42.chat.app;

import fr._42.chat.models.Message;
import fr._42.chat.models.Chatroom;
import fr._42.chat.models.User;
import fr._42.chat.repositories.MessagesRepositoryJdbcImpl;
import fr._42.chat.repositories.MessageRepository;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;

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

    User creator = new User(7L, "userone", "passwordone", new ArrayList(), new ArrayList());
    User author = creator;

    Chatroom room = new Chatroom(8L, "room", creator, new ArrayList());
    Message message = new Message(0, author, room, "Hello!", new Timestamp(System.currentTimeMillis()));

    MessageRepository messagesRepository = new MessagesRepositoryJdbcImpl(connection);

    try {
      messagesRepository.save(message);
      System.out.println(message.getId());
    }
    catch (SQLException e) {
      System.err.println(e.getMessage());
    }
  }
}
