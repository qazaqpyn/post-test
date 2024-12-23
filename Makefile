run:
	docker compose up -d --force-recreate db_dev
	yarn start:dev
