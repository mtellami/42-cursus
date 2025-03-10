public class User {
	private Integer id;
	private String 	name;
	private int 		balance;

	public User(String name, int balance) {
		this.id = UserIdsGenerator.getInstance().generateId();
		this.name = name;
		this.balance = balance;
	}

	public Integer getId() {
		return this.id;
	}
	public String getName() {
		return this.name;
	}
	public int 	getBalance() {
		return this.balance;
	}

	public void setName(String name) {
		this.name = name;
	}
	public void setBalance(int balance) {
		this.balance = balance;
	}

	public void print() {
		System.out.format("Id: %d\nName: %s\nBalance: %d\n\n", id, name, balance);
	}
};
