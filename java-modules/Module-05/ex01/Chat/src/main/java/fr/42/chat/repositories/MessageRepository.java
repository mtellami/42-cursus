package fr._42.chat.repositories;

import fr._42.chat.models.Message;

import java.util.Optional;
import java.sql.SQLException;

public interface MessageRepository {
  Optional<Message> findById(Long id) throws SQLException;
}
