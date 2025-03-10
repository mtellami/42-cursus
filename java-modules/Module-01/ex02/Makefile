MAIN=Program.java

SRC=Program.java User.java UserIdsGenerator.java\
		UserNotFoundException.java UsersArrayList.java\
		UsersList.java

CLASS=$(SRC:.java=.class)

all:
	javac $(SRC)

run:
	java $(MAIN)

clean:
	rm -fr $(CLASS)

re: clean all
