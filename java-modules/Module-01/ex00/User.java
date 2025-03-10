public class User {
	private Integer id;
	private String 	name;
	private int 		balance;
	private String 	transfer;

	public Integer getId() {
		return this.id;
	}
	public String getName() {
		return this.name;
	}
	public int 	getBalance() {
		return this.balance;
	}

	public void setId(int id) {
		this.id = id;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setBalance(int balance) {
		this.balance = balance;
	}

	public String getTransfer() {
		return this.transfer;
	}
	public void setTransfer(String transfer) {
		this.transfer = transfer;
	}

	public void print() {
		System.out.format("\nId: %d\nName: %s\nBalance: %d\n", id, name, balance);
	}
};
