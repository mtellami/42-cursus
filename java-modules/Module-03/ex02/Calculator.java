public class Calculator extends Thread {
	private int index;
	private int from;
	private int to;
	Integer[] arr;

	public Calculator(int index, int from, int to, Integer[] arr) {
		this.index = index;
		this.from = from;
		this.to = to;
		this.arr = arr;
	}

	@Override
	public void run() {
		int sum = 0;
		for (int i = from; i <= to; i++) {
			sum += arr[i];
		}
		System.out.println("worker " + index + " finished");
		synchronized(this) {
			Program.sum += sum;
		}
	}
}
