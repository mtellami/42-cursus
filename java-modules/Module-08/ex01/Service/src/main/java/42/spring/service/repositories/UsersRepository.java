package _42.spring.service.repositories;

import java.util.Optional;

import _42.spring.service.model.User;

public interface UserRepository extends CrudRepository<User> {
  Optional<User> findByEmail(String email);
}
