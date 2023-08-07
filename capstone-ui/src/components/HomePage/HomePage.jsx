import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";
import { animateScroll as scroll } from "react-scroll";
import Biography from "../Biography/Biography";
export default function HomePage({ userLoggedIn, userType }) {
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
      // name: "ItsA me, Mario",

      imageSrc:
        "https://collegevine.imgix.net/2251e372-7844-417d-8f2a-91b2cf00813a.jpg",
      // "https://cloudinary.com/blog/wp-content/uploads/sites/12/2022/02/Mario_1.gif",
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
      //redo
      name: "Yale University",
      imageSrc: "https://s.hdnux.com/photos/01/32/65/06/23810464/5/1200x0.jpg",
    },
    {
      name: "Princeton University",
      imageSrc:
        "https://images.adsttc.com/media/images/646e/88ad/42f1/0839/b6e5/f989/large_jpg/princeton-university-residential-colleges-tenberke_6.jpg?1684965666",
    },
    {
      //redo
      name: "Columbia University",
      imageSrc:
        "https://www.columbia.edu/content/sites/default/files/styles/cu_crop/public/content/Campus%20Images/Low_Library_NYC_skyline_night_lights.jpg?h=df0fa240&itok=M4yELnWC",
    },

    {
      //redo
      name: "Brown University",
      imageSrc:
        "https://www.brown.edu/sites/default/files/styles/wide_xlrg/public/2019-04/01_About.jpg?h=920929c4&itok=lgYUTHil",
    },

    {
      name: "Florida International University",
      imageSrc: "https://micefa.org/wp-content/uploads/2017/09/FIU.jpg",
    },
  ];

  // const [loopArray, setLoopArray] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to handle the image transition
  const handleImageTransition = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % collegeNames.length);
  };

  function getStarted() {
    {
      userLoggedIn
        ? userType == "student"
          ? navigate("/feed")
          : userType == "parent"
          ? navigate("/child-feed")
          : userType == "college-admission-officer"
          ? navigate("/events")
          : userType == "college-students-and-alumni"
          ? navigate("/mycollege")
          : null
        : navigate("/register");
    }
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

        <button className="get-started-button" onClick={getStarted}>
          {userLoggedIn ? "Jump Back In!" : "Get Started"}
        </button>
      </div>
      <section className="additional-section">
        <div className="container">
          <div className="college-list">
            <div className="college-item">
              <div className="college-content">
                <span className="college-name">
                  {collegeNames[currentImageIndex].name}
                </span>
                <img
                  style={{ opacity: "0.5" }}
                  className="college-image"
                  src={collegeNames[currentImageIndex].imageSrc}
                  alt={collegeNames[currentImageIndex].name}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Biography />

      {/* make this a component, so it displays at bottom of all pages */}
      <div className="footer"></div>
    </>
  );
}
