package fr._42.printer.app;

import fr._42.printer.logic.Logic;

public class Program {
	public static void main(String[] args) {
    if (args.length != 2 || args[0].length() != 1 || args[0].length() != 1) {
      System.err.println("Error: invalid arguments");
      System.err.println("Usage: <program> <char for white pixel> <char for black pixel> <image path>");
      System.exit(-1);
    }

    char whiteChar = args[0].charAt(0);
    char blackChar = args[1].charAt(0);

    Logic printer = new Logic(whiteChar, blackChar);
    printer.printImage();
	}
}
