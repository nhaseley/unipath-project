import * as React from "react";
import "./About.css";
import usImage from "./IMG_4577.jpg";
import nyaImage from "./IMG_3249.jpg";
import ayoImage from "./IMG_6683.jpg";
import linkedIn from "./linkedIn.png";
import emailIcon from "./mail.png";
import jordanImage from "./jordanImg.png"

import { Link } from "react-router-dom";
import ButtonMailto from "../EventsPage/ButtonMailto";

export default function About() {
  return (
    <div className="about">
      <div className="us_biography">
        <div className="creators-header-flex">
          <h1 className="creators-header">Meet The Creators</h1>
        </div>
        <div className="about_spliter">
          <div className="us_leftside">
            <img className="us-photo" src={usImage} alt="Us Image" />
          </div>
          <div className="rightside">
            <span className="rightside_text">
              We are a passionate team of 3 college students dedicated to
              <b className="bio-important-words">
                {" "}
                revolutionizing the college search experience{" "}
              </b>{" "}
              for high school seniors. With first-hand knowledge of the
              challenges and excitement that come with this pivotal stage of
              life throughout the college application process, we have combined
              our unique perspectives, skills, and aspirations to create a
              platform that{" "}
              <b className="bio-important-words">empowers students </b>to
              discover their ideal colleges based on interests and academic
              achievements.
              <div></div>
            </span>
          </div>
        </div>
      </div>
     
      <h1 className="team-header"> Our Team </h1>

      <div className="all_creators">
        <div className="creator-bio">
          <div className="image-container">
            <img className="headshot" src={ayoImage} alt="Ayo Image" />
            <p className="overlay-text" style={{ fontWeight: "bold" }}>
              Junior at University of Maryland studying Computer Science.
            </p>
          </div>
          <h2 className="bio_name">Ayomide Adetunji</h2>
          <h3 className="uni">University of Maryland, '25 </h3>
          <h3 className="major">Computer Science</h3>
          <div className="contact">
            <h3 className="subsection">
              <div className="linkedin">
                <Link to="https://www.linkedin.com/mwlite/in/ayomide-adetunji-7b87091ba">
                  <img className="linkedinLogo" src={linkedIn} />
                </Link>
              </div>
              <div className="mailto">
                <ButtonMailto
                  label={<img className="emailLogo" src={emailIcon} />}
                  mailto={"mailto:ayomide0528@gmail.com"}
                ></ButtonMailto>
              </div>
            </h3>
          </div>
        </div>
        <div className="creator-bio">
          <div className="image-container">
            <img className="headshot" src={jordanImage} alt="Jordan Image" />
            <p className="overlay-text" style={{ fontWeight: "bold" }}>
              Junior at Andrews University studying
              Computer Science.
            </p>
          </div>
          <h2 className="bio_name">Jordan Sarkodie</h2>
          <h3 className="uni"> Andrews University, '25 </h3>
          <h3 className="major">Computer Science</h3>
          <div className="contact">
            <h3 className="subsection">
              <div className="linkedin">
                <Link to="https://www.linkedin.com/in/jordan-sarkodie-95b474247">
                  <img className="linkedinLogo" src={linkedIn} />
                </Link>
              </div>
              <div className="mailto">
                <ButtonMailto
                  label={<img className="emailLogo" src={emailIcon} />}
                  mailto={"mailto:jordansarkodie13@gmail.com"}
                ></ButtonMailto>
              </div>
            </h3>
          </div>
        </div>
        <div className="creator-bio">
          <div className="image-container">
            <img className="headshot" src={nyaImage} alt="Nya Image" />
            <p className="overlay-text" style={{ fontWeight: "bold" }}>
              Junior at Brown University studying Applied Mathematics and
              Computer Science
            </p>
          </div>
          <h2 className="bio_name">Nya Haseley-Ayende</h2>
          <h3 className="uni"> Brown University, '25 </h3>
          <h3 className="major">Applied Mathematics & Computer Science</h3>
          <div className="contact">
            <h3 className="subsection">
              <div className="linkedin">
                <Link to="https://www.linkedin.com/in/nya-haseley-ayende">
                  <img className="linkedinLogo" src={linkedIn} />
                </Link>
              </div>
              <div className="mailto">
                <ButtonMailto
                  label={<img className="emailLogo" src={emailIcon} />}
                  mailto={"mailto:nylevenya@hotmail.com"}
                ></ButtonMailto>
              </div>
            </h3>
          </div>
        </div>
      </div>

      <div className="about-summary">
        We are excited to be a part of your educational journey and are here to
        support you every step of the way. As we continue to expand and refine
        our application, we remain open and eager to engage with you,
        collaborate, and ultimately guide you toward the colleges where you can
        flourish and create lasting impact. Our collaborative effort and shared
        vision have culminated in this platform, and we can't wait to see the
        positive impact it has on your path to higher education!
      </div>
      <div className="header"></div>
    </div>
  );
}
