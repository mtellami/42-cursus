package classes;

import interfaces.PreProcessor;

public class PreProcessorToLower implements PreProcessor {
  @Override
  public String process(String message) {
    return message.toUpperCase();
  }
}
