import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import { motion, useScroll, useTransform } from "framer-motion";

import picture from "../../assets/profile_hero.jpg";
import guitarImg from "../../assets/guitar.jpg";
import photographyImg from "../../assets/photography.jpg";
import travellingImg from "../../assets/travelling.jpg";
import paintingImg from "../../assets/painting.jpg";
import singingImg from "../../assets/singing.jpg";

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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const { scrollYProgress } = useScroll();
  const hobbiesY = useTransform(scrollYProgress, [0.5, 1], [2200, -200]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1023);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const customMarkerIcon = new Icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
    shadowSize: [41, 41], // size of the shadow
  });

  return (
    <div
      id="aboutMe"
      className="w-full lg:h-screen md:h-1/2 max-md:h-1/2 flex items-center justify-center"
    >
      {/* Outer Container */}
      <div className="flex max-md:flex-col w-[90%] max-w-8xl h-[90%] rounded-lg overflow-hidden">
        {/* Left Div */}
        <div className="flex flex-1">
          <div className="lg:w-2/5 md:w-2/5 max-md:w-1/2 h-full p-4">
            <img
              src={picture}
              alt="Profile"
              className="lg:w-full lg:h-full md:h-[350px] md:w-[250px] max-md:h-[350px] max-md:w-[200px] object-cover rounded-lg"
            />
          </div>
          <div className="lg:w-3/5 md:w-3/5 max-md:w-1/2 flex flex-col p-4 space-y-4">
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
              <div className="flex items-center justify-between mt-8 mb-4 lg:block md:hidden max-md:hidden text-white">
                <h2 className="lg:text-3xl md:text-2xl max-md:text-xl font-bold">
                  My Location
                </h2>
                <p className="lg:text-xl md:text-lg max-md:text-xs">
                  Kolkata, West Bengal, India
                </p>
              </div>
            </div>
            <div className="flex-1 h-3/5 border z-0 border-gray-300 rounded-lg overflow-hidden lg:block md:hidden max-md:hidden">
              <MapContainer
                center={[22.483993, 88.3434458]}
                zoom={5}
                className="w-full h-full rounded-lg"
                scrollWheelZoom={false}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                <Marker
                  position={[22.483993, 88.3434458]}
                  icon={customMarkerIcon}
                >
                  <Popup>My Location</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>

        {/* Right Div with Scroll-based Parallax */}
        <motion.div
          style={{ y: hobbiesY }}
          className="w-1/4 h-full flex items-center max-md:mt-[500px] justify-center p-4 relative hobbies-container bg-transparent lg:block md:hidden max-md:hidden"
        >
          {/* Vertical Slider */}
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
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
        </motion.div>
      </div>
    </div>
  );
};

export default AboutMe;
