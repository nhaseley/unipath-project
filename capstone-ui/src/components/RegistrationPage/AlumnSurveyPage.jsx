import * as React from "react";
import { useEffect, useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import Select from "react-select";





export default function AlumnSurveyPage ({userLoginInfo, setError, setUserLoginInfo, userType}) { 
       
    const navigate = useNavigate();  
    const [selectedButton, setSelectedButton] = useState({});



    async function handleRegistration(event) {
        event.preventDefault();
    
        if (userLoginInfo.confirmPassword !== userLoginInfo.password) {
          setError({ message: "Passwords do not match", status: 422 });
        } else {
          let result = await axios.post("http://localhost:3010/auth/register", {
            email: userLoginInfo.email,
            firstName: userLoginInfo.firstName,
            lastName: userLoginInfo.lastName,
            password: userLoginInfo.password,
          });

          console.log("result on frontend: ", result);
          navigate("/login" + `/${userType}`);
    
          if (result.data.status) {
            setError(result.data);
          } else {
            //   const token = result.data.token;
            //   localStorage.setItem("token", token);
            //   const decodedToken = jwtDecode(token);
            setError({});
            setUserLoginInfo({
                email: "",
                firstName: "",
                lastName: "",
                parentPhone: "",
                zipcode: "",
                password: "",
                confirmPassword: "",
                examScores: {},
                enrollment: 0,
                schoolType: ""
            });
          }
        }
      }
console.log("button: ", selectedButton.highsch)

    return (
        <div className="alumn-survery-page">
            <div className="first-question-input">
                Are you a high school graduate? 
                <button onClick={() => setSelectedButton({ ...selectedButton, highsch: "Yes" })}>
                    Yes
                </button>
                <button onClick={() => setSelectedButton({ ...selectedButton, highsch: "No" })}>
                    No
                </button>

                { selectedButton.highsch == "Yes" ? (
                    <div className="yearOfGrad">
                        What year did you graduate ?
                        <Select>
                            <option value="">

                            </option>
                        </Select>

                        <div className="whatHighSchool">
                            
                        </div>
                    </div>
                ) : (
                    selectedButton.highsch ? 
                    
                    <div className="redirectToRegister">
                        Please register as a student 
                        <Link to={"/register"}> Register Here </Link>
                    </div>
                    : null
                )}
            </div>

            <div className="second-question-input">

            </div>


            <div>

            </div>

        </div>
    )
}