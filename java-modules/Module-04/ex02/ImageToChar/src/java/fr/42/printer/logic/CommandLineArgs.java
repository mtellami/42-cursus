package fr._42.printer.logic;

import com.beust.jcommander.Parameter;
import java.util.List;

public class CommandLineArgs {

  @Parameter
  private List<String> params;

  public String getWhite() {
    for (String str : params) {
      if (str.startsWith("--white=")) {
        return str.split("=")[1];
      }
    }
    return null;
  }

  public String getBlack() {
    for (String str : params) {
      if (str.startsWith("--black=")) {
        return str.split("=")[1];
      }
    }
    return null;
  }
}

