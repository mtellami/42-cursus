package app;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.Scanner;

public class App
{
  private static Class<?> inputClass;

  public static void main( String[] args ) throws ClassNotFoundException
  {
    Scanner scanner = new Scanner(System.in);

    Class<?> User = Class.forName("classes.User");
    Class<?> Car = Class.forName("classes.Car");

    System.out.println("Classes:\n%s\n%s".formatted(User.getSimpleName(), Car.getSimpleName()));
    System.out.println("---------------------");
    System.out.print("Enter class name:\n-> ");

    String className = scanner.nextLine();
    inputClass = Class.forName("classes." + className);

    Field[] fields = inputClass.getDeclaredFields();
    Method[] methods = inputClass.getDeclaredMethods();

    System.out.println("fields:");
    for (Field field : fields) {
      String type = field.getAnnotatedType().toString();
      if (type.contains("java.lang.")) {
        type = type.substring(10);
      }
      System.out.println("  %s %s".formatted(type, field.getName()));
    }

    System.out.println("methods:");
    for (Method method : methods) {
      if (method.getName().equals("toString")) {
        continue;
      }
      String type = method.getAnnotatedReturnType().toString();
      if (type.contains("java.lang.")) {
        type = type.substring(10);
      }
      String params = Arrays.toString(method.getParameterTypes());
      params = params.substring(1, params.length() - 1);
      System.out.println("  %s %s(%s)".formatted(type, method.getName(), params));
    }
    System.out.println("---------------------");

    System.out.println("Let's create an object.");

    // finish it latter - no much to learn ..
  }
}
