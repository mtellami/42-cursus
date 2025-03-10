public class Egg extends Thread {
	private static int count;
	private final Object queue;

	public Egg(int count, Object queue) {
		this.count = count;
		this.queue = queue;
	}

	@Override
	public void run() {
		for (int i = 0; i < count; i++) {
			synchronized(queue) {
				System.out.println("Egg");
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
