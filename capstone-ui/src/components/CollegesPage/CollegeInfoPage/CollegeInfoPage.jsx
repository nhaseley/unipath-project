import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./CollegeInfoPage.css";

export default function CollegeInfoPage({ userLoginInfo, setSelectedCollege }) {
  const { id } = useParams();
  const [college, setCollege] = useState();

  const apiKey = "AiIF47OdjlHUb8m7mvs5k265lBQgGG9Hd5KXhBrF";
  const ORIGINAL_COLLEGE_API_URL =
    "https://api.data.gov/ed/collegescorecard/v1/schools?school.name=" +
    `${id}`;

  const createEndpointUrl = () =>
    `${ORIGINAL_COLLEGE_API_URL}&api_key=${apiKey}`;

  useEffect(() => {
    if (
      // unnecessary once we require login for this page
      userLoginInfo.firstName != ""
    ) {
      axios.get(createEndpointUrl()).then((response) => {
        setCollege(response?.data.results[0].latest);
      });
    }
  }, []);

  function findMinorityServingValue(data) {
    for (const field in data) {
      if (data[field] === 1) {
        return field.replace("_", " ");
      }
    }
    return null;
  }

  console.log("college: ", college);
  
  


  return (
    <div className="college-info-page">
      <div className="title">
        <h1> Welcome to {college?.school.name} </h1>
        <Link to={"/like"} onClick={setSelectedCollege(college?.school.name)}>
                          {/* state to be used in MyCollegesPage^ */}
          <img
            src="https://www.transparentpng.com/download/instagram-heart/bULeEp-heart-instagram-vector.png"
            className="like-img"
          ></img>
        </Link>
      </div>
      <h2>
        {" "}
        {college?.school.name} is a 4-year{" "}
        {findMinorityServingValue(college?.school.minority_serving)} institution
        located in {college?.school.city}, {college?.school.state}.
      </h2>
      <a href={"https://" + college?.school.school_url}> See University Site</a>
      <div>Admission Rate: {college?.admissions.admission_rate.overall.toFixed(2)}</div>
      <div className="median SAT">{/* Average SAT: {sat} */}</div>
      <div className="avg-ACT">
        Average ACT: {college?.admissions.act_scores.midpoint.cumulative}
      </div>
      <div className="undergrad-enrollment">
        Undergraduate Enrollment: {college?.student.size}
      </div>
      <div className="student-faculty-ratio"> Student/Faculty Ratio: {college?.student.demographics.student_faculty_ratio} </div>
      <div className="family-income">
        <div className="avg-family-income">
          Avg Family Income: {college?.student.demographics.avg_family_income}
        </div>
        <div className="median-family-income">
          Median Family Income:{" "}
          {college?.student.demographics.median_family_income}{" "}
        </div>
      </div>
      <div className="first-gen-share">
        First-generation Students:{" "}
        {college?.student.demographics.first_generation.toFixed(2)}{" "}
      </div>
      <div className="retention-rate">
        Retention/Graduation rate:{" "}
        {college?.student.retention_rate.overall.full_time.toFixed(2)}
      </div>
      <div className="cost-breakdown">
        Cost Breakdown:
        <div className="in-state-tuition">
          In state Tuition: {college?.cost.tuition.in_state}
        </div>
        <div className="out-of-state-tuiition">
          Out of state Tuition: {college?.cost.tuition.out_of_state}
        </div>
      </div>
    </div>
  );
}
