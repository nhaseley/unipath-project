\echo 'Delete and recreate capstone database?'
\prompt 'Return for yes or control-C to cancel > ' foo

-- No longer dropping entire database b/c want to keep colleges_from_api table
DROP DATABASE capstone;
CREATE DATABASE capstone;

\connect capstone

\i capstone-schema.sql

\echo 'Delete and recreate capstone_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE capstone_test;
CREATE DATABASE capstone_test;
\connect capstone_test

\i capstone-schema.sql
\i capstone-test.sql
