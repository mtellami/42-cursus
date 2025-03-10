import java.io.*;
import java.util.Scanner;

public class Program {
	public static void main(String[] args) {
		try {
			InputStream input = new FileInputStream("signatures.txt");
			OutputStream output = new FileOutputStream("output.txt", true);
			int size = input.available();

			String str = "This is line from program.java\n";
			byte[] bytes = str.getBytes();
			output.write(bytes);

			// System.out.format("Available bytes in file: %d\n", size);
			byte[] buffer = new byte[size];
			input.read(buffer);

			String data = new String(buffer);
			// System.out.print(data);
			input.close();
		} catch (Exception e) {
			e.getStackTrace();
		}
	}
};
