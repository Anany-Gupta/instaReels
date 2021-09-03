import i1 from "./slideshow/i1.jfif";
import i2 from "./slideshow/i2.jfif";
import i3 from "./slideshow/i3.jfif";
import i4 from "./slideshow/i4.jfif";
import i5 from "./slideshow/i5.jfif";
import { useState, useEffect } from "react";
import "./carousal.css";

let Carousal = () => {
  let imgArr = [i1, i2, i3, i4, i5];
  let [currentIndex, setCurrentIndex] = useState(0);
    useEffect(()=>{
        setTimeout(() => {
            setCurrentIndex((currentIndex + 1) % 5);
            }, 5500)
    },[currentIndex]);
  return (
    <div style={{
        display: "flex",
        height: "100%",
        width: "100%",
        overflow: "hidden",
        borderRadius:'15px'
      }}
      className="img-container"
    >
    <CarousalImg element={imgArr[currentIndex]} />
    </div>
  );
};
let CarousalImg = (props) => {

  return (
    <div className="img-div">
      <img src={props.element} alt="" />
    </div>
  );
};
export default Carousal;
