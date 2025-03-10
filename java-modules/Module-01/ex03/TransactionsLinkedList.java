import java.util.UUID;

public class TransactionsLinkedList implements TransactionsList {
	private Integer length = 0;
	private TransactionNode head;

	@Override
	public void addTransaction(Transaction transaction) {
		TransactionNode node = new TransactionNode(transaction, head);
		if (head != null) {
			head.setPrevious(node);
		}
		head = node;
		length++;
	}

	@Override
	public void removeTransaction(UUID id) {
		TransactionNode current = head;
		while (current != null) {
			if (current.getData().getId().equals(id)) {
				if (current.getPrevious() != null) {
					current.getPrevious().setNext(current.getNext());
				}
				if (current.getNext() != null) {
					if (current.getPrevious() == null) {
						head = current.getNext();
					}
					current.getNext().setPrevious(current.getPrevious());
				}
				length--;
				return;
			}
			current = current.getNext();
		}
		throw new TransactionNotFoundException();
	}

	@Override
	public Transaction[] toArray() {
		Transaction[] array = new Transaction[length];

		TransactionNode current = head;
		for (int i = 0; i < length && current != null; i++) {
			array[i] = current.getData();
			current = current.getNext();
		}
		return array;
	}

	public void print() {
		Transaction[] arr = toArray();
		for (Transaction tr : arr ) {
			tr.print();
		}
		}
};
