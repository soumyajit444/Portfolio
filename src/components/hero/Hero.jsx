import React, { useState, useRef, useEffect } from "react";
import heroVideo from "../../assets/hero_video.webm";
import { Typewriter } from "react-simple-typewriter";
import resume from "../../assets/Soumyajit-Sengupta-CV1.pdf";
import { useSpring, animated } from "@react-spring/web";
import posterImg from "../../assets/posterImg.png";

const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false); // State to track video load
  const videoRef = useRef(null);

  // Fade-in animation for the whole component
  const fadeIn = useSpring({
    opacity: videoLoaded ? 1 : 0,
    config: { duration: 1500 },
  });

  // Handle video loaded state
  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  return (
    <animated.div
      id="home"
      style={fadeIn} // Apply fade-in to the whole component
      className="flex lg:flex-row md:flex-col max-md:flex-col items-center w-full px-4 py-8 max-md:items-start"
    >
      <div className="flex justify-center mb-7 items-center lg:w-2/5 md:w-1/2 max-md:w-3/4 max-md:mx-auto mt-[30px]">
        {/* Fallback Image (shown until video loads) */}
        {!videoLoaded && (
          <img
            src={posterImg}
            alt="Fallback"
            className="w-full aspect-square rounded-full max-md:w-[80%]"
          />
        )}

        {/* Lazy-loaded video with fade-in effect */}
        <animated.video
          ref={videoRef}
          src={heroVideo}
          className={`w-full aspect-square rounded-full max-md:w-[80%] ${
            videoLoaded ? "" : "hidden"
          }`}
          autoPlay
          loop
          muted
          preload="metadata"
          poster={posterImg} // Set poster to the fallback image
          onLoadedData={handleVideoLoaded} // Set video loaded when ready
          style={fadeIn}
        />
      </div>

      <div className="flex flex-col gap-2 justify-center w-3/5 max-md:w-full lg:w-1/2 md:w-[85%] lg:text-left md:text-center max-md:text-center">
        <p className="text-[#00ff2b]">Hey, I am Soumyajit Sengupta</p>
        <h1 className="w-full text-white text-4xl md:text-3xl max-md:text-2xl font-bold">
          <Typewriter
            words={[
              "Front End Developer",
              "React JS Developer",
              "UI / UX Designer",
              "Content Creator",
              "Subject Matter Expert",
            ]}
            loop={true}
            cursor
            cursorBlinking
            cursorColor="#00ff2b"
            typeSpeed={90}
          />
        </h1>
        <div className="text-gray-300 md:text-sm max-md:text-xs">
          Frontend developer with 2 years of experience in the IT industry.
          Currently working at Capgemini as an Analyst. Passionate about Agile
          methodology, I specialize in React JS, JavaScript, HTML, and CSS. My
          dedication to work has earned me a Certificate of Appreciation from
          both clients and the company. Eager to learn and stay updated with new
          technologies.
        </div>
        <a
          href={resume}
          download
          className="mt-2 w-2/5 max-md:w-1/2 px-6 py-3 border-2 border-[#00ff2b] text-[#00ff2b] font-semibold text-center hover:bg-[#00ff2b] hover:text-black transition-colors duration-300 lg:mx-0 md:mx-auto max-md:mx-auto"
        >
          Download CV
        </a>
      </div>
    </animated.div>
  );
};

export default Hero;
