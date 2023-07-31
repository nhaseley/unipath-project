import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./CollegeInfoPage.css";
import TuitionBarChart from "./TuitionBarChart";
import SATBarChart from "./SATBarChart";
import ACTBarChart from "./ACTBarChart";
import AdmissionRatePieChart from "./AdmissionRatePieChart";
import StudentDemographicsPieChart from "./StudentDemographicsPieChart";
import CollegeReview from "./CollegeReview";

export default function CollegeInfoPage({
  userLoginInfo,
  setSelectedCollege,
  userType,
  customColors,
}) {
  const { id } = useParams();
  const [college, setCollege] = useState();
  console.log("college: ", college);

  const [reviews, setReviews] = useState();
  const tuitionData = {
    tuition_in_state: parseInt(college?.tuition_in_state),
    tuition_out_of_state: parseInt(college?.tuition_out_of_state),
  };
  let averageSAT =
    parseInt(college?.sat_score_critical_reading) +
    parseInt(college?.sat_score_writing) +
    parseInt(college?.sat_score_math);
  const satData = {
    mySAT: parseInt(userLoginInfo.satScore),
    averageSAT: averageSAT,
  };
  const actData = {
    myACT: parseInt(userLoginInfo.actScore),
    averageACT: parseInt(college?.act_score),
  };
  const studentDemographicsData = {
    white_students: college?.white_students,
    asian_student: college?.asian_students,
    black_students: college?.black_students,
    hispanic_students: college?.hispanic_students,
    aian_students: college?.aian_students,
    nhpi_students: college?.nhpi_students,
    two_or_more_students: college?.two_or_more_students,
    unknown_students: college?.unknown_students,
  };
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

  async function getReviews() {
    if (
      // unnecessary once we require login for this page
      userLoginInfo.firstName != ""
    ) {
      axios
        .post("http://localhost:3010/getCollegeReviews", {
          collegeName: userLoginInfo.collegeName,
        })
        .then((response) => {
          setReviews(response.data);
        });
    }
  }
  useEffect(() => {
    getCollege();
    getReviews();
  }, [userLoginInfo]);

  function findMinorityServingValue(data) {
    // add to an array instead of returning
    let res = "";
    if (data) {
      if (data.aanipi == 1) {
        res += "aanipi-serving";
      }
      if (data.annh == 1) {
        res += "annh-serving";
      }
      if (data.hispanic == 1) {
        res += "hispanic-serving";
      }
      if (data.predominantly_black == 1) {
        res += "predominantly-black";
      }
      if (data.historically_black == 1) {
        res += "historically-black";
      }
      if (data.tribal == 1) {
        res += "tribal-serving";
      }
      if (data.women_only == 1) {
        res += "women-only";
      }
      if (data.men_only == 1) {
        res += "men-only";
      }
      return res;
    }
  }
  const studentImageArray = Array.from({
    length: parseInt(college?.student_faculty_ratio),
  });

  return (
    <div className="college-info-page">
      <div className="title">
        <h1> Welcome to {college?.name}</h1>
        {userType == "student" ? (
          <Link
            to={"/like"}
            key={college?.id}
            onClick={setSelectedCollege(college?.name)}
          >
            <img
              src="https://www.transparentpng.com/download/instagram-heart/bULeEp-heart-instagram-vector.png"
              className="like-img"
            ></img>
          </Link>
        ) : null}
      </div>

      <h2>
        {college?.name} is a 4-year {findMinorityServingValue(college)}{" "}
        {college?.avg_net_price_private ? "private " : "public "}
        institution located in {college?.city}, {college?.state}.
      </h2>
      <div className="see-events">
        <button>
          <Link to={"/events"} key={college?.id}>
            See Upcoming Events
          </Link>
        </button>
      </div>
      <a href={"https://" + college?.school_url} className="college-site-link">
        See University Site
      </a>
      <div className="college-statistics">
        {college?.admission_rate ? (
          <div>
            <h2>
              Admission Rate:{" "}
              {(parseFloat(college?.admission_rate) * 100).toFixed(1) + "%"}
            </h2>
            <AdmissionRatePieChart
              admissionRate={parseFloat(
                (college?.admission_rate * 100).toFixed(1)
              )}
              customColors={customColors}
            ></AdmissionRatePieChart>
          </div>
        ) : null}
        {!isNaN(averageSAT) ? (
          <div className="median SAT">
            <h2>Average SAT: {averageSAT}</h2>
            {userLoginInfo.satScore ? (
              <SATBarChart
                satData={satData}
                customColors={customColors}
              ></SATBarChart>
            ) : null}
          </div>
        ) : null}
        {college?.act_score ? (
          <div className="avg-ACT">
            <h2>Average ACT: {parseInt(college?.act_score)}</h2>
            {userLoginInfo.actScore ? (
              <ACTBarChart
                actData={actData}
                customColors={customColors}
              ></ACTBarChart>
            ) : null}
          </div>
        ) : null}
        <h2 className="undergrad-enrollment">
          Undergraduate Enrollment: {parseInt(college?.size).toLocaleString()}
        </h2>
        <div className="student-demographics-pie-chart">
          <StudentDemographicsPieChart
            studentDemographicsData={studentDemographicsData}
            customColors={customColors}
          ></StudentDemographicsPieChart>
        </div>
        <div className="student-faculty-ratio">
          <h2>
            Student/Faculty Ratio: {parseInt(college?.student_faculty_ratio)}
          </h2>
          <div className="students-and-faculty-imgs">
            <img
              className="faculty-img"
              src={
                "https://em-content.zobj.net/thumbs/320/apple/354/woman-teacher-medium-dark-skin-tone_1f469-1f3fe-200d-1f3eb.png"
              }
              alt="Faculty Icon"
            />
            <div className="student-imgs-grid">
              {studentImageArray.map((_, i) => (
                <img
                  className="student-img"
                  src={
                    "https://em-content.zobj.net/thumbs/320/apple/354/woman-technologist-medium-dark-skin-tone_1f469-1f3fe-200d-1f4bb.png"
                  }
                  key={i}
                  alt={`Student Icon ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        <h2 className="first-gen-share">
          {college?.first_generation
            ? "First-generation Students: " +
              (parseFloat(college?.first_generation) * 100).toFixed(1) +
              "%"
            : null}
        </h2>
        <h2 className="retention-rate">
          Retention/Graduation rate:{" "}
          {parseFloat(college?.retention_rate * 100).toFixed(1) + "%"}
        </h2>
        {college?.tuition_in_state || college?.tuition_out_of_state ? (
          <div className="cost-breakdown">
            <h2>Cost Breakdown:</h2>
            <TuitionBarChart
              tuitionData={tuitionData}
              customColors={customColors}
            ></TuitionBarChart>
          </div>
        ) : null}
      </div>

      {userType == "college-students-and-alumni" ? (
        <button className="add-more-reviews-button">
          <Link to="/mycollege">Add more reviews!</Link>
        </button>
      ) : null}

      {reviews?.length != 0 ? (
        <h2 className="alumReviews">
          Past Reviews/Ratings:
          {reviews?.map((review, i) => (
            <CollegeReview key={i} review={review}></CollegeReview>
          ))}
        </h2>
      ) : (
        <h2> No reviews posted for this college yet. </h2>
      )}
    </div>
  );
}
