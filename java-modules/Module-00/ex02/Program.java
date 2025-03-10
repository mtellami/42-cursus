import java.util.Scanner;

public class Program {

	static int sumOfDigits(int number) {
		int sum = 0;
		while (number > 0) {
			sum += number % 10;
			number /= 10;
		}
		return sum;
	}

	static boolean isPrimitive(int number) {
		int i = 2;
		if (number < i)
			return false;
		while (i <= number / i) {
			if (number % i == 0)
				return false;
			i++;
		}
		return true;
	}

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int count = 0;
		while (sc.hasNext()) {
			int number = sc.nextInt();
			number = sumOfDigits(number);
			if (isPrimitive(number))
				count++;
		}
		System.out.format("Count of coffee-request : %d\n", count);
	}
}
