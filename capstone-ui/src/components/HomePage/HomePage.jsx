import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";

export default function HomePage({userLoggedIn, userType}) {

  const navigate = useNavigate();

  const collegeNames = [
    {
      name: "Massachusetts Institute of Technology",
      imageSrc:
        "https://spectrum.mit.edu/wp-content/uploads/in-support-of-mits-campus-02-1260x840.png",
    },
    {
      name: "Harvard University",
      imageSrc:
        "https://extension.harvard.edu/wp-content/uploads/sites/8/2020/12/aerial-harvard.jpg",
    },
    {
      name: "Stanford University",
      imageSrc:
        "https://collegevine.imgix.net/2251e372-7844-417d-8f2a-91b2cf00813a.jpg",
    },
    {
      name: "Andrews University",
      imageSrc:
        "https://www.andrews.edu/i/large/cas/english/about//nethery.jpg",
    },
    {
      name: "University of Maryland",
      imageSrc: "https://oneclassblog.com/wp-content/uploads/2017/09/1-5.jpg",
    },
    {
      name: "Yale University",
      imageSrc: "https://s.hdnux.com/photos/01/32/65/06/23810464/5/1200x0.jpg",
    },
    {
      name: "Princeton University",
      imageSrc:
        "https://images.adsttc.com/media/images/646e/88ad/42f1/0839/b6e5/f989/large_jpg/princeton-university-residential-colleges-tenberke_6.jpg?1684965666",
    },
    {
      name: "Columbia University",
      imageSrc:
        "https://www.columbia.edu/content/sites/default/files/styles/cu_crop/public/content/Campus%20Images/Low_Library_NYC_skyline_night_lights.jpg?h=df0fa240&itok=M4yELnWC",
    },

    {
      name: "Brown University",
      imageSrc:
        "https://www.brown.edu/sites/default/files/styles/wide_xlrg/public/2019-04/01_About.jpg?h=920929c4&itok=lgYUTHil",
    },
  ];

  // const [loopArray, setLoopArray] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to handle the image transition
  const handleImageTransition = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % collegeNames.length);
  };


  function getStarted () {
    { userLoggedIn ? ( userType == "student"
          ? navigate("/feed")
          : userType == "parent"
          ? navigate("/child-feed")
          : userType == "college-admission-officer"
          ? navigate("/events")
          : userType == "college-students-and-alumni"
          ? navigate("/mycollege")
          : null) : ( navigate("/register"))}
  }

  // useEffect to set the image transition interval
  useEffect(() => {
    const imageTransitionInterval = setInterval(handleImageTransition, 5000); // 10000ms (3 seconds) interval
    return () => clearInterval(imageTransitionInterval); // Clean up on component unmount
  }, []);

  return (
    <>
      <div className="hellotxt">
        <h1 className="hero-heading">Your Search Starts Here.</h1>
        <h2 className="hero-subheading">
          Sayme es tion wayne wif Central Sea as well es skepta init accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
          inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo. Nemo enim. En headie one is de Best.
        </h2>
          <button className="get-started-button" onClick={getStarted}>Get Started</button>
      </div>
      <section className="additional-section">
        <div className="container">
          <div className="college-list">
            <div className="college-item">
              {/* {loopArray.map((college, index) => (
              <div key={index} className="college-item">
                <div className="college-content">
                  <span className="college-name">{college.name}</span>
                  <img
                    style={{ opacity: "0.5" }}
                    className="college-image"
                    src={college.imageSrc}
                    alt={college.name}
                  />
                </div>
              </div>
            ))} */}
              <div className="college-content">
                <span className="college-name">
                  {collegeNames[currentImageIndex].name}
                </span>
                <img
                  style={{ opacity: "0.55" }}
                  className="college-image"
                  src={collegeNames[currentImageIndex].imageSrc}
                  alt={collegeNames[currentImageIndex].name}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* turn the rest of this to into a component */}
      <div className="biography">
        <h1 className="bio_header">
          Simplifying College Search For Pre-College Scholars.
        </h1>
        
        <div className="bio_spliter">
        
          <div className="leftside">
            <img
              className="left_image"
              src="https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?cs=srgb&dl=pexels-fauxels-3184396.jpg&fm=jpg"
            ></img>
          </div>
          <div className="rightside">
          <span className="rightside_text">
            Sayme es tion wayne wif central sea ez wail es skepta init
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim. En headie one is de besth.
            <div><button className="creators_button">About the Creators</button></div>
          </span>
          </div>
        </div>
     
        </div>
     
            {/* make this a component, so it displays at bottom of all pages */}
      <div className="footer"></div>
    </>
  );
}
