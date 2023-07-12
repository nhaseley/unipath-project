CREATE TABLE students (
  id            SERIAL PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  parent_phone  VARCHAR(10),
  zipcode       VARCHAR(5),
  password      TEXT NOT NULL
);

CREATE TABLE colleges (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER
--   college_info    
);

CREATE TABLE parents (
  id         SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  phone      INTEGER,
  email      TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
  password   TEXT NOT NULL
);
CREATE TABLE college_students_and_alumni (
  id         SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  email      TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
  password   TEXT NOT NULL,
  college     TEXT NOT NULL,
  college_grad_year INTEGER

);
CREATE TABLE admission_officers (
  id         SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  work_email TEXT NOT NULL UNIQUE CHECK (position('@' IN work_email) > 1),
  password   TEXT NOT NULL
);

CREATE TABLE events (
  id           SERIAL PRIMARY KEY,
  name         TEXT NOT NULL,
  description  TEXT NOT NULL,
  organizer_email TEXT NOT NULL UNIQUE CHECK (position('@' IN organizer_email) > 1)
);

CREATE TABLE event_attendees (
  id            SERIAL PRIMARY KEY,
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  parent_email  TEXT NOT NULL UNIQUE CHECK (position('@' IN parent_email) > 1),
  num_attendees INTEGER
);
