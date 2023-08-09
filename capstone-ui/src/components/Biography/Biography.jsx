import { Link } from "react-router-dom";
export default function Biography() {
  return (
    <div id="biography" className="biography">
      <h1 className="bio-header" style={{marginLeft: "2vh"}}>
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
            We are a passionate team of technology enthusiasts dedicated to helping high school seniors embark on their journey to higher education. Our mission is to provide a personalized and seamless experience for students as they explore and discover the perfect colleges that align with their unique interests, aspirations, and academic accomplishments.
            <div>
              <button className="creators_button">
                <Link to={"/about"}> About the Creators</Link>
              </button>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}
