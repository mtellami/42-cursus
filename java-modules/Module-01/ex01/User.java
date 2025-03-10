public class User {
	private Integer id;
	private String name;
	private int balance;

	public User(String name, int balance) {
		this.id = UserIdsGenerator.getInstance().generateId();
		this.name = name;
		this.balance = balance;
	}

	public void printConsole() {
		System.out.format("\nID: %d\nName: %s\nBalance: %d\n", id, name, balance);
	}
};
