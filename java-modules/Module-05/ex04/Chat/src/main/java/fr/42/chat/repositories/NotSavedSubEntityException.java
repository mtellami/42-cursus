package fr._42.chat.repositories;

public class NotSavedSubEntityException extends RuntimeException {
  @Override
  public String toString() {
    return ": No such sub entity\n";
  }
}
