import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";
import Marquee from "react-fast-marquee";

import guitarImg from "../../assets/guitar.jpg";
import photographyImg from "../../assets/photography.jpg";
import travellingImg from "../../assets/travelling.jpg";
import paintingImg from "../../assets/painting.jpg";
import singingImg from "../../assets/singing.jpg";
import { Link } from "react-scroll";

// Custom marker for Leaflet
const customMarker = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
  shadowSize: [41, 41], // size of the shadow
});

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

const LowerAboutMe = () => {
  const mapContainerRef = useRef(null);
  const [scrollWheelZoom, setScrollWheelZoom] = useState(false);

  return (
    <>
      <div className="max-md:block px-8 hidden max-md:justify-center flex-col w-[95%] mx-auto">
        <div className="flex items-center justify-between text-white mt-6">
          <h2 className="text-3xl max-md:text-xl font-bold">My Location</h2>
          <p className="max-md:text-xs">Kolkata, West Bengal, India</p>
        </div>
        {/* Map Container */}
        <div className="w-full mx-auto h-40 border border-gray-300 rounded-lg overflow-hidden mt-2 mb-6 z-0">
          <MapContainer
            center={[22.483993, 88.3434458]}
            zoom={5}
            className="w-full h-full rounded-lg"
            scrollWheelZoom={scrollWheelZoom}
            ref={mapContainerRef}
            style={{ zIndex: 5 }}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
              style={{ zIndex: 6 }}
            />
            <Marker
              position={[22.483993, 88.3434458]}
              icon={customMarker}
              style={{ zIndex: 7 }}
            >
              <Popup style={{ zIndex: 8 }}>My Location</Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Marquee Container */}
        <Marquee className="w-full" speed={40} gradient={false}>
          <div className="flex items-center space-x-4">
            {/* Duplicate the hobbies list twice */}
            {[
              ...hobbies,
              ...hobbies,
              ...hobbies,
              ...hobbies, // Duplicate list for continuous scrolling
            ].map((hobby, index) => (
              <a
                href={hobby.navLink}
                target="_blank"
                key={index}
                className="h-[70px] bg-gray-800  hover:bg-gray-900 shadow-lg rounded-lg transition-all flex items-center justify-center"
              >
                <img
                  src={hobby.img}
                  alt={hobby.name}
                  className="w-[40px] h-[40px] m-3 aspect-square rounded-lg"
                />
                <p className="text-center text-xs p-3 font-light text-white">
                  {hobby.name}
                </p>
              </a>
            ))}
          </div>
        </Marquee>
      </div>
      <div className=" flex items-center justify-center p-4">
        <Link
          to="home"
          spy={true}
          smooth={true}
          offset={50}
          duration={1000}
          className="text-sm border-2 border-[#00ff2b] text-[#00ff2b] font-semibold text-center hover:bg-[#00ff2b] hover:text-black transition-colors duration-300 p-2 cursor-pointer"
        >
          Scroll to Top
        </Link>
      </div>
    </>
  );
};

export default LowerAboutMe;
