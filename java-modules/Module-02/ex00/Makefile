MAIN=Program

SRC=$(MAIN).java

CLASS=$(SRC:.java=.class)

all: $(CLASS)

$(CLASS):
	@javac $(SRC)

run: $(CLASS)
	@java $(MAIN)

clean:
	@rm -fr $(CLASS)

re: clean all
