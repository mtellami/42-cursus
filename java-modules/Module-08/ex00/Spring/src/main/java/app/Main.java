package app;

import classes.PreProcessorToUpperImpl;
import classes.PrinterWithPrefixImpl;
import classes.RendererErrImpl;
import interfaces.PreProcessor;
import interfaces.Renderer;
import interfaces.Printer;

import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.context.ApplicationContext;

public class Main {
  public static void main(String[] args) {
    // PreProcessor preProcessor = new PreProcessorToUpperImpl();
    // Renderer renderer = new RendererErrImpl(preProcessor);
    // PrinterWithPrefixImpl printer = new PrinterWithPrefixImpl(renderer);
    // printer.setPrefix("Prefix");
    // printer.print("Hello!");

    ApplicationContext context = new ClassPathXmlApplicationContext("context.xml");
    Printer printer = context.getBean("printerWithPrefixOutToLower", Printer.class);
    printer.print("Hello!");
  }
}
