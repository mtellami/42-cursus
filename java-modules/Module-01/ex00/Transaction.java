import java.util.UUID;

public class Transaction {
	private final UUID 	id;
	private User 				recipient;
	private User 				sender;
	private String 			category;
	private int 				amount;

	Transaction() {
		this.id = UUID.randomUUID();
	}

	public UUID getId() {
		return this.id;
	}

	public User getRecipient() {
		return this.recipient;
	}
	public void setRecipient(User recipient) {
		this.recipient = recipient;
	}

	public User getSender() {
		return this.sender;
	}
	public void setSender(User sender) {
		this.sender = sender;
	}

	public String getCategory() {
		return this.category;
	}

	public int getAmount() {
		return this.amount;
	}
	public void setAmount(int transferAmount) {
		if (transferAmount >= 0) {
			if (sender.getBalance() < transferAmount) {
				System.err.println("Sender does not have anough amount to transfer");
				System.exit(-1);
			}
			sender.setTransfer("OUTCOME");
			recipient.setTransfer("INCOME");
		} else {
			if (recipient.getBalance() < Math.abs(transferAmount)) {
				System.err.println("Sender does not have anough amount to transfer");
				System.exit(-1);
			}
			sender.setTransfer("INCOME");
			recipient.setTransfer("OUTCOME");
		}

		sender.setBalance(sender.getBalance() - transferAmount);
		recipient.setBalance(recipient.getBalance() + transferAmount);
		this.amount = transferAmount;
	}

	public void print() {
		System.out.format("\nid: %s\n", id);
		System.out.format("Sender: %s, %d %s\n", sender.getName(), -amount, sender.getTransfer());
		System.out.format("Sender: %s, %d %s\n\n", recipient.getName(), amount, recipient.getTransfer());

		System.out.format("- SENDER\nid: %s\nname: %s\nbalance: %d\n\n", sender.getId(), sender.getName(), sender.getBalance());
		System.out.format("- RECIPIENT\nid: %s\nname: %s\nbalance: %d\n", recipient.getId(), recipient.getName(), recipient.getBalance());
	}
};
