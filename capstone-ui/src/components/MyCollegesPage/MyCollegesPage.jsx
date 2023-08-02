import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MyCollegesPage.css";

export default function MyCollegesPage({
  userLoginInfo,
  userType,
  selectedCollege,
  setUserType,
  userLoggedIn
}) {
  const [likedColleges, setLikedColleges] = useState([]);

  useEffect(() => {
    if (
      // unnecessary once we require login for this page
      userLoginInfo.firstName != ""
    ) {
      axios
        .post("http://localhost:3010/like", {
          studentId: userLoginInfo.id,
          collegeName: selectedCollege,
        })
        .then((response) => {
          setLikedColleges(response.data);
        });
    }
  }, [userLoginInfo]);

  return (
    <>
      {userType != "student" || !userLoggedIn ? (
        <div className="invalid-user">
          <h1>
            Unfortunately, this page is for students only. Please log in{" "}
          </h1>
          <button
            className="incorrect-user-type-button"
            onClick={() => setUserType("student")}>
            <Link to={"/login"}> here. </Link>
          </button>
        </div>
      ) : (
        <div className="my-colleges-page">
          <h1> Your Liked Colleges:</h1>
          {likedColleges?.length == 0 ? (
            <h2>
              You have not liked any colleges. Start browsing{" "}
              <Link to="feed"> here</Link>!
            </h2>
          ) : (
            <div>
              {likedColleges?.map((college) => (
                <h2 className="my-college-name">
                  <Link
                    to={"/info/" + college.college_name}
                    key={college.college_name}
                  >
                    {college.college_name}
                  </Link>
                </h2>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
