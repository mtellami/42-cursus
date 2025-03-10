import java.util.Random;
import java.util.ArrayList;

public class Program {
	private static final int MAX_THREADS = 2000000;
	private static final int MAX_MODULO = 1000;
	public static int sum;

	public static int[] parseArgs(String[] args) {
		if (args.length != 2) {
			System.err.println("Error: wrong arguments"); System.exit(-1);
		}
		if (!args[0].matches("--arraySize=\\d++") || !args[1].matches("--threadsCount=\\d++")) {
			System.err.println("Error: wrong flag");
			System.exit(-1);
		}
		int[] numbers = new int[2];
		try {
			int arraySize = Integer.parseInt(args[0].split("=")[1]);
			int threadsCount = Integer.parseInt(args[1].split("=")[1]);
			if (arraySize > MAX_THREADS || threadsCount > arraySize) {
				throw new Exception();
			}
			numbers[0] = arraySize;
			numbers[1] = threadsCount;
		} catch (Exception e) {
			System.err.println("Error: exceeds maximum size");
			System.exit(-1);
		}
		return numbers;
	}

	public static void main(String[] args) {
		int[] numbers = parseArgs(args);
		int arraySize = numbers[0];
		int threadsCount = numbers[1];

		Random random = new Random();
		Integer[] arr = new Integer[arraySize];

		for (int i = 0; i < arraySize; i++) {
			arr[i] = random.nextInt(MAX_MODULO - 1);
		}

		// Print arr sum
		int sm = 0;
		for (int x : arr) {
			sm += x;
		}
    System.out.println("Sum: " + sm);

		// Create threads
		ArrayList<Thread> threads = new ArrayList<>();
		int chunk = arraySize / threadsCount;
		int start = 0;
		int end = chunk;

		for (int i = 0; i < threadsCount - 1; i++) {
			threads.add(new Calculator(i + 1, start, end, arr));
			start += chunk + 1;
			end += start;
		}
		threads.add(new Calculator(threadsCount, start, arraySize - 1, arr));

		// run and wait
		for (Thread thread : threads) {
			thread.start();
		}
		for (Thread thread : threads) {
			try {
				thread.join();
			} catch (InterruptedException e) {
				throw new RuntimeException(e);
			}
		}

		// Array sum by threads
		System.out.println("Sum by threads: " + sum);
	}
}
