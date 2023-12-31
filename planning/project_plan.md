# Project Plan

Pod Members Nya Haseley-Ayende, Jordan Sarkodie, Ayomide Adetunji

## Problem Statement and Description

High school seniors are often faced with the daunting task of trying to find college that fit their interests to apply to. Our project is a comprehensive online platform designed to assist high school students (specifically seniors) in their college search and application process. It provides a user-friendly interface where students can explore and compare colleges, access valuable information, and make informed decisions about their future education.

Our project offers a robust search engine that allows high school senior looking to apply to colleges to filter and search for colleges based on various criteria, such as location, majors offered, campus culture, school values, tuition fees, and admission requirements. Students can view detailed profiles and personalize their accounts through a login/registration.

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

<a href="https://www.loom.com/share/99e67ee86fd342fb8c11f66cd9e306e6">
    <!-- <p>Capstone Wireframes – Figma - 11 July 2023 - Watch Video</p> -->
    <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/99e67ee86fd342fb8c11f66cd9e306e6-with-play.gif">
  </a>

## Data Model

Students: This table stores all data for the user with type "student" upon registration and login

| column name           | type          | description
| :-------------------- | :-----------: | ------------------------------------------: |
| id                    | INT           | PRIMARY KEY                                 |
| first_name            | TEXT          | student first name                          |
| last_name             | TEXT          | student last name                           |
| email                 | TEXT          | student email                               |
| zipcode               | INT           | student zip code                            |
| parent_phone          | INT           | phone number of user's parent/guardian      |
| password              | TEXT          | student password                            |
| sat_score             | TEXT          | input sat score (optional)                  |
| act_score             | TEXT          | input act score (optional)                  |
| enrollment            | INT           | enrollment size interest (optional)         |
| school_type           | TEXT          | minority serving inst. interest (optional)  |

Liked Colleges: This table stores all colleges favorited by a given user

| column name           | type          | description
| :-------------------- | :-----------: | -----------------------: |
| id                    | INT           | PRIMARY KEY              |
| user_id               | INT           | id of the given user     |
| college_name          | TEXT          | name of college          |

Parents: This table stores all data for the user with type "parent" upon registration and login

| column name           | type          | description
| :-------------------- | :-----------: | -------------------------------: |
| id                    | INT           | PRIMARY KEY                      |
| first_name            | TEXT          | parent/guardian first name       | 
| last_name             | TEXT          | parent/guardian last name        | 
| phone                 | INT           | parent/guardian phone number     | 
| email                 | TEXT          | parent/guardian email            | 
| password              | TEXT          | parent/guardian password         | 

College Students/Alumni: This table stores all data for the user with type "college student/alumni" upon registration and login

| column name           | type          | description
| :-------------------- | :-----------: | -------------------------------------------------:  |
| id                    | INT           | PRIMARY KEY                                         |
| first_name            | TEXT          | college student/alumni first name                   |
| last_name             | TEXT          | college student/alumni last name                    |
| email                 | TEXT          | college student/alumni email                        |
| password              | TEXT          | college student/alumni password                     |
| college_name          | TEXT     | college student/alumni college name                      |
| college_grad_year     | INT           | college student/alumni college graduation year      |

Admission Officer: This table stores all data for the user with type "admission officer" upon |registration and login

| column name           | type          | description
| :-------------------- | :-----------: | --------------------------------------: |
| id                    | INT           | PRIMARY KEY                             |
| first_name            | TEXT          | admission officer first name            | 
| last_name             | TEXT          | admission officer last name             | 
| work_email            | TEXT          | admission officer work email            | 
| college_name          | TEXT          | admission officer college               |
| password              | TEXT          | admission officer password              | 

Events: This table stores all data for the list of events posted by college admissions officers across the country

| column name           | type          | description   
| :-------------------- | :-----------: | ----------------------------: |
| id                    | INT           | PRIMARY KEY                   | 
| name                  | TEXT          | event name                    | 
| description           | TEXT          | event description             | 
| organizer_email       | TEXT          | email of event organizer      |
| speaker               | TEXT          | event speaker                 | 
| date_time             | TEXT          | event date/time               | 
| dept                  | TEXT          | event department              | 
| max_registrants       | TEXT          | event registration limit      | 
| college               | TEXT          | college hosting event         | 

Event Attendees: This table stores all data for all attendees for a given event

| column name           | type          | description
| :-------------------- | :-----------: | ----------------------------------------: |
| id                    | INT           | PRIMARY KEY                               | 
| user_id               | INT           | id of       attendee                      | 
| first_name            | TEXT          | attendee first name                       | 
| last_name             | TEXT          | attendee last name                        | 
| event_id              | INT           | email of attendee's parent/guardian       | 
| num_attendees         | INT           | number of total attendees for this person | 

Reviews: This table stores all data for the reviews for a given college and user  

| column name           | type          | description
| :-------------------- | :-----------: | ---------------------------------------: |
| id                    | INT           | PRIMARY KEY                              |
| user_id               | INT           | id of the given college student/alum     | 
| first_name            | INT           | first name of given college student/alum | 
| last_name             | INT           | last name of given college student/alum  | 
| college_name          | INT           | name of college student/alum's college   |
| college_grad_year     | INT           | graduation year for college student/alum | 
| rating                | INT           | written rating from college student/alum |
| review                | TEXT          | written review from college student/alum |

SAT Conversion New to Old: This table stores all SAT score conversions (1600 scale to 2400 sclae)

| column name           | type          | description
| :-------------------- | :-----------: | ----------------------------------------: |
| newSAT                | INT           | score in the new scale (out of 1600)      | 
| oldSAT                | INT           | score in the old scale (out of 2400)      | 

SAT Conversion Old to New: This table stores all SAT score conversions (2400 scale to 1600 sclae)

| column name           | type          | description
| :-------------------- | :-----------: | ----------------------------------------: |
| oldSAT                | INT           | score in the old scale (out of 2400)      | 
| newSAT                | INT           | score in the new scale (out of 1600)      | 

## Endpoints

| CRUD   | HTTP Verb   | description                                 | User Stories
| :----- | :---------: | :----------------------------------------:  | ------------: |
| Create | POST        | create a new student account                | 1             |
| Read   | POST        | login the student                           | 1             |
| Create | POST        | create a new parent account                 | 2             |
| Read   | POST        | login the parent                            | 2             |
| Get    | GET         | fetch the college list for input user info  | 1             |
| Update | POST        | add selected college to college list        | 1             | 
| Create | POST        | create a new college student/alum account   | 4             |
| Read   | POST        | login the college student/alum              | 4             |
| Create | POST        | add review to review list for input college | 4             |
| Get    | GET         | get all reviews for input college           | 3             |
| Create | POST        | create a new admission officer account      | 6             |
| Read   | POST        | login the admission officer                 | 6             |
| Get    | GET         | add event to events list for input college  | 6             |
| Get    | GET         | fetch the events list for input college     | 6             |
| Get    | GET         | fetch the updated SAT Score in new scale    | 1-6           |
| Get    | GET         | fetch all colleges from database            | 1-6           |

***Don't forget to set up your Issues, Milestones, and Project Board!***
[Github Milestones Board](https://github.com/nhaseley/ftl-capstone-project/projects)

## Sprint Breakdown
1. 
  * Connect database to backend, backend to frontend
  * Frontend layout of browser router and main pages
  * Implement Registration and Login for students
  * College Grid rendering from API
  * Incorporate 1 filter feature

2. 
  * Implement 5-6 filter/search features
  * JWTs
  * Individual College Page

3. 
  * Registration/Login/JWTs for all Other User Types
  * Add Reviews/Ratings to College Info Page (college student/alumni posts, student views)
  * Start building events page (admission officer posts, student views)

4. 
  * Finish Events Page (admission officer posts, student views)
  * Parents Page (financial breakdown information)
  * Implement any last minute stretch features
  * Polish CSS for all pages

5. 
  * Deploy using render
  * Presentation prep
