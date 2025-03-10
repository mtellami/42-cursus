import java.util.Scanner;

public class Program {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);

		try {
			int number = sc.nextInt();
			int i = 2;
			if (number < i)
				throw new Exception("IllegalArgument");
			while (i <= number / i) {
				if (number % i == 0) {
					System.out.format("false %d\n", i - 1);
					return;
				}
				i++;
			}
			System.out.format("true %d\n", i - 1);
		} catch (Exception e) {
			System.err.println(e.getMessage());
			System.exit(-1);
		}
	}
}
