import { Link, useNavigate } from "react-router-dom";
export default function Biography() {
  return (
    <div id="biography" className="biography">
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
