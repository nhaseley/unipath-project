import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import Biography from "../Biography/Biography";
export default function HomePage({ userLoggedIn, userType }) {
  const navigate = useNavigate();

  const collegeNames = [
    {
      name: "Massachusetts Institute of Technology",
      imageSrc:
        "https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/201709/%2520Aerial-AboveSummit-Christopher%2520Harting_2.png?itok=dFHQI8zn",
    },
    {
      name: "Princeton University",
      imageSrc:
        "https://images.adsttc.com/media/images/646e/88ad/42f1/0839/b6e5/f989/large_jpg/princeton-university-residential-colleges-tenberke_6.jpg?1684965666",
    },
    {
      name: "California State University Sacramento",
      imageSrc:
        "https://www.csus.edu/news/files/1_Campus_Spring_Flowers_Students_FB_20150330_0011.jpg",
    },
    {
      name: "CUNY Hunter College",
      imageSrc:
        "https://s29068.pcdn.co/wp-content/uploads/68th-street-campus-3.jpg",
    },
    {
      name: "Howard University",
      imageSrc:
        "https://www.usnews.com/dims4/USNEWS/95badee/17177859217/resize/800x540%3E/quality/85/?url=https%3A%2F%2Fmedia.beam.usnews.com%2F82%2F7bbabaea5b47be61379d37af47e531%2FHowardUniversity-FoundersLibrary.jpg",
    },
    {
      name: "University of Michigan",
      imageSrc:
        "https://collegerealitycheck.com/wp-content/uploads/umich-1228-1024x768.jpg",
    },
    {
      name: "Morehouse College",
      imageSrc:
        "https://www.georgiaencyclopedia.org/wp-content/uploads/2021/02/morehouse-college_001.jpg",
    },
    {
      name: "University of Texas at El Paso",
      imageSrc: "https://www.utsystem.edu/sites/default/files/utep%20copy.jpg",
    },
    {
      name: "Purdue University",
      imageSrc:
        "https://www.cappex.com/sites/default/files/styles/max_1200/public/images/hero/college/243780_hero.jpg?itok=1rwetRbF",
    },
    {
      name: "Indiana University",
      imageSrc:
        "https://bloomington.iu.edu/images/social-media-photos/twitter-social-media.jpg",
    },
    {
      name: "CUNY Baruch College",
      imageSrc:
        "https://newscenter.baruch.cuny.edu/wp-content/uploads/sites/24/2020/09/Baruch-College_NVC-Building810x500.jpg",
    },
    {
      name: "University of California Santa Barbara",
      imageSrc:
        "https://upload.wikimedia.org/wikipedia/commons/b/b3/Ucsbuniversitycenterandstorketower.jpg",
    },
    {
      name: "Minerva University",
      imageSrc:
        "https://prod-upp-image-read.ft.com/20b66472-c5e6-11e5-808f-8231cd71622e",
    },
    {
      name: "University of Illinois Urbana-Champaign",
      imageSrc:
        "https://map.illinois.edu/webservices/images/map/header_map.jpg",
    },
    {
      name: "Southern Illinois University Edwardsville",
      imageSrc:
        "https://www.siue.edu/_navigation/civil-engineering/img/Home-page-14194_042.jpg",
    },
    {
      name: "Colby College",
      imageSrc:
        "https://media.beam.usnews.com/b7/d97ce88cb3a68f5e76417c9de75caa/Miller_point_in_the_sun__USNews.jpg",
    },
    {
      name: "University Of Texas At Austin",
      imageSrc:
        "https://www.utexas.edu/sites/default/files/styles/utexas_hero_photo_image/public/tower_hero_v2.jpg",
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
      name: "Florida International University",
      imageSrc:
        "https://www.fiu.edu/_assets/images/cover.jpg?id=2a56da8b0a73710b5d5807d6a3a4190d",
    },
    {
      name: "Florida A&M University",
      imageSrc:
        "https://tile.loc.gov/storage-services/service/pnp/highsm/62000/62099v.jpg",
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
    <div className="homepage">
      <div className="hellotxt">
        <h1 className="hero-heading">Your Search Starts Here.</h1>
        <h2 className="hero-subheading">
        Embark on a journey to discover your perfect college fit. 
        Uncover opportunities where you'll forge lifelong friendships, explore passions, and create cherished memories.
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
                <span className="college-name" style={{backgroundColor: "black"}}>
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
      {/* <div className="footer"></div> */}
    </div>
  );
}
