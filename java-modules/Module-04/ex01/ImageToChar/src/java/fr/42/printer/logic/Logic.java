package fr._42.printer.logic;

import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;
import java.awt.Color;

public class Logic {
  private final char whiteChar;
  private final char blackChar;

  public Logic(char whiteChar, char blackChar) {
    this.whiteChar = whiteChar;
    this.blackChar = blackChar;
  }

  public void printImage() {
    try {
      BufferedImage image = ImageIO.read(Logic.class.getResource("/resources/it.bmp"));
      for (int x = 0; x < image.getHeight(); x++) {
        for (int y = 0; y < image.getWidth(); y++) {
          int color = image.getRGB(y, x);
          if (color == Color.BLACK.getRGB()) {
            System.out.print(blackChar);
          } else if (color == Color.WHITE.getRGB()) {
            System.out.print(whiteChar);
          }
        }
        System.out.println();
      }
    } catch (Exception err) {
      System.err.println(err.getMessage());
    }
  }
}
