public class Hen extends Thread {
	private static int count;

	public Hen(int count) {
		this.count = count;
	}

	@Override
	public void run() {
		for (int i = 0; i < count; i++) {
			System.out.println("Hen");
		}
	}
}
