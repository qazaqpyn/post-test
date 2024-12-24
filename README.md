# Back End Test Project

## Prerequisites
- Docker installed and running on your machine

## Setup Instructions

1. Install Dependencies
  ```bash
  yarn install
  ```

2. Environment Configuration
  ```bash
  cp .env.example .env
  ```

3. Database Migration
  ```bash
  npx prisma migrate dev
  ```

4. Generate Prisma Client
  ```bash
  npx prisma generate
  ```

5. Run the Project
  ```bash
  make run
  ```

## API Documentation
- Swagger Documentation: http://localhost:8000/api/v1/swagger
- API Endpoint: http://localhost:8000/api/v1

## Notes
- Ensure Docker is running before executing any of the above commands
- The project uses Prisma as the ORM for database operations
- Make sure all dependencies are installed before running the project