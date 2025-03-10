package fr._42.chat.models;

import java.util.List;
import java.util.Objects;

public class Chatroom {
  private final long id;
  private String name;
  private User owner;
  private List<Message> messages;

  public Chatroom(long id, String name, User owner, List<Message> messages) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.messages = messages;
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name, owner, messages);
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null || getClass() != obj.getClass()) return false;

    Chatroom room = (Chatroom)obj;
    return id == room.getId()
      && name.equals(room.getName())
      && owner.equals(room.getOwner())
      && messages.equals(room.getMessages()); 
  }

  @Override
  public String toString() {
    return "Chatroom{" +
      "id=" + id +
      ", name ='" + name + "'" +
      ", owner=" + owner +
      ", messages=" + messages +
      "}";
  }

  // getters
  public long getId() {
    return id;
  }
  public String getName() {
    return name;
  }
  public User getOwner() {
    return owner;
  }
  public List<Message> getMessages() {
    return messages;
  }

  // setters
  public void setName(String name) {
    this.name = name;
  }
  public void setOwner(User owner) {
    this.owner = owner;
  }
  public void setMessages(List<Message> messages) {
    this.messages = messages;
  }
}
