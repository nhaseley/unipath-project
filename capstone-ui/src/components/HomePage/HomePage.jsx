import * as React from "react";
import { useEffect, useState } from "react";
import "./HomePage.css";

export default function HomePage() {

  const collegeNames = [
    {
    name: 'Harvard University',
    imageSrc: "https://extension.harvard.edu/wp-content/uploads/sites/8/2020/12/aerial-harvard.jpg"
    },
    // 'Stanford University',
    // 'Massachusetts Institute of Technology',
    {
     name: 'Yale University',
     imageSrc: "https://s.hdnux.com/photos/01/32/65/06/23810464/5/1200x0.jpg"
    },
    // 'Princeton University',
    {
    name: 'Columbia University',
    imageSrc: 'https://www.columbia.edu/content/sites/default/files/styles/cu_crop/public/content/Campus%20Images/Low_Library_NYC_skyline_night_lights.jpg?h=df0fa240&itok=M4yELnWC'
    },

    {
      name:'Brown University',
      imageSrc: 'https://www.brown.edu/sites/default/files/styles/wide_xlrg/public/2019-04/01_About.jpg?h=920929c4&itok=lgYUTHil'
    }
  ];

  const [loopArray, setLoopArray] = useState([])
  useEffect(() =>{ 
        setLoopArray([...loopArray, ...collegeNames])
    }, [loopArray])
  
 




  return (
    <>
      {/* <div className="subHero">
        <div className="textInfo">
          <h1 className="textHeader">Welcome to The College Navigator</h1>
          <h2 className="textHeader2">
            Finding the right college for you!
          </h2>
        </div>

        <div className="watchImage">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc-0StNGIFVb1NJpyfRBcffyTnXE4vspht7g&usqp=CAU"
            alt="diversityImg"
            className="pageImg"
          />
        </div>


  <div className="biography">
        <h1> This is CollegeNavigator </h1>
        <p>
          {" "}
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim. Headie One is the Best. Ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam,
        </p>
      </div>




      </div> */}







<section className="hero-section">
        <div className="container">
          <h1 className="hero-heading">Welcome to College Search!</h1>
          <h2 className="hero-subheading">Find your perfect college today.</h2>
            <button className="get-started-button">Get Started</button>
          
        </div>
      </section>
      <section className="additional-section">
        <div className="container">
          <div className="college-list">
          { loopArray.map((college, index) => (
               <div key={index} className="college-item">
               <div className="college-content">
                 <span className="college-name">{college.name}</span>
                 <img className="college-image" src={college.imageSrc} alt={college.name} />
               </div>
             </div>
            ))
            
            
            }
          </div>
        </div>
      </section>


      <div className="biography">
        <h1> This is CollegeNavigator </h1>
        <p>
          {" "}
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim. Headie One is the Best. Ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam,
        </p>
      </div>



    
    
 
    </>
  );
}
