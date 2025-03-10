package fr._42.chat.repositories;

import fr._42.chat.models.Message;
import fr._42.chat.models.Chatroom;
import fr._42.chat.models.User;

import java.sql.*;
import java.util.Optional;

public class MessagesRepositoryJdbcImpl implements MessageRepository {
  private final Connection connection;

  public MessagesRepositoryJdbcImpl(Connection dataSource) {
    this.connection = dataSource;
  }

  @Override
  public Optional<Message> findById(Long id) throws SQLException {
    Statement statement = connection.createStatement();
    ResultSet rs = statement.executeQuery("SELECT * FROM Message WHERE id = " + id);

    if (rs.next()) {
      long messageId = rs.getLong("id");
      long authorId = rs.getLong("author");
      long roomId = rs.getLong("chatroom");
      String messageText = rs.getString("text");
      Timestamp timestamp = rs.getTimestamp("datetime");

      ResultSet rs2 = statement.executeQuery("SELECT * FROM User WHERE id = " + authorId);
      rs2.next();
      User author = new User(rs2.getLong("id"), rs2.getString("login"), rs2.getString("password"), null, null);

      ResultSet rs3 = statement.executeQuery("SELECT * FROM Chatroom WHERE id = " + roomId);
      rs3.next();
      Chatroom room = new Chatroom(rs3.getLong("id"), rs3.getString("name"), null, null);

      return Optional.of(new Message(messageId, author, room, messageText, timestamp));
    } else {
      return Optional.empty();
    }
  }

  @Override
  public Long save(Message message) throws SQLException {
    try {
      PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO Message(author, chatroom, text, datetime) VALUES (?, ?, ?, ?);");
      preparedStatement.setLong(1, message.getAuthor().getId());
      preparedStatement.setLong(2, message.getRoom().getId());
      preparedStatement.setString(3, message.getText());
      preparedStatement.setTimestamp(4, message.getDatetime());

      preparedStatement.executeUpdate();

      PreparedStatement idStatement = connection.prepareStatement("SELECT id FROM Message WHERE datetime = ?;");
      idStatement.setTimestamp(1, message.getDatetime());

      ResultSet resultSet = idStatement.executeQuery();
      resultSet.next();

      return resultSet.getLong("id");
    }
    catch (SQLException e) {
      throw new NotSavedSubEntityException();
    }
  }

  @Override
  public void update(Message message) throws SQLException {
    try {
      PreparedStatement preparedStatement = connection.prepareStatement("UPDATE Message " +
        "SET author = ?, chatroom = ?, text = ?, datetime = ? WHERE id = ?;");
      preparedStatement.setLong(1, message.getAuthor().getId());
      preparedStatement.setLong(2, message.getRoom().getId());
      preparedStatement.setString(3, message.getText());
      preparedStatement.setTimestamp(4, message.getDatetime());
      preparedStatement.executeUpdate();
    } catch (SQLException e) {
      throw new NotSavedSubEntityException();
    }
  }
}
