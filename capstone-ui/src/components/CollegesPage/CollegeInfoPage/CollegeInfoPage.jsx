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
import diverseImg from '../../../assets/diverseImg.png'
import studyingImg from '../../../assets/studyingImg.png'
import costImg from '../../../assets/costImg.png'
import admittedImg from '../../../assets/admittedImg.png'
import config from "../../../../../config.dev";


export default function CollegeInfoPage({
  userLoginInfo,
  setSelectedCollege,
  userType,
  customColors,
  convertCollegeSAT
}) {
  const { id } = useParams();
  const [college, setCollege] = useState();
  const [averageSAT, setAverageSAT] = useState()
  const [collegeImage, setCollegeImage] = useState("")
  const [collegeImages, setCollegeImages] = useState([]);

  console.log("college: ", college);

  const [reviews, setReviews] = useState();
  const tuitionData = {
    tuition_in_state: parseInt(college?.tuition_in_state),
    tuition_out_of_state: parseInt(college?.tuition_out_of_state),
  };
  let reading = college?.sat_score_critical_reading ? parseInt(college?.sat_score_critical_reading):0
  let writing = college?.sat_score_writing?parseInt(college?.sat_score_writing):0
  let math = college?.sat_score_math?parseInt(college?.sat_score_math):0

async function getUpdatedScore(reading, writing, math) {
    let updatedScore = await convertCollegeSAT(
      `${
        reading+writing+math
      }`
    );
    setAverageSAT(updatedScore)
  }
  useEffect(() => {
    getUpdatedScore(reading, writing, math);
  }, [userLoginInfo, college]);

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
  const studentImageArray = Array.from({
    length: parseInt(college?.student_faculty_ratio),
  });

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
    getUnsplashSearchImg('Library');
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

  const zipcode = 10469;

  // client side apiKey: js-Iedaayr15fYgbtL5zPqzkxHdZ7ZhqOyD1RzsvYBfYwLIzDtwpX3qh78PfUjkdvYf
  const apiKey =
    "q7AsIQrw7PfuF4eJAwPCHdVSu0fvhgpixGPlbuYCU7lp2LeAHDd5fYL0GLLvXttQ";
  const ORIGINAL_COLLEGE_API_URL = "https://www.zipcodeapi.com/rest";

  // useEffect(() => {
  //   getZipcodeDistance();
  // }, [userLoginInfo]);

  async function getZipcodeDistance() {
    const response = await axios.get(
      `https://www.zipcodeapi.com/rest/${apiKey}/distance.json/10803/${zipcode}/mile`
    );
    console.log("RESPONSE: ", response);
  }





  async function getUnsplashSearchImg (searchName) {
    const unsplashApi = config.unsplashApiKey;
    const randomPage = Math.floor(Math.random() * 2) + 1;
    const response = await axios.get(`https://api.unsplash.com/search/photos?page=${randomPage}&query=${searchName}&client_id=${unsplashApi}`)
    const imageUrls = response.data.results.map(result => result.urls.regular);
    setCollegeImages((prevImages) => [...prevImages, ...imageUrls]);
    // console.log('the lenght', response.data.results.length)
    // const imageUrl = response.data.results[3]?.urls.regular;
    // console.log(imageUrls)

  }

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
      <div className="guyInLibraryDiv">
      {collegeImages.length > 0 && 
      (<img id="unsplashImage" className="guyInLibrary" src={collegeImages[Math.floor(Math.random() * collegeImages.length)]} alt="Unsplash Library"/>
      )}
        {/* {collegeImage && (<img id="unsplashImage" className="guyInLibrary" src={collegeImages} alt="Unsplash Library"/>)}  */}
      {/* <img className="guyInLibrary" src="https://images.unsplash.com/photo-1567168544646-208fa5d408fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" /> */}
      </div>
      <div className="all-college-info">
        <div className="minority-and-events">
        <h2 className="college-minority-info">
          {college?.name} is a 4-year {findMinorityServingValue(college)}{" "}
          {college?.avg_net_price_private ? "private " : "public "}
          institution located in {college?.city}, {college?.state}.
        </h2>
        <div className="events-and-university">
        <div className="see-events">
          {userType == "student" || userType == "college-admission-officer" ? (
            <button>
              <Link className="upcoming-events" to={"/events"} key={college?.id}>
                See Upcoming Events
              </Link>
            </button>
          ) : null}
        </div>
        <button>
        <Link to={"https://" + college?.school_url} className="college-site-link" > See University Site </Link>
        </button>
        {/* <a href={"https://" + college?.school_url} className="college-site-link">
          See University Site
        </a> */}
        </div>
        </div>
        <div className="college-statistics">
          {college?.admission_rate ? (
            <div id="admissions" className="admissionEverything">
              <h2 className="admissionRateHeading">
                Admission Rate:{" "}
                {(parseFloat(college?.admission_rate) * 100).toFixed(1) + "%"}
              </h2>
            <div className="admissionRate">
              <AdmissionRatePieChart
                admissionRate={parseFloat(
                  (college?.admission_rate * 100).toFixed(1)
                )}
                customColors={customColors}
              ></AdmissionRatePieChart>
              <div>
                <img className="admittedImg" src={admittedImg} alt="" />
              </div>
            </div>
            </div>
          ) : null}
          <div id="tests" className="standardized-tests">
            <div className="studying">
              <img className="studyingImg" src={studyingImg} alt="" />
            </div>
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
          </div>
          {college?.size ? (
            <div id="demographics" className="demographics">
            <h2 className="undergrad-enrollment">
              Undergraduate Enrollment: {parseInt(college?.size).toLocaleString()}
            </h2>
            </div>
          ) : null}
          <div className="student-demographics-pie-chart">
          <div className="pieChart">
            <StudentDemographicsPieChart
              studentDemographicsData={studentDemographicsData}
              customColors={customColors}
            ></StudentDemographicsPieChart>
            </div>

              <div>
              <img className="diverseImgForPie" src={diverseImg} alt="" srcset="" />
              </div>
            
          </div>
          {college?.student_faculty_ratio ? (
            <div id="studentFaculty" className="student-faculty-ratio">
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
          ) : null}
          {college?.first_generation ? (
            <h2 className="first-gen-share">
              First-generation Students:{" "}
              {(parseFloat(college?.first_generation) * 100).toFixed(1)}%
            </h2>
          ) : null}
          {college?.retention_rate ? (
            <h2 className="retention-rate">
              Retention/Graduation rate:{" "}
              {parseFloat(college?.retention_rate * 100).toFixed(1) + "%"}
            </h2>
          ) : null}
          {college?.tuition_in_state || college?.tuition_out_of_state ? (
              <div id="costEverything" className="costOverall">
              <h2 className="costHeading">Cost Breakdown:</h2>
            <div className="cost-breakdown">
              <div className="cost-things">
                <img className="costImg" src={costImg} alt="" srcset="" />
              </div>
              <div className="costChart">
                <TuitionBarChart
                tuitionData={tuitionData}
                customColors={customColors}
              ></TuitionBarChart>
              </div>
            </div>
              </div>
          ) : null}
        </div>
     
        {userType == "college-students-and-alumni" ? (
          <button className="add-more-reviews-button">
            <Link to="/mycollege">Add more reviews!</Link>
          </button>
        ) : null}
      </div>
      {reviews?.length != 0 ? (
        <h2 className="alumReviews">
          Past Reviews/Ratings:
          {reviews?.map((review, i) => (
            <CollegeReview key={i} review={review}></CollegeReview>
          ))}
        </h2>
      ) : (
        <h2 className="alumReviews"> No reviews posted for this college yet. </h2>
      )}
    </div>
  );
}
