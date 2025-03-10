package fr._42.chat.repositories;

import java.sql.SQLException;
import java.util.List;

import fr._42.chat.models.User;

public interface UsersRepository {
  List<User> findAll(int page, int size) throws SQLException;
}
