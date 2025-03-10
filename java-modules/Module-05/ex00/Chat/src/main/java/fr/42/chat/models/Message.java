package fr._42.chat.models;

import java.util.Objects;

public class Message {
  private final long id;
  private User author;
  private Chatroom room;
  private String text;
  private String datetime;

  public Message(long id, User author, Chatroom room, String text, String datetime) {
    this.id = id;
    this.author = author;
    this.room = room;
    this.text = text;
    this.datetime = datetime;
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, author, room, text, datetime);
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null || getClass() != obj.getClass()) return false;

    Message message = (Message)obj;
    return id == message.getId()
      && author.equals(message.getAuthor())
      && room.equals(message.getRoom())
      && text.equals(message.getText())
      && datetime.equals(message.getDatetime());
  }

  @Override
  public String toString() {
    return "Message{" +
      "id=" + id +
      ", author=" + author +
      ", room=" + room + 
      ", text='" + text + "'" +
      ", datetime='" + datetime + "'" +
      "}";
  }

  // getters
  public long getId() {
    return id;
  }
  public User getAuthor() {
    return author;
  }
  public Chatroom getRoom() {
    return room;
  }
  public String getText() {
    return text;
  }
  public String getDatetime() {
    return datetime;
  }

  // setters
  public void setAuthor(User author) {
    this.author = author;
  }
  public void setRoom(Chatroom room) {
    this.room = room;
  }
  public void setText(String text) {
    this.text = text;
  }
  public void setDatetime(String datetime) {
    this.datetime = datetime;
  }
}
