# Install Dependencies
install-dependencies:
	yarn install

# Environment Configuration
setup-env:
	cp .env.example .env

# Start Docker
start-docker:
	docker compose up -d --force-recreate db_dev

# Wait for Database
wait-for-db:
	@echo "Waiting for the database to be ready..."
	@until docker exec container-pg pg_isready; do \
			sleep 1; \
			echo "Waiting..."; \
	done

# Database Migration
migrate-db:
	npx prisma migrate dev --name init

# Generate Prisma Client
generate-prisma:
	npx prisma generate

# Run the Project
run-project:
	yarn start:dev

# Full Setup
setup: install-dependencies setup-env start-docker wait-for-db migrate-db generate-prisma run-project