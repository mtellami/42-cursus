public interface UsersList {
	public void addUser(User user);
	public User findUserById(int id);
	public User findUserByIndex(int index);
	public int getAmountUsers();
}
