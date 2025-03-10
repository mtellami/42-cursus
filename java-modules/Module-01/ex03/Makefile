MAIN=Program

SRC=$(MAIN).java User.java Transaction.java\
		TransactionNode.java TransactionNotFoundException.java\
		TransactionsLinkedList.java TransactionsList.java\
		UserIdsGenerator.java

CLASS=$(SRC:.java=.class)

all: $(CLASS)

$(CLASS):
	@javac $(SRC)

run: $(CLASS)
	@echo
	@java $(MAIN)

clean:
	@rm -fr $(CLASS)

re: clean all
