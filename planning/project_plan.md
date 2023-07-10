# Project Plan

Pod Members Nya Haseley-Ayende, Jordan Sarkodie, Ayomide Adetunji

## Problem Statement and Description

Insert the latest summary of your problem statement and app description.

## User Roles and Personas

Include the most up-to-date user roles and personas.

## User Stories

List the current user stories you will implement.

## Pages/Screens

List all the pages and screens in the app. Include wireframes for at least 3 of them.

## Data Model

Students: This table stores all data for the user with type "student" upon registration and login

| column name           | type          | description
| :-------------------- | :-----------: | --------------------------------------: |
| id                    | INT           | PRIMARY KEY                             |
| first_name            | TEXT          | student first name                      |
| last_name             | TEXT          | student last name                       |
| email                 | TEXT          | student email                           |
| zipcode               | INT           | student zip code                        |
| parent_phone          | INT           | phone number of user's parent/guardian  |
| password              | TEXT          | student password                        |

Colleges: This table stores all data for list of colleges personalized for given user

| column name             type            description
| user_id                 INT             id of the given user
| info                    OBJECT          {"latest" object extracted from api}

Parents: This table stores all data for the user with type "parent" upon registration and login

| column name             type            description
first_name              TEXT            parent/guardian first name
last_name               TEXT            parent/guardian last name
phone                   INT             parent/guardian phone number
email                   TEXT            parent/guardian email
password                TEXT            parent/guardian password

College Students/Alumni: This table stores all data for the user with type "college student/alumni" upon registration and login

column name             type            description
first_name              TEXT            college student/alumni first name
last_name               TEXT            college student/alumni last name
email                   TEXT            college student/alumni email
password                TEXT            college student/alumni password
high_school             TEXT            college student/alumni high school
high_school_grad_year   INT             college student/alumni high school graduateyear
college                 TEXT            college student/alumni college
college_grad_year       INT             college student/alumni college graduation year

Admission Officer: This table stores all data for the user with type "admission officer" upon registration and login

column name             type            description
first_name              TEXT            admission officer first name
last_name               TEXT            admission officer last name
work_email              TEXT            admission officer work email
password                TEXT            admission officer password

Events: This table stores all data for the list of events posted by college admissions officers across the country

column name             type            description
id                      INT             PRIMARY KEY
name                    TEXT            event name
description             TEXT            event description
organizer_email         TEXT            email of event organizer

Event Attendees: This table stores all data for all attendees for a given event

column name             type            description
first_name              TEXT            attendee first name
last_name               TEXT            attendee last name
parent email            TEXT            email of attendee's parent/guardian
num_attendees           INT             number of total attendees for this person

## Endpoints

List the API endpoints you will need to implement.

***Don't forget to set up your Issues, Milestones, and Project Board!***
