import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import picture from "../../assets/profile_hero.jpg";
import guitarImg from "../../assets/guitar.jpg";
import photographyImg from "../../assets/photography.jpg";
import travellingImg from "../../assets/travelling.jpg";
import paintingImg from "../../assets/painting.jpg";
import singingImg from "../../assets/singing.jpg";

gsap.registerPlugin(ScrollTrigger);

const hobbies = [
  {
    name: "Guitar",
    img: guitarImg,
    navLink: "https://www.youtube.com/watch?v=0CUgZ_E3L2s",
  },
  {
    name: "Photography",
    img: photographyImg,
    navLink: "https://www.instagram.com/p/B3iBeo2nhmN/",
  },
  {
    name: "Travelling",
    img: travellingImg,
    navLink: "https://www.instagram.com/p/Cus_JY3g3cH/",
  },
  {
    name: "Painting",
    img: paintingImg,
    navLink: "https://www.instagram.com/p/BiC0wY1FxWC/",
  },
  {
    name: "Singing",
    img: singingImg,
    navLink: "https://www.instagram.com/p/C1rgalqrqt1/",
  },
];

const AboutMe = () => {
  const [scrollWheelZoom, setScrollWheelZoom] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const mapContainerRef = useRef(null);
  const hobbiesContainerRef = useRef(null);
  const { scrollY } = useScroll();

  // Define Y-axis transform for larger screens only
  const hobbiesY = useTransform(scrollY, [800, 1800], [400, -400]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);

    // Y-axis animation for larger screens
    if (!isMobile) {
      gsap.fromTo(
        ".hobbies",
        { yPercent: 100 }, // Start from bottom
        {
          yPercent: -100, // Move to top
          ease: "linear",
          scrollTrigger: {
            trigger: ".hobbies-container",
            start: "top top",
            end: "+=2500 top",
            scrub: true,
          },
        }
      );
    }

    ScrollTrigger.refresh();

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  return (
    <div
      id="aboutMe"
      className="w-full h-screen max-md:h-1/2 flex items-center justify-center"
    >
      {/* Outer Container */}
      <div className="flex max-md:flex-col w-[90%] max-w-8xl h-[90%] rounded-lg overflow-hidden">
        {/* Left Div */}
        <div className="flex flex-1">
          <div className="w-2/5 max-md:w-1/2 h-full p-4">
            <img
              src={picture}
              alt="Profile"
              className="w-full h-full max-md:h-[350px] max-md:w-[200px] object-cover rounded-lg"
            />
          </div>
          <div className="w-3/5 max-md:w-1/2 flex flex-col p-4 space-y-4">
            <div className="text-white h-2/5 max-md:h-full">
              <h2 className="text-3xl max-md:text-2xl font-bold max-md:my-auto mb-4">
                Education
              </h2>
              <h3 className="text-2xl max-md:text-md max-md:mt-2 ">College</h3>
              <p className="max-md:text-xs text-lg max-md:font-normal font-semibold">
                Dinabandhu Andrews Institute of Technology & Management
              </p>
              <p className="max-md:text-xs">
                Graduated with a BCA degree with a DGPA of 9.59/10.
              </p>
              <h3 className="text-2xl max-md:text-md  mt-4 max-md:mt-4">
                School
              </h3>
              <p className="max-md:text-xs text-lg max-md:font-normal font-semibold">
                Swami Pranabananda Vidyapith
              </p>
              <p className="max-md:text-xs ">
                Passed Higher Secondary Examination (2019) with 62.8%
              </p>
              <p className="max-md:text-xs">
                Passed Secondary Examination (2017) with 59%
              </p>
              <div className="flex items-center justify-between mt-8 mb-4 max-md:hidden">
                <h2 className="text-3xl max-md:text-xl font-bold">
                  My Location
                </h2>
                <p className="max-md:text-xs">Kolkata, West Bengal, India</p>
              </div>
            </div>
            <div className="flex-1 h-3/5 border z-0 border-gray-300 rounded-lg overflow-hidden max-md:hidden">
              <MapContainer
                center={[22.483993, 88.3434458]}
                zoom={5}
                className="w-full h-full rounded-lg"
                scrollWheelZoom={scrollWheelZoom}
                ref={mapContainerRef}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                <Marker position={[22.483993, 88.3434458]}>
                  <Popup>My Location</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>

        {/* Right Div with Parallax Scroll */}
        <motion.div
          style={{ y: hobbiesY }} // Only Y-axis animation for larger screens
          className="w-1/4 h-full flex items-center max-md:mt-[500px] justify-center p-4 relative hobbies-container bg-transparent max-md:hidden"
        >
          {/* Vertical Slider */}
          <div
            ref={hobbiesContainerRef}
            className="absolute inset-0 flex items-center justify-center overflow-visible hobbies"
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              {hobbies.map((hobby, index) => (
                <a
                  href={hobby.navLink}
                  target="_blank"
                  key={index}
                  className="w-[400px] h-[200px] max-md:w-[150px] max-md:h-[70px] p-4 bg-gray-600 hover:bg-gray-800 cursor-pointer shadow-lg rounded-lg transition-all flex items-center justify-center"
                >
                  <img
                    src={hobby.img}
                    alt={hobby.name}
                    className="w-[150px] h-[150px] max-md:w-[50px] max-md:h-[50px] aspect-square rounded-lg"
                  />
                  <p className="text-center mx-auto text-2xl max-md:text-sm font-light text-white">
                    {hobby.name}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutMe;