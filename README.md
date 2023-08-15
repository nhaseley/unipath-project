
# SITE Capstone Project

SITE Course Year: 2023

Cohort: 2

Team Member Names: Nya Haseley-Ayende, Jordan Sarkodie, Ayomide Adentuji

Mentors Names: Qin He, Pradeep Mantha, Kristin Foss

Project Code Repository Links

- [Frontend Repo Link](https://unipath-frontend.onrender.com)
- [Backend Repo Link](https://unipath-backend.onrender.com)

## Project Overview

High school seniors are often faced with the daunting task of trying to find college that fit their interests to apply to. Our project is a comprehensive online platform designed to assist high school students (specifically seniors) in their college search and application process. UniPath provides a user-friendly interface where students can explore and compare colleges, access valuable information, and make informed decisions about their future education.

UniPath offers a robust search engine that allows high school senior looking to apply to colleges to filter and search for colleges based on various criteria, such as location, majors offered, campus culture, school values, tuition fees, and admission requirements. Students can view detailed profiles and personalize their accounts through a login/registration. 

Additionally, we implemented 3 additional user roles as strecth features: **parents** to view financial breakdown information for their child's favorited colleges, **college admission officers** to post upcoming events at the institutions they work at that students can then register for, and **college students and alumni to post reviews/ratings** to provide first-hand experience about what it is like to attend their university to help students navigate their college search.

Deployment Website: https://unipath-frontend.onrender.com/

### Open-source libraries used
run npm i jsonwebtoken in capstone-api directory
run npm i axios in capstone-api directory
run npm i d3 in capstone-ui directory
run npm i esbuild in capstone-ui directory
run npm i jwt-decode in capstone-api directory
run npm i nodemon in capstone-api directory
run npm i react in capstone-ui directory
run npm i react-dom in capstone-ui directory
run npm i react-router-dom in capstone-ui directory
run npm i react-select in capstone-ui directory
run npm i react-slider in capstone-ui directory
run npm i sass in capstone-ui and capstone-api directory

- https://www.npmjs.com/package/jsonwebtoken
- https://www.npmjs.com/package/axios
- https://www.npmjs.com/package/d3
- https://www.npmjs.com/package/esbuild
- https://www.npmjs.com/package/jwt-decode
- https://www.npmjs.com/package/nodemon
- https://www.npmjs.com/package/react
- https://www.npmjs.com/package/react-dom
- https://www.npmjs.com/package/react-router-dom
- https://www.npmjs.com/package/react-select
- https://www.npmjs.com/package/react-slider
- https://www.npmjs.com/package/sass

### How to run this application

1. Run **npm run import-colleges** to save all colleges from api onto database. 
This process should be run only once and may take up to 2 hours. 
<!-- You can stop the program once the page number exceeds 328. You can view the current page 
being run in the console. -->

2. Install all open-source libraries in their respective directories

3. Import all variables in your **.env** file, following the **.env-template**

4. Run **npm run dev** on capstone-api directory to run the backend

5. Run **npm run dev** on capstone-ui directory to run the frontend