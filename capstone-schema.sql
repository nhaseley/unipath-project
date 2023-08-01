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
  id              SERIAL PRIMARY KEY,
  user_id         INTEGER NOT NULL,
  college_name    TEXT NOT NULL
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
  college_name      TEXT NOT NULL,
  college_grad_year INTEGER

);
CREATE TABLE admission_officers (
  id            SERIAL PRIMARY KEY,
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  work_email    TEXT NOT NULL UNIQUE CHECK (position('@' IN work_email) > 1 AND RIGHT(work_email, 4) = '.edu'),
  college_name  TEXT NOT NULL,
  password      TEXT NOT NULL
);

CREATE TABLE events (
  id                SERIAL PRIMARY KEY,
  name              TEXT NOT NULL,
  description       TEXT NOT NULL,
  organizer_email   TEXT NOT NULL CHECK (position('@' IN organizer_email) > 1 AND RIGHT(organizer_email, 4) = '.edu'),
  speaker           TEXT,
  date_time         TIMESTAMP DEFAULT NOW(),
  dept              TEXT,
  max_registrants   INTEGER,
  college           TEXT NOT NULL
);

CREATE TABLE event_attendees (
  id            SERIAL PRIMARY KEY,
  student_id    INTEGER,
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  event_id      INTEGER,
  num_attendees INTEGER
);


CREATE TABLE reviews (
  id                SERIAL PRIMARY KEY,
  user_id           INTEGER,
  first_name        TEXT NOT NULL,
  last_name         TEXT NOT NULL,
  college_name      TEXT,
  college_grad_year INTEGER,
  rating            INTEGER,
  review            TEXT
);



CREATE TABLE sat_conversion (
  newSAT          VARCHAR,
  oldSAT          VARCHAR
);



INSERT INTO sat_conversion (
    newSAT,
    oldSAT
) VALUES (400, 600), (410, 610), (420, 620), (430, 630), (440, 640), (450, 650), (460, 660), (470, 670), (480, 680), (490, 690),
         (500, 700),(510, 710),(520, 720),(530, 730),(540, 730),(550, 740),(560, 750),(570, 760),(580, 770),(590, 780),
       (600, 790),(610, 800),(620, 810), (630, 820), (640, 830), (650,840),
(660, 850),
(670, 860),
(680, 870),
(690, 880),
(700, 900),
(710, 910),
(720, 930),
(730, 950),
(740, 960),
(750, 980),
(760, 990),
(770, 1010),
(780, 1030),
(790, 1040),
(800, 1060),
(810, 1070),
(820, 1090),
(830, 1110),
(840, 1120),
(850, 1140),
(860, 1150),
(870, 1170),
(880, 1180),
(890, 1200),
(900 ,1210),
(910, 1220),
(920, 1240),
(930, 1250),
(940, 1270),
(950, 1280),
(960 ,1300),
(970 ,1310),
(980, 1330),
(990, 1340),
(1000, 1360),
(1010, 1370),
(1020, 1390),
(1030, 1400),
(1040, 1420),
(1050, 1430),
(1060, 1450),
(1070, 1460),
(1080, 1480),
(1090, 1490),
(1100, 1510),
(1110, 1530),
(1120, 1540),
(1130, 1560),
(1140, 1570),
(1150, 1590),
(1160, 1610),
(1170, 1620),
(1180, 1640),
(1190, 1650),
(1200, 1670),
(1210, 1680),
(1220, 1700),
(1230, 1710),
(1240, 1730),
(1250, 1750),
(1260, 1760),
(1270, 1780),
(1280, 1790),
(1290, 1809),
(1300, 1820),
(1310, 1840),
(1320, 1850),
(1330, 1870),
(1340, 1880),
(1350, 1900),
(1360, 1920),
(1370, 1930),
(1380, 1950),
(1390, 1969),
(1400, 1990),
(1410, 2000),
(1420, 2020),
(1430, 2040),
(1440, 2060),
(1450, 2080),
(1460, 2090),
(1470, 2110),
(1480, 2130),
(1490 ,2150),
(1500, 2170),
(1510, 2190),
(1520, 2210),
(1530, 2230),
(1540, 2260),
(1550, 2280),
(1560, 2300),
(1570, 2330),
(1580, 2350),
(1590, 2370),
(1600, 2390);
