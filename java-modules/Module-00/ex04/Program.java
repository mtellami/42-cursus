import java.util.Scanner;

public class Program {
	private static final int MAX_CHAR_CODES = 65535;
	private static final int MAX_HEIGHT = 10;

	private static int[] counter(String input) {
		int[] table = new int[MAX_CHAR_CODES];
		char[] array = input.toCharArray();

		for (int i = 0; i < input.length(); i++) {
			table[array[i]]++;
		}
		return table;
	}

	private static char[] rank(int[] table) {
		char[] top = new char[MAX_HEIGHT];

		for (int i = 0; i < MAX_CHAR_CODES; i++) {

		}
		return top;
	}


	public static void main(String[] args) {
		Scanner in = new Scanner(System.in);
		try {
			// String str = in.next();
			String str = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASSSSSSSSSSSSSSSSSSSSSSSSDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDWEWWKFKKDKDSKAKLSLDKSKALLLLLLLLLLRTRTETWTWWWWWWWWWWOOOOOOO42";
			int[] count = counter(str);
			char[] top = rank(count);

			for (int i = 0; i < 10; i++) {
				System.out.println(top[i]);
			}

		} catch (Exception e) {
			String err = e.getMessage() != null ? e.getMessage() : "EOF";
			System.err.println(err);
			System.exit(-1);
		}
		in.close();
	}
};
