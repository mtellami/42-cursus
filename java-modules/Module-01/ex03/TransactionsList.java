import java.util.UUID;

public interface TransactionsList {
	public void addTransaction(Transaction transaction);
	public void removeTransaction(UUID id);
	public Transaction[] toArray();
};
