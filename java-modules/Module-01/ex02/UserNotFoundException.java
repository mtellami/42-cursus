public class UserNotFoundException extends RuntimeException {
	@Override
	public String toString() {
		return "User Not Found";
	}
}
