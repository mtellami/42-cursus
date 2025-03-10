public class Program {
	public static void main(String[] args) {
		User user1 = new User("user1", 100);
		User user2 = new User("user2", 200);
		User user3 = new User("user3", 300);

		user1.printConsole();
		user2.printConsole();
		user3.printConsole();
	}
};
