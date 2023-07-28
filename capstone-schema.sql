CREATE TABLE students (
  id            SERIAL PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1 AND RIGHT(email, 4) = '.com'),
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  parent_phone  VARCHAR(10),
  zipcode       VARCHAR(5),
  password      TEXT NOT NULL,
  sat_score     VARCHAR,
  act_score     VARCHAR,
  enrollment    INTEGER,
  school_type   TEXT
);

CREATE TABLE liked_colleges (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER NOT NULL,
  name       TEXT NOT NULL
);

CREATE TABLE colleges_from_api (
  id                              SERIAL PRIMARY KEY,
  zip                             VARCHAR NOT NULL,
  city                            TEXT NOT NULL,
  name                            TEXT NOT NULL,
  state                           TEXT NOT NULL,
  men_only                        INTEGER,
  school_url                      TEXT, 
  women_only                      INTEGER,
  price_calculator                TEXT,
  sat_score_critical_reading      VARCHAR,
  sat_score_writing               VARCHAR,
  sat_score_math                  VARCHAR,
  act_score                       VARCHAR,
  admission_rate                  VARCHAR,

  -- minority_serving             {}
  aanipi                          VARCHAR, 
  annh                            VARCHAR,
  hispanic                        VARCHAR,
  historically_black              VARCHAR,
  predominantly_black             VARCHAR,
  tribal                          VARCHAR,

  size                            VARCHAR,   
  avg_family_income               VARCHAR,
  dependent                       VARCHAR,

  -- faculty_race_ethnicity          {}
  aian_faculty                    VARCHAR,
  asian_faculty                   VARCHAR,
  black_faculty                   VARCHAR,
  hispanic_faculty                VARCHAR,
  nhpi_faculty                    VARCHAR,
  two_or_more_faculty             VARCHAR,
  unknown_faculty                 VARCHAR,
  white_faculty                   VARCHAR,
  non_resident_faculty            VARCHAR,
  
  first_generation                VARCHAR,
  median_family_income            VARCHAR,

  -- race_ethnicity                  {}
  aian_students                   VARCHAR,
  asian_students                  VARCHAR,
  black_students                  VARCHAR,
  hispanic_students               VARCHAR,
  nhpi_students                   VARCHAR,
  two_or_more_students            VARCHAR,
  unknown_students                VARCHAR,
  white_students                  VARCHAR,
  non_resident_students           VARCHAR,

  student_faculty_ratio           VARCHAR,
  retention_rate                  VARCHAR,
  firstgen_parents_hs             VARCHAR,
  firstgen_parents_ms             VARCHAR,
  firstgen_parents_college        VARCHAR,
  avg_net_price_private           VARCHAR,
  avg_net_price_public            VARCHAR,

  -- net_price_by_income_level       {}
  net_price_0_30000               VARCHAR,
  net_price_30001_48000           VARCHAR,   
  net_price_48001_75000           VARCHAR,
  net_price_75001_111000          VARCHAR,
  net_price_111001_plus           VARCHAR,

  room_board_offcampus            VARCHAR ,
  tuition_in_state                VARCHAR,
  tuition_out_of_state            VARCHAR,
  earnings_1yr_after_completion   VARCHAR,
  earnings_4yr_after_completion   VARCHAR
  -- programs                        {}
);

CREATE TABLE parents (
  id            SERIAL PRIMARY KEY,
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  parent_phone  VARCHAR(10),
  email         TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1 AND RIGHT(email, 4) = '.com'),
  password      TEXT NOT NULL
);
CREATE TABLE college_students_and_alumni (
  id                SERIAL PRIMARY KEY,
  first_name        TEXT NOT NULL,
  last_name         TEXT NOT NULL,
  email             TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1 AND RIGHT(email, 4) = '.edu'),
  password          TEXT NOT NULL,
  college           TEXT NOT NULL,
  college_grad_year INTEGER

);
CREATE TABLE admission_officers (
  id         SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  work_email TEXT NOT NULL UNIQUE CHECK (position('@' IN work_email) > 1 AND RIGHT(work_email, 4) = '.edu'),
  college    TEXT NOT NULL,
  password   TEXT NOT NULL
);

CREATE TABLE events (
  id                SERIAL PRIMARY KEY,
  name              TEXT NOT NULL,
  description       TEXT NOT NULL,
  organizer_email   TEXT NOT NULL CHECK (position('@' IN organizer_email) > 1 AND RIGHT(organizer_email, 4) = '.edu'),
  speaker           TEXT,
  date_time         TIMESTAMP DEFAULT NOW(),
  dept              TEXT,
  max_registrants   INT,
  college           TEXT NOT NULL
);

CREATE TABLE event_attendees (
  id            SERIAL PRIMARY KEY,
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  event_id      INTEGER,
  num_attendees INTEGER
);


CREATE TABLE reviews (
  id                SERIAL PRIMARY KEY,
  user_id           INT,
  first_name        TEXT NOT NULL,
  last_name         TEXT NOT NULL,
  college_name      TEXT,
  college_grad_year INTEGER,
  rating            INT,
  review            TEXT
);

