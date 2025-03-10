public class TransactionsService {
	private UsersList userDatabase;

	TransactionsService() {
		userDatabase = new UsersArrayList();
	}

	public void addUser(User user) {
		userDatabase.addUser(user);
	}
};
