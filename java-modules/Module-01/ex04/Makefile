MAIN=Program

SRC=$(MAIN).java User.java TransactionsService.java\
		UsersList.java

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
