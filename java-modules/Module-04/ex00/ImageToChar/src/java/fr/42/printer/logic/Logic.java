package fr._42.printer.logic;

import javax.imageio.ImageIO;
import java.awt.Color;
import java.awt.image.BufferedImage;
import java.io.File;

public class Logic {
  private final char whiteChar;
  private final char blackChar;
  private final String imagePath;

  public Logic(char whiteChar, char blackChar, String imagePath) {
    this.whiteChar = whiteChar;
    this.blackChar = blackChar;
    this.imagePath = imagePath;
  }

  public void printImage() {
    try {
      BufferedImage image = ImageIO.read(new File(imagePath));
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
      System.out.println(err.getMessage());
    }
  }
}
