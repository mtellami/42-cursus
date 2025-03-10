package classes;

import java.util.StringJoiner;
import java.time.Year;

public class Car {
  private String mark;
  private int year;
  private int price;

  public Car() {
    this.mark = "none";
    this.year = 0;
    this.price = 0;
  }

  public Car(String mark, int year, int price) {
    this.mark = mark;
    this.year = year;
    this.price = price;
  }

  public int yearOld() {
    return Year.now().getValue() - year;
  }

  @Override
  public String toString() {
    return new StringJoiner(", ", Car.class.getSimpleName() + "[", "]")
    .add("mark='" + mark + "'")
    .add("year='" + year)
    .add("price=" + price)
    .toString();
  }
}
