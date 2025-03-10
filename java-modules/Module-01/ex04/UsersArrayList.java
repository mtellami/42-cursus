public class UsersArrayList implements UsersList {
	private User[] dataUser = new User[10];
	private int userCount = 0;

	@Override
	public void addUser(User user) {
		if (userCount >= dataUser.length) {
			User[] tmp = new User[(int)(dataUser.length * 1.5)];
			for (int i = 0; i < dataUser.length; i++) {
				tmp[i] = dataUser[i];
			}
			dataUser = tmp;
		}
		dataUser[userCount++] = user;
	}

	@Override
	public User findUserById(int id) {
		for (int i = 0; i < userCount; i++) {
			if (dataUser[i].getId() == id) {
				return dataUser[i];
			}
		}
		throw new UserNotFoundException();
	}

	@Override
	public User findUserByIndex(int index) {
		if (index > userCount) {
			throw new UserNotFoundException();
		}
		return dataUser[index];
	}

	@Override
	public int getAmountUsers() {
		return userCount;
	}
}
