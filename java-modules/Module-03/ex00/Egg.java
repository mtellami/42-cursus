public class Egg extends Thread {
	private static int count;

	public Egg(int count) {
		this.count = count;
	}

	@Override
	public void run() {
		for (int i = 0; i < count; i++) {
			System.out.println("Egg");
		}
	}
}
