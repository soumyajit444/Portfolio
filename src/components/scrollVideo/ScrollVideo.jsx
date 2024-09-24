import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";
import videoSrc from "../../assets/scroll_video.webm";
import videoSrc2 from "../../assets/scroll_video2.webm"; // Video for mobile/tablet screens

gsap.registerPlugin(ScrollTrigger);

const ScrollVideo = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  // Define transforms for text animations
  const leftToRight = useTransform(
    scrollYProgress,
    [0.3, 0.9],
    ["-350vw", "350vw"]
  );
  const rightToLeft = useTransform(
    scrollYProgress,
    [0.3, 0.9],
    ["350vw", "-350vw"]
  );

  useEffect(() => {
    const videoElement = videoRef.current;

    // GSAP ScrollTrigger setup
    const videoTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: isMobile ? "+=1500 top" : "+=1000 top",
      scrub: 1,
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const duration = videoElement.duration;
        if (videoElement && isFinite(duration)) {
          videoElement.currentTime = progress * duration;
        }
      },
    });

    // Handle window resize
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);

    // Cleanup event listeners and triggers
    return () => {
      videoTrigger.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Preload video for smoother experience */}
      <video
        ref={videoRef}
        src={isMobile ? videoSrc2 : videoSrc}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto" // Ensures video preloads for smoother performance
        style={{ objectFit: "cover", willChange: "transform" }}
      />

      {/* Motion divs for text animations */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white font-bold lg:text-[8vw] md:text-[15vw] z-10">
        <motion.div style={{ x: leftToRight }}>Design</motion.div>
        <motion.div style={{ x: rightToLeft }}>Develop</motion.div>
        <motion.div style={{ x: leftToRight }}>Deploy</motion.div>
      </div>
    </div>
  );
};

export default ScrollVideo;
