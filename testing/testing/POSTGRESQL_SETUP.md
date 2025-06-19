# PostgreSQL Database Setup Guide

## Prerequisites
1. PostgreSQL installed on your system
2. PostgreSQL service running on port 5432 (default)

## Database Setup

### 1. Install PostgreSQL (if not already installed)
- **Windows**: Download from https://www.postgresql.org/download/windows/
- **macOS**: `brew install postgresql`
- **Linux**: `sudo apt-get install postgresql postgresql-contrib`

### 2. Start PostgreSQL Service
- **Windows**: PostgreSQL service should start automatically
- **macOS**: `brew services start postgresql`
- **Linux**: `sudo systemctl start postgresql`

### 3. Create Database
Connect to PostgreSQL and create the database:

```sql
-- Connect to PostgreSQL as superuser
psql -U postgres

-- Create the database
CREATE DATABASE testing;

-- Verify the database was created
\l

-- Exit psql
\q
```

### 4. Update Configuration (if needed)
The application is configured to connect to:
- **Host**: localhost
- **Port**: 5432
- **Database**: testing
- **Username**: postgres
- **Password**: password

If your PostgreSQL setup uses different credentials, update `application.properties`:

```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## Running the Application

### Production Mode (PostgreSQL)
```bash
mvn spring-boot:run
```

### Development Mode (H2 Database)
```bash
mvn spring-boot:run -Dspring.profiles.active=dev
```

## Database Migration
The application is configured with `spring.jpa.hibernate.ddl-auto=update`, which means:
- Tables will be created automatically based on your JPA entities
- Existing tables will be updated if entity structure changes
- Data will be preserved between application restarts

## Troubleshooting

### Connection Issues
1. Ensure PostgreSQL is running: `pg_isready -h localhost -p 5432`
2. Check if database exists: `psql -U postgres -l`
3. Verify credentials in `application.properties`

### Port Already in Use
If port 5432 is already in use, either:
1. Stop the conflicting service, or
2. Update the port in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:YOUR_PORT/testing
   ```

### Permission Issues
If you get permission errors:
1. Ensure the postgres user has proper permissions
2. Check PostgreSQL authentication configuration in `pg_hba.conf` 