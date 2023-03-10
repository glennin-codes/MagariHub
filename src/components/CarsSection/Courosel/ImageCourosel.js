import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useParams } from "react-router-dom";
import { useRef } from "react";
import "./Image.css";
import {   useSelector} from 'react-redux'
export default function ImageCarousel() {
  const { _id} = useParams(); // get car id from url parameter
 const {cars}= useSelector((state)=>state.cars)
   const carImages= cars.find((car)=>car._id===_id)
 
  const { carImg, image2, image3, image4, image5 ,carName} = carImages ? carImages : {};

 

  const images = [
    {
      id: 1,
      src: carImg,
      alt: carName,
    },
    {
      id: 2,
      src: image2,
      alt: carName,
    },
    {
      id: 3,
      src: image3,
      alt: carName,
    },
    {
      id: 4,
      src: image4,
      alt: carName,
    },
    {
      id: 5,
      src: image5,
      alt: carName,
    },
  ];
  const carousel = useRef();
  const settings = {
    infinite: true,
    customPaging: function (i) {
      return (
      
          <img
            src={images[i].src}
            height="100%"
            width="97%"
            alt={images[i].alt}
          />
      
      );
    },
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    dots: true,
    slidesToShow: 1,
    arrows: true,
    slidesToScroll: 1,
    lazyLoad: true,
  };

  console.log(images);

  return (
    <div className="container">
      <button onClick={() => carousel.current.slickGoTo(0)} className="button">
        Go to first
      </button>
      <button
        onClick={() => carousel.current.slickGoTo(images.length - 1)}
        className="button"
      >
        Go to last
      </button>
      <Slider {...settings} ref={carousel} className="slyder">
        {images.map((item) => (
          <div key={item.id} className="photo--container">
            {" "}
            <img src={item.src} alt={item.alt} className="car--photo" />
          </div>
        ))}
      </Slider>
    </div>
  );
}
