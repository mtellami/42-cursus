package fr._42.printer.logic;

import com.diogonunes.jcdp.color.api.Ansi;
import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;
import java.awt.Color;

public class Logic {
  private final String white;
  private final String black;

  public Logic(String white, String black) {
    this.white = white;
    this.black = black;
  }

  private String getJCDPColor(String color) {
    switch (color) {
      case "RED":
        return Ansi.colorize(" ", Ansi.BColor.RED);
      case "GREEN":
        return Ansi.colorize(" ", Ansi.BColor.GREEN);
      case "BLUE":
        return Ansi.colorize(" ", Ansi.BColor.BLUE);
      case "YELLOW":
        return Ansi.colorize(" ", Ansi.BColor.YELLOW);
      case "MAGENTA":
        return Ansi.colorize(" ", Ansi.BColor.MAGENTA);
      case "CYAN":
        return Ansi.colorize(" ", Ansi.BColor.CYAN);
      case "WHITE":
        return Ansi.colorize(" ", Ansi.BColor.WHITE);
    }
  }

  public void printImage() {
    try {
      BufferedImage image = ImageIO.read(Logic.class.getResource("/resources/it.bmp"));
      for (int x = 0; x < image.getHeight(); x++) {
        for (int y = 0; y < image.getWidth(); y++) {
          int color = image.getRGB(y, x);
          if (color == Color.BLACK.getRGB()) {
            System.out.println(getJCDPColor(black));
          } else if (color == Color.WHITE.getRGB()) {
            System.out.println(getJCDPColor(white));
          }
        }
        System.out.println();
      }
    } catch (Exception err) {
      System.err.println(err.getMessage());
    }
  }
}
