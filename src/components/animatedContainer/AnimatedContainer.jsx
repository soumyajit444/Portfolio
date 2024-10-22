import React, { useEffect, useState } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import capgemini from "../../assets/capgemini.png";
import capgLogo from "../../assets/capgLogo.png";
import whitehatjr from "../../assets/whitehatjr.png";
import whatLogo from "../../assets/whatLogo.png";

const AnimatedContainer = () => {
  const { scrollY } = useScroll();
  const [scrolling, setScrolling] = useState(false);
  const containerControls = useAnimation();
  const fadeInControls = useAnimation();
  const containerRef = React.useRef(null);

  // Framer Motion for parallax effect
  const capgeminiY = useTransform(scrollY, [300, 1500], [200, -200]);
  const capgLogoY = useTransform(scrollY, [300, 1500], [400, -400]);
  const whitehatjrY = useTransform(scrollY, [300, 1500], [200, -200]);
  const whatLogoY = useTransform(scrollY, [300, 1500], [400, -400]);

  // Transform scroll position into width percentage
  const widthTransform = useTransform(scrollY, [200, 700], ["60%", "90%"]);

  const handleScroll = () => {
    if (containerRef.current) {
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      // Trigger animation when scrolling past 50% of the viewport height
      if (containerTop < viewportHeight / 2) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrolling) {
      containerControls.start({
        opacity: 1,
        y: 0,
        transition: {
          opacity: { duration: 1 },
          y: { duration: 2 },
        },
      });

      // Trigger fade-in effect for the paragraphs
      fadeInControls.start({
        opacity: 1,
        transition: { duration: 1 },
      });
    } else {
      containerControls.start({
        opacity: 0,
        y: 50,
        transition: {
          opacity: { duration: 2 },
          y: { duration: 0.5 },
        },
      });

      // Reset fade-out effect for the paragraphs
      fadeInControls.start({
        opacity: 0,
      });
    }
  }, [scrolling, containerControls, fadeInControls]);

  return (
    <div className="mb-[200px]">
      <motion.div
        id="experience"
        ref={containerRef}
        style={{ width: widthTransform }}
        initial={{ width: "50%", opacity: 0, y: 100 }}
        animate={containerControls}
        className="bg-gray-200 h-full md:h-[120vh] mx-auto rounded-xl relative z-10 overflow-hidden"
      >
        <div className="h-full grid grid-rows-2 gap-10 py-10 max-md:py-20 px-6 md:px-12">
          {/* Top Half - Capgemini */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center ">
            {/* Left: Capgemini images */}
            <div className="relative flex justify-center items-center lg:scale-100 md:scale-[90%] md:h-52  max-md:scale-[130%] max-md:h-32 lg:overflow-visible md:overflow-hidden max-md:overflow-hidden">
              <motion.img
                src={capgemini}
                alt="Capgemini"
                className="w-1/2 rounded-lg lg:h-auto"
                style={{ y: capgeminiY }}
                initial={{ opacity: 0 }}
                animate={fadeInControls}
              />
              <motion.img
                src={capgLogo}
                alt="CapgeminiLogo"
                className="absolute z-30 w-1/4 lg:h-auto right-[10%] rounded-lg shadow-sm"
                style={{ y: capgLogoY }}
              />
            </div>
            {/* Right: Capgemini paragraph */}
            <div className="gap-2 space-y-4 my-5 lg:mr-40 max-md:mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={fadeInControls}
                className="text-xl md:text-lg max-md:text-sm mb-2"
              >
                Capgemini | 2022 - 2024
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={fadeInControls}
                className="text-left md:text-sm max-md:text-xs"
              >
                As a Software Engineer at Capgemini, I specialize in front-end
                development with HTML, CSS, JavaScript, and React JS, creating
                responsive, user-centric applications. My expertise in UI/UX
                design includes wireframing and prototyping using Figma, along
                with implementing modern design solutions with Tailwind CSS. I
                effectively manage version control through Git and GitHub,
                ensuring smooth collaboration within Agile methodologies.
                Committed to delivering high-quality code, I continuously stay
                updated with the latest web development trends to enhance
                solutions for business and client needs.
              </motion.p>
            </div>
          </div>

          {/* Bottom Half - Whitehat Jr */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center ">
            {/* Left: Whitehat Jr images */}
            <div className="relative flex justify-center items-center lg:scale-100 md:scale-[90%] md:h-52  max-md:scale-[130%] max-md:h-32 lg:overflow-visible md:overflow-hidden max-md:overflow-hidden">
              <motion.img
                src={whitehatjr}
                alt="whitehatjr"
                className="w-1/2 rounded-lg lg:h-auto"
                style={{ y: whitehatjrY }}
                initial={{ opacity: 0 }}
                animate={fadeInControls}
              />
              <motion.img
                src={whatLogo}
                alt="whatLogo"
                className="absolute z-30 w-1/4 right-[10%] lg:h-auto rounded-lg shadow-sm"
                style={{ y: whatLogoY }}
              />
            </div>
            {/* Right: Whitehat Jr paragraph */}
            <div className="gap-2 space-y-4 my-5 lg:mr-40 max-md:mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={fadeInControls}
                className="text-xl md:text-lg max-md:text-sm mb-2"
              >
                Whitehat Jr | 2021 - 2022
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={fadeInControls}
                className="text-left md:text-sm max-md:text-xs"
              >
                During my tenure at Whitehat Jr, I served as an instructor
                specializing in HTML, CSS, and JavaScript. I delivered tailored
                online lessons that catered to diverse learning needs, fostering
                an interactive and supportive environment. By guiding students
                through practical projects, I enhanced their proficiency in web
                development. I demonstrated expertise in simplifying complex
                concepts and promoting creative problem-solving skills. This
                role not only allowed me to contribute effectively to students'
                educational journeys but also enabled continuous refinement of
                my technical and pedagogical skills.
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const App = () => {
  return <AnimatedContainer />;
};

export default App;
