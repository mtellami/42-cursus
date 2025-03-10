public class Hen extends Thread {
	private static int count;
	private final Object queue;

	public Hen(int count, Object queue) {
		this.count = count;
		this.queue = queue;
	}

	@Override
	public void run() {
		for (int i = 0; i < count; i++) {
			synchronized(queue) {
				System.out.println("Hen");
				queue.notify();
				try {
					if (i < count - 1) {
						queue.wait();
					}
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		}
	}
}
