public class TransactionNode {
	private Transaction data;
	private TransactionNode previous;
	private TransactionNode next;

	public TransactionNode(Transaction data, TransactionNode next) {
		this.data = data;
		this.next = next;
	}

	public Transaction getData() {
		return data;
	}

	public void setNext(TransactionNode next) {
		this.next = next;
	}

	public TransactionNode getNext() {
		return next;
	}

	public void setPrevious(TransactionNode previous) {
		this.previous = previous;
	}

	public TransactionNode getPrevious() {
		return previous;
	}
};
