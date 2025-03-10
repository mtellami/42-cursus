public class Program {
	public static void main(String[] args) {
		if (args.length != 1) {
			System.err.println("Error: wrong number of arguments");
			System.exit(-1);
		}

		String[] input = args[0].split("=");
		if (!input[0].equals("--count")) {
			System.err.println("Error: Wrong flag");
			System.exit(-1);
		}

		try {
			int count = Integer.parseInt(input[1]);
			Object queue = new Object();

			Egg eggThread = new Egg(count, queue);
			Hen henThread = new Hen(count, queue);

			eggThread.start();
			henThread.start();

			eggThread.join();
			henThread.join();

			for (int i = 0; i < count; i++) {
				System.out.println("Human");
			}
		} catch (Exception e) {
			System.err.println(e.getMessage());
			System.exit(-1);
		}
	}
}
