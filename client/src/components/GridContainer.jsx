import React from "react";
import  '../components/navbar/animelist.module.scss'
function GridContainer({ children, className }) {
  return (
    <div
      className={
        "grid lg:grid-cols-5 md:grid-cols-2 grid-cols " + className
      }
    >
       {/* <div className="cardAnimeListHomePage"> */}

      {children}
       {/* </div> */}
    </div>
  );
}

export default GridContainer;
