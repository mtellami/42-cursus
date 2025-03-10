public class Program {
	public static void main(String[] args) {
	
		User sender =  new User();
		sender.setId(1);
		sender.setName("moad");
		sender.setBalance(1500);
		sender.print();

		User recipient = new User();
		recipient.setId(2);
		recipient.setName("tellami");
		recipient.setBalance(1000);
		recipient.print();

		Transaction transaction = new Transaction();
		transaction.setSender(sender);
		transaction.setRecipient(recipient);
		transaction.setAmount(500);
		transaction.print();
	}
};
