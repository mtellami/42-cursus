package _42.spring.service.models;

public class User {
  private Long id;
  private String email;

  public User(Long id, String email) {
    this.id = id;
    this.email = email;
  }
  public User(String email) {
    this.email = email;
  }

  // getters
  public Long getId() {
    return id;
  }
  public String getEmail() {
    return email;
  }

  // setters
  public void setId(Long id) {
    this.id = id;
  }
  public void setEmail(String email) {
    this.email = email;
  }

  @Override
  public String toString() {
    return "User{" +
      "id=" + id +
      ", email='" + email + "'" +
      "}";
  }
}
