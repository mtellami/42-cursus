public class Program {
	public static void main(String[] args) {
		User usr1 = new User("usr1", 100);
		User usr2 = new User("usr2", 200);

		// usr1.print();
		// usr2.print();

		Transaction t1 = new Transaction(usr1, usr2);
		Transaction t2 = new Transaction(usr2, usr1);
		t1.setAmount(100);
		t2.setAmount(150);

		TransactionsLinkedList list = new TransactionsLinkedList();
		list.addTransaction(t1);
		list.addTransaction(t2);

		// list.print();
		list.removeTransaction(t1.getId());
		list.print();
	}
};
