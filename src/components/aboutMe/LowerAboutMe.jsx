import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";
import Marquee from "react-fast-marquee";
import mapFallback from "../../assets/map_fallback.jpg";

import { Link } from "react-scroll";

import Modal from "../modal/Modal"; // Import Modal component

// Importing images and videos for hobbies
import picture from "../../assets/profile_hero.jpg";
import guitarVideo from "../../assets/guitar_video.mp4";
import photographyImg from "../../assets/photography_real.jpg";
import travellingVideo from "../../assets/travelling_video.mp4";
import paintingImg from "../../assets/painting_real.jpg";
import singingVideo from "../../assets/singing_video.mp4"; // Video for singing

// Importing React Icons for each hobby
import {
  FaGuitar,
  FaCamera,
  FaPlane,
  FaPaintBrush,
  FaMusic,
} from "react-icons/fa";

const hobbies = [
  {
    name: "Guitar",
    icon: <FaGuitar className="text-white text-4xl" />,
    realMediaSrc: guitarVideo,
    mediaType: "video",
    description: "I enjoy playing the guitar in my free time.",
  },
  {
    name: "Photography",
    icon: <FaCamera className="text-white text-4xl" />,
    realMediaSrc: photographyImg,
    mediaType: "photo",
    description: "Capturing moments through photography is one of my hobbies.",
  },
  {
    name: "Travelling",
    icon: <FaPlane className="text-white text-4xl" />,
    realMediaSrc: travellingVideo,
    mediaType: "video",
    description:
      "I love exploring new places and experiencing different cultures.",
  },
  {
    name: "Painting",
    icon: <FaPaintBrush className="text-white text-4xl" />,
    realMediaSrc: paintingImg,
    mediaType: "photo",
    description: "Painting allows me to express creativity through colors.",
  },
  {
    name: "Singing",
    icon: <FaMusic className="text-white text-4xl" />,
    realMediaSrc: singingVideo,
    mediaType: "video",
    description: "Singing is my way of relaxing and enjoying music.",
  },
];

// Custom marker for Leaflet
const customMarker = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const LowerAboutMe = () => {
  const mapContainerRef = useRef(null);
  const [scrollWheelZoom, setScrollWheelZoom] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedHobby, setSelectedHobby] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openModal = (hobby) => {
    setSelectedHobby(hobby);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedHobby(null);
  };

  return (
    <>
      <div className="lg:hidden md:block max-md:block px-8 hidden md:justify-center max-md:justify-center flex-col w-[95%] mx-auto">
        <div className="flex items-center justify-between text-white mt-6">
          <h2 className="text-3xl max-md:text-xl font-bold">My Location</h2>
          <p className="max-md:text-xs">Kolkata, West Bengal, India</p>
        </div>
        {/* Map Container */}
        <div className="w-full mx-auto md:h-80 max-md:h-40 border border-gray-300 rounded-lg overflow-hidden mt-2 mb-6 z-0">
          {isMobile ? (
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
          ) : (
            <img
              src={mapFallback}
              alt="Fallback Map"
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </div>

        {/* Marquee Container */}
        <Marquee className="w-full md:mb-[20px]" speed={40} gradient={false}>
          <div className="flex items-center space-x-4">
            {[...hobbies, ...hobbies, ...hobbies, ...hobbies].map(
              (hobby, index) => (
                <button
                  onClick={() => openModal(hobby)}
                  key={index}
                  className="w-full  h-[100px] p-4 bg-gray-600 hover:bg-gray-800 cursor-pointer shadow-lg rounded-lg transition-all flex gap-4 items-center justify-center flex-grow"
                >
                  {hobby.icon}
                  <span className="text-white text-xl font-light mx-auto">
                    {hobby.name}
                  </span>
                </button>
              )
            )}
          </div>
        </Marquee>
      </div>
      {/* Modal for displaying hobby details */}
      {modalIsOpen && <Modal hobby={selectedHobby} onClose={closeModal} />}
      <div className="flex items-center justify-center p-4">
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
