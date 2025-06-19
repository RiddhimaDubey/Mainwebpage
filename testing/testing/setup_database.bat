@echo off
echo PostgreSQL Database Setup Script
echo ================================
echo.

echo This script will help you set up the PostgreSQL database for your Spring Boot application.
echo.

echo Step 1: Checking if PostgreSQL is installed...
where psql >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: PostgreSQL is not installed or not in PATH
    echo Please install PostgreSQL from: https://www.postgresql.org/download/windows/
    echo After installation, make sure to add PostgreSQL bin directory to your PATH
    pause
    exit /b 1
)

echo PostgreSQL found!
echo.

echo Step 2: Creating the 'testing' database...
echo Please enter the password for the 'postgres' user when prompted.
echo.

psql -U postgres -c "CREATE DATABASE testing;"

if %errorlevel% equ 0 (
    echo.
    echo SUCCESS: Database 'testing' created successfully!
    echo.
    echo Step 3: Verifying database creation...
    psql -U postgres -c "\l" | findstr testing
    echo.
    echo Database setup completed successfully!
    echo You can now run your Spring Boot application.
) else (
    echo.
    echo ERROR: Failed to create database. Please check:
    echo 1. PostgreSQL is running
    echo 2. You entered the correct password for 'postgres' user
    echo 3. The 'postgres' user has sufficient privileges
)

echo.
pause 