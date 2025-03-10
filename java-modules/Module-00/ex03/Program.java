import java.util.Scanner;

public class Program {
	private static final String EOF = "42";
	private static final String WEEK_TITLE = "Week ";
	private static final int 		WEEKS_LIMIT = 18;
	private static final int 		TESTS_NUMBER = 5;

	private static int storage = 0;

	private static void display(int grade, int week) {
		System.out.format("%s %d ", WEEK_TITLE, week);
		while (grade > 0) {
			System.out.print("=");
			grade--;
		}
		System.out.println(">");
	}

	private static int minGrade(Scanner in) {
		int min = 9;
		for (int i = 0; i < TESTS_NUMBER; i++) {
			int grade = in.nextInt();
			if (grade < 1 || grade > 9) {
				return -1;
			}
			min = grade < min ? grade : min;
		}
		in.nextLine();
		return min;
	}

	private static int reverse(int number) {
		int reverse = 0;
		while (number > 0) {
			reverse = (reverse * 10) + (number % 10);
			number /= 10;
		}
		return reverse;
	}

	public static void main(String[] args) {
		Scanner input = new Scanner(System.in);
		int weekCount = 0;

		try {
			for (; weekCount < WEEKS_LIMIT && input.hasNext(); weekCount++) {
				String week = input.nextLine();
				if (week.equals(EOF)) {
					break;
				}
				if (!week.equals(WEEK_TITLE + (weekCount + 1))) {
					throw new Exception("IllegalArgument");
				}
				int min = minGrade(input);
				if (min == -1) {
					throw new Exception("IllegalArgument");
				}
				storage = storage * 10 + min;
			}
			storage = reverse(storage);
			for (int i = 1; i <= weekCount; i++) {
				display(storage % 10, i);
				storage /= 10;
			}
		} catch (Exception e) {
			String err = e.getMessage() != null ? e.getMessage() : "EOF";
			System.err.println(err);
			System.exit(-1);
		}
		input.close();
	}
}
