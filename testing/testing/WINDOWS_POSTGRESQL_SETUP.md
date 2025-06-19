# Windows PostgreSQL Setup Guide

## Step 1: Install PostgreSQL

### Option A: Manual Installation (Recommended)
1. **Download PostgreSQL**:
   - Go to: https://www.postgresql.org/download/windows/
   - Click "Download the installer"
   - Download the latest version (16.x)

2. **Run the Installer**:
   - Right-click the downloaded file and "Run as administrator"
   - Choose installation directory (default is fine)
   - **IMPORTANT**: Set a password for the `postgres` user
   - Keep default port: 5432
   - Complete the installation

3. **Add to PATH** (if not done automatically):
   - Open System Properties → Advanced → Environment Variables
   - Add `C:\Program Files\PostgreSQL\16\bin` to PATH (adjust version number)
   - Restart your terminal/PowerShell

### Option B: Using Chocolatey (if available)
```powershell
# Install Chocolatey first (run in admin PowerShell)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install PostgreSQL
choco install postgresql
```

## Step 2: Verify Installation

Open a new PowerShell window and run:
```powershell
psql --version
```

You should see something like: `psql (PostgreSQL) 16.x`

## Step 3: Create the Database

### Option A: Using the Batch Script (Easiest)
1. Navigate to your project directory
2. Run: `.\setup_database.bat`
3. Enter your PostgreSQL password when prompted

### Option B: Manual Commands
```powershell
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE testing;

# Verify it was created
\l

# Exit
\q
```

## Step 4: Configure Your Application

### Option A: Set Environment Variable (Recommended)
```powershell
# Set the password as environment variable
$env:POSTGRES_PASSWORD="your_actual_password"

# Run your application
mvn spring-boot:run
```

### Option B: Update application.properties
Edit `src/main/resources/application.properties` and change:
```properties
spring.datasource.password=your_actual_password
```

## Step 5: Test the Connection

Run your Spring Boot application:
```powershell
mvn spring-boot:run
```

If successful, you should see:
- No database connection errors
- Tables being created automatically
- Application starting on port 8080

## Troubleshooting

### "pg_isready not recognized"
- PostgreSQL is not installed or not in PATH
- Reinstall PostgreSQL and ensure "Add to PATH" is checked

### "Password authentication failed"
- Wrong password for `postgres` user
- Reset password: `psql -U postgres -c "ALTER USER postgres PASSWORD 'new_password';"`

### "Database does not exist"
- Run the database creation script
- Check if PostgreSQL service is running

### "Connection refused"
- PostgreSQL service not running
- Start it: `net start postgresql-x64-16` (adjust version)

### "Port already in use"
- Another PostgreSQL instance is running
- Change port in `application.properties` or stop the other instance

## Quick Commands Reference

```powershell
# Check if PostgreSQL is running
pg_isready -h localhost -p 5432

# Connect to PostgreSQL
psql -U postgres

# List databases
\l

# Create database
CREATE DATABASE testing;

# Connect to specific database
\c testing

# List tables
\dt

# Exit psql
\q
```

## Security Notes

- Never commit passwords to version control
- Use environment variables for production
- Consider creating a dedicated database user for your application
- Regularly update PostgreSQL for security patches 