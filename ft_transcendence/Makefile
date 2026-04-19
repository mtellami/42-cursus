# the Makefile to manage everythings from make

DEV_COMP_FILE := docker-compose.dev.yaml
ECHO_CLEAN := echo '\t clean complete' || echo '\t everything clean'

.PHONY: dev prod devbuild prodbuild devup produp devdown proddown reprod redev cleanall cleanv cleanc cleani fclean

dev:
	docker compose -f $(DEV_COMP_FILE) up -d --build

devwatch:
	docker compose -f $(DEV_COMP_FILE) up --build

prod:
	docker compose up --build

devbuild:
	docker compose -f $(DEV_COMP_FILE) build

prodbuild:
	docker compose build

devup:
	docker compose -f $(DEV_COMP_FILE) up

produp:
	docker compose up

devdown:
	docker compose -f $(DEV_COMP_FILE) down

proddown:
	docker compose down

reprod: proddown prod

redev: devdown dev

cleanc:
	@echo -n 'clean containers ...'
	@docker container rm -f $$(docker container ls -aq) > /dev/null 2>&1 && ${ECHO_CLEAN}

cleani:
	@echo -n 'clean images ...'
	@docker image rm -f $$(docker image ls -aq) > /dev/null 2>&1 && ${ECHO_CLEAN}

cleanv:
	@echo -n 'clean volumes ...'
	@docker volume rm -f $$(docker volume ls -q) > /dev/null 2>&1 && ${ECHO_CLEAN}

clean: cleanc cleani cleanv

fclean: clean
	@echo -n 'docker system prune ...' 
	@docker system prune -af > /dev/null 2>&1 && ${ECHO_CLEAN}
