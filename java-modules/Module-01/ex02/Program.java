public class Program {
	public static void main(String[] args) {
		User usr1 = new User("usr1", 100);
		User usr2 = new User("usr2", 200);
		User usr3 = new User("usr3", 300);

		usr1.print();
		usr2.print();
		usr3.print();

		UsersArrayList list = new UsersArrayList();

		list.addUser(usr1);
		list.addUser(usr2);
		list.addUser(usr3);

		System.out.println("--------------------------------");

		list.findUserById(0).print();
		list.findUserByIndex(2).print();
		System.out.format("Number of users: %d\n", list.getAmountUsers());
	}
};
