import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./CollegeInfoPage.css";

export default function CollegeInfoPage({ userLoginInfo, setSelectedCollege }) {
  const { id } = useParams();
  const [college, setCollege] = useState();

  // get info for particular college for this user
  async function getCollege() {
    if (
      // unnecessary once we require login for this page
      userLoginInfo.firstName != ""
    ) {
      axios
        .post("http://localhost:3010/info/" + `${id}`, {
          id: id,
        })
        .then((response) => {
          setCollege(response.data);
        });
    }
  }
  useEffect(() => {
    getCollege();
  }, [userLoginInfo]);

  function findMinorityServingValue(data) {
    console.log(data);
    if (data) {
      if (data.aanipi == 1) {
        console.log("aanipi")
        return "aanipi-serving"
      }
      if (data.annh == 1) {
        console.log("annh")
        return "annh-serving"
      }
      if (data.hispanic == 1) {
        console.log("hispanic")
        return "hispanic-serving"
      }
      if (data.predominantly_black == 1) {
        console.log("predominantly black")
        return "predominantly black"
      }
      if (data.historically_black == 1) {
        console.log("historically black")
        return "historically black"
      }
      if (data.tribal == 1) {
        console.log("tribal")
        return "tribal-serving"
      }
      if (data.women_only == 1) {
        console.log("women only")
        return "women only"
      }
      if (data.men_only == 1) {
        console.log("men only")
        return "men only"
      }
    }
  }
  console.log("college:", college);

  return (
    <div className="college-info-page">
      <div className="title">
        <h1> Welcome to {college?.name} </h1>
        <Link to={"/like"} onClick={setSelectedCollege(college?.name)}>
          <img
            src="https://www.transparentpng.com/download/instagram-heart/bULeEp-heart-instagram-vector.png"
            className="like-img"
          ></img>
        </Link>
      </div>
      <h2>
        {" "}
        {college?.name} is a 4-year {findMinorityServingValue(college)}{" "}
        institution located in {college?.city}, {college?.state}.
      </h2>
      <div className="college-statistics">
        <a
          href={"https://" + college?.school_url}
          className="college-site-link"
        >
          See University Site
        </a>
        <div>
          Admission Rate:{" "}
          {(parseFloat(college?.admission_rate) * 100).toFixed(2) + "%"}
        </div>
        <div className="median SAT">
          Average SAT:{" "}
          {parseInt(college?.sat_score_critical_reading) +
            parseInt(college?.sat_score_writing) +
            parseInt(college?.sat_score_math)}{" "}
        </div>
        <div className="avg-ACT">
          Average ACT: {parseInt(college?.act_score)}
        </div>
        <div className="undergrad-enrollment">
          Undergraduate Enrollment: {parseInt(college?.size).toLocaleString()}
        </div>
        <div className="student-faculty-ratio">
          {" "}
          Student/Faculty Ratio: {parseInt(college?.student_faculty_ratio)}{" "}
        </div>
        <div className="family-income">
          <div className="avg-family-income">
            Avg Family Income: $
            {parseInt(college?.avg_family_income).toLocaleString()}
          </div>
          <div className="median-family-income">
            Median Family Income: $
            {parseFloat(college?.median_family_income).toLocaleString()}
          </div>
        </div>
        <div className="first-gen-share">
          First-generation Students:{" "}
          {(parseFloat(college?.first_generation) * 100).toFixed(2) + "%"}
        </div>
        <div className="retention-rate">
          Retention/Graduation rate:{" "}
          {parseFloat(college?.retention_rate).toFixed(2)}
        </div>
        <div className="cost-breakdown">
          Cost Breakdown:
          <div className="in-state-tuition">
            In-State Tuition: $
            {parseInt(college?.tuition_in_state).toLocaleString()}
          </div>
          <div className="out-of-state-tuiition">
            Out of State Tuition: $
            {parseInt(college?.tuition_out_of_state).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
