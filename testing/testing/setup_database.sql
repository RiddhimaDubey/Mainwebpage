-- PostgreSQL Database Setup Script
-- Run this script after installing PostgreSQL

-- Connect to PostgreSQL as superuser (postgres)
-- This script should be run using: psql -U postgres -f setup_database.sql

-- Create the testing database
CREATE DATABASE testing;

-- Connect to the testing database
\c testing;

-- Create a dedicated user for the application (optional)
-- CREATE USER testing_user WITH PASSWORD 'testing_password';

-- Grant privileges to the user (if you created one)
-- GRANT ALL PRIVILEGES ON DATABASE testing TO testing_user;

-- Verify the database was created
\l

-- Show current database
SELECT current_database();

-- Exit
\q 