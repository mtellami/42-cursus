package classes;

import java.time.LocalDateTime;

import interfaces.Printer;
import interfaces.Renderer;

public class PrinterWithDateTimeImpl implements Printer {
  private final Renderer renderer;

  public PrinterWithDateTimeImpl(Renderer renderer) {
    this.renderer = renderer;
  }

  @Override
  public void print(String message) {
    renderer.render(LocalDateTime.now() + " " + message);
  }
}
