import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";
import videoSrc from "../../assets/scroll_video.webm"; // Default video file
import videoSrc2 from "../../assets/scroll_video2.webm"; // Video for max-md screens
import videoSrc3 from "../../assets/scroll_video3.webm"; // New video file for md screens

gsap.registerPlugin(ScrollTrigger);

const ScrollVideo = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1023);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024);

  // Define separate transforms for text animations based on screen size
  const leftToRightPC = useTransform(
    scrollYProgress,
    [0.3, 0.9], // Start and end scroll range for PC
    ["-350vw", "350vw"]
  );
  const rightToLeftPC = useTransform(
    scrollYProgress,
    [0.3, 0.9],
    ["350vw", "-350vw"]
  );

  const leftToRightMobile = useTransform(
    scrollYProgress,
    [0.4, 1], // Different scroll range for mobile
    ["-350vw", "350vw"]
  );
  const rightToLeftMobile = useTransform(
    scrollYProgress,
    [0.4, 1],
    ["350vw", "-350vw"]
  );

  const leftToRightTablet = useTransform(
    scrollYProgress,
    [0.4, 0.9], // Similar range as PC but for tablet
    ["-350vw", "350vw"]
  );
  const rightToLeftTablet = useTransform(
    scrollYProgress,
    [0.4, 0.9],
    ["350vw", "-350vw"]
  );

  useEffect(() => {
    // Preload videos
    const preloadVideos = [videoSrc, videoSrc2, videoSrc3].map((src) => {
      const video = document.createElement("video");
      video.src = src;
      video.preload = "auto"; // Set preload attribute
      return video;
    });

    const videoElement = videoRef.current;

    const videoTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: isMobile ? "+=1500 top" : "+=1000 top",
      scrub: 1,
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress;
        if (videoElement) {
          const duration = videoElement.duration;
          if (isFinite(duration) && isFinite(progress)) {
            videoElement.currentTime = progress * duration;
          }
        }
      },
    });

    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      videoTrigger.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile, isTablet]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen max-md:h-[100vh] overflow-hidden"
    >
      <video
        ref={videoRef}
        src={isMobile ? videoSrc2 : isTablet ? videoSrc3 : videoSrc}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto" // Ensure video is preloaded
        style={{ objectFit: "cover", willChange: "transform" }} // GPU-accelerated CSS for smooth performance
      />

      {/* Conditionally render motion divs based on screen size */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white font-bold lg:text-[8vw] md:text-[15vw] max-md:text-[15vw] z-10">
        {isMobile ? (
          <>
            <motion.div style={{ x: leftToRightMobile }}>Design</motion.div>
            <motion.div style={{ x: rightToLeftMobile }}>Develop</motion.div>
            <motion.div style={{ x: leftToRightMobile }}>Deploy</motion.div>
          </>
        ) : isTablet ? (
          <>
            <motion.div style={{ x: leftToRightTablet }}>Design</motion.div>
            <motion.div style={{ x: rightToLeftTablet }}>Develop</motion.div>
            <motion.div style={{ x: leftToRightTablet }}>Deploy</motion.div>
          </>
        ) : (
          <>
            <motion.div style={{ x: leftToRightPC }}>Design</motion.div>
            <motion.div style={{ x: rightToLeftPC }}>Develop</motion.div>
            <motion.div style={{ x: leftToRightPC }}>Deploy</motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default ScrollVideo;
