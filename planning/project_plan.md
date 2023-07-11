# Project Plan

Pod Members Nya Haseley-Ayende, Jordan Sarkodie, Ayomide Adetunji

## Problem Statement and Description

High school seniors are often faced with the daunting task of trying to find college that fit their interests to apply to. Our project is a comprehensive online platform designed to assist high school students (specifically seniors) in their college search and application process. It provides a user-friendly interface where students can explore and compare colleges, access valuable information, and make informed decisions about their future education.

Our project offers a robust search engine that allows high school senior looking to apply to colleges to filter and search for colleges based on various criteria, such as location, majors offered, campus culture, school values, tuition fees, and admission requirements. Students can view detailed profiles and personalize their accounts through a login/registration.

TODO: ^edit these

## User Roles and Personas
1. High school senior

Sarah is an 18-year old American high school senior who is looking to apply to colleges this Fall. She is enthusiastic and motivated to pursue higher education, eager to explore new opportunities and broaden her horizons, seeks a supportive and inclusive campus community, and is interested in a college experience that offers a balance between academics, extracurricular activities, and social life. However, she is overwhelmed by the vast amount of information available and the complexity of the college search process, uncertain about the factors to consider when selecting a college, lacks exposure to different colleges and limited guidance from family members or school counselors, and finding it difficult to assess campus culture without visiting each college.

2. Parent of high school senior

Chris (40yo) and Lisa(40yo) are Sarah's parents. Support their daughter Sarah in finding the best college that meets her academic and personal needs while considering financial aspects. However, they are overwhelmed by the complex and ever-changing landscape of college admissions, and are concerned about the affordability of college and finding financial aid opportunities.

3. Current college student/alum
Olivia (32yo) is a college admissions officer at a reputable university with a Master's degree in Higher Education Administration, seeking to evaluate and select qualified applicants who align with the university's values and academic standards. However, turnout for college admission events have recently been low and unsucessful, so Olivia wants to be able to promote these events to attract and engage prospective students.

4. College admission officer

Alex (23yo) is a recent college graduate who pursued a Bachelor's degree in Computer Science at a reputable university who now works part-time at a tech company. However, they did not have much information about their Alma Mater before they attended, and would like to share their college experiences, reviews, and ratings to help prospective students.

## User Stories

1. As a high school senior, I want to register, login, and view a page of colleges personalized for me, so that I can apply to the colleges that fit the most to my interests, background, and future goals. I also want to view all information and statistics for a given college on a college page if I select one of them in the grid.

2. As a parent of a high school senior, I want to view college tuition of various schools on my personalized college feed, so that I can anticipate the financial factors in my child's college search.

3. As a high schol senior, I want to be able to view review and ratings submitted by current and former college students, so that I can learn firsthand insights into the college experience about the colleges of my interest.

4. As a current college student or alumn, I want to be able to leave reviews on the college I attend(ed) so that I can help current high school seniors learn more about the colleges they are interested in.

5. As a high school senior, I want to view admissions statistics, including acceptance rates, average test scores, and demographic information for colleges I am interested in, so that I can gauge my chances of acceptance based on historical data and evaluate my fit with different colleges.

6. As a college admissions officer, I want to be able to share admission events or virtual campus tours, so that I can showcase my institution to prospective students.

## Pages/Screens

List all the pages and screens in the app. Include wireframes for at least 3 of them.
** see figma **

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
| list                  | LIST          | list of personalized colleges           |

Colleges: This table stores all data for list of colleges personalized for given user

| column name           | type          | description
| :-------------------- | :-----------: | --------------------------------------: |
| user_id               | INT           | id of the given user                    |
| info                  | OBJECT        | {"latest" object extracted from api}    |

Parents: This table stores all data for the user with type "parent" upon registration and login

| column name           | type          | description
| :-------------------- | :-----------: | --------------------------------------: |
| first_name            | TEXT          | parent/guardian first name              | 
| last_name             | TEXT          | parent/guardian last name               | 
| phone                 | INT           | parent/guardian phone number            | 
| email                 | TEXT          | parent/guardian email                   | 
| password              | TEXT          | parent/guardian password                | 

College Students/Alumni: This table stores all data for the user with type "college student/alumni" upon registration and login

| column name           | type          | description
| :-------------------- | :-----------: | -------------------------------------------------:  |
| first_name            | TEXT          | college student/alumni first name                   |
| last_name             | TEXT          | college student/alumni last name                    |
| email                 | TEXT          | college student/alumni email                        |
| password              | TEXT          | college student/alumni password                     |
| high_school           | TEXT          | college student/alumni high school                  |
| high_school_grad_year | INT           | college student/alumni high school graduation year  |
| college               | TEXT          | college student/alumni college                      |
| college_grad_year     | INT           | college student/alumni college graduation year      |

Admission Officer: This table stores all data for the user with type "admission officer" upon |registration and login

| column name           | type          | description
| :-------------------- | :-----------: | --------------------------------------: |
| first_name            | TEXT          | admission officer first name            | 
| last_name             | TEXT          | admission officer last name             | 
| work_email            | TEXT          | admission officer work email            | 
| password              | TEXT          | admission officer password              | 

Events: This table stores all data for the list of events posted by college admissions officers across the country

| column name           | type          | description   
| :-------------------- | :-----------: | --------------------------------------: |
| id                    | INT           | PRIMARY KEY                             | 
| name                  | TEXT          | event name                              | 
| description           | TEXT          | event description                       | 
| organizer_email       | TEXT          | email of event organizer                | 

Event Attendees: This table stores all data for all attendees for a given event

| column name           | type          | description
| :-------------------- | :-----------: | ----------------------------------------: |
| first_name            | TEXT          | attendee first name                       | 
| last_name             | TEXT          | attendee last name                        | 
| parent email          | TEXT          | email of attendee's parent/guardian       | 
| num_attendees         | INT           | number of total attendees for this person | 

## Endpoints

| CRUD   | HTTP Verb   | description                                 | User Stories
| :----- | :---------: | :----------------------------------------:  | ------------: |
| Create | POST        | create a new student account                | 1             |
| Read   | POST        | login the student                           | 1             |
| Get    | GET         | fetch the college list for input user info  | 1             |
| Update | POST        | add selected college to college list        | 1             | 
| Create | POST        | add review to review list for input college | 4             |
| Get    | GET         | get all reviews for input college           | 3             |
| Get    | GET         | fetch the events list for input college     | 6             |

***Don't forget to set up your Issues, Milestones, and Project Board!***
