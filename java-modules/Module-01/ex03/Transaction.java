import java.util.UUID;

public class Transaction {
	private final UUID 	id;
	private User 				reciever;
	private User 				sender;
	private Integer 		amount;

	Transaction(User sender, User reciever) {
		this.id = UUID.randomUUID();
		this.sender = sender;
		this.reciever = reciever;
		this.amount = 0;
	}

	public UUID getId() {
		return this.id;
	}

	public User getReciever() {
		return this.reciever;
	}

	public User getSender() {
		return this.sender;
	}

	public Integer getAmount() {
		return this.amount;
	}

	public void setAmount(int transfer) {
		if (transfer >= 0) {
			if (sender.getBalance() < transfer) {
				System.err.println("Sender does not have anough amount to transfer");
				System.exit(-1);
			}
		} else {
			if (reciever.getBalance() < Math.abs(transfer)) {
				System.err.println("Sender does not have anough amount to transfer");
				System.exit(-1);
			}
		}

		sender.setBalance(sender.getBalance() - transfer);
		reciever.setBalance(reciever.getBalance() + transfer);
		this.amount = transfer;
	}

	public void print() {
		System.out.format("\nid: %s\n", id);
		System.out.format("Sender: %s, %d\n", sender.getName(), -amount);
		System.out.format("Sender: %s, %d\n\n", reciever.getName(), amount);

		System.out.format("- SENDER\nid: %s\nname: %s\nbalance: %d\n\n",
			sender.getId(), sender.getName(), sender.getBalance());
		System.out.format("- RECIPIENT\nid: %s\nname: %s\nbalance: %d\n",
			reciever.getId(), reciever.getName(), reciever.getBalance());
	}
}
