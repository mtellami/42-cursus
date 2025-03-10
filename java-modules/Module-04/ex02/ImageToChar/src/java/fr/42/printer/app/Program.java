package fr._42.printer.app;

import fr._42.printer.logic.Logic;
import fr._42.printer.logic.CommandLineArgs;
import com.beust.jcommander.JCommander;

public class Program {
  public static void main(String[] args) {
    try {
      CommandLineArgs cmdArgs = new CommandLineArgs();
      JCommander.newBuilder().addObject(cmdArgs).build().parse(args);

      String white = cmdArgs.getWhite();
      String black = cmdArgs.getBlack();
      if (white == null || black == null) {
        throw new Exception("invalid arguments");
      }

      new Logic(white, black).printImage();

    } catch (Exception e) {
      System.out.println(e.getMessage());
    } 
  }
}
