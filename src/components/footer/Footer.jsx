import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import ContactForm from "../contactForm/ContactForm";

// Variants for text animations (slide from right to center)
const textVariants = {
  hidden: { opacity: 0, x: 50, transition: { duration: 0.5, delay: 0.2 } }, // Slide from right with delay
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
};

// Variants for icon animations (slide from left to center)
const iconVariants = {
  hidden: { opacity: 0, x: -50, transition: { duration: 0.5, delay: 0.2 } }, // Slide from left with delay
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
  hover: { scale: 1.2, rotate: 15, transition: { duration: 0.3 } },
};

const Footer = () => {
  const [showModal, setShowModal] = useState(false);

  const controls = useAnimation();
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollY > 300) {
      // Adjust this value to control when the animation triggers
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [scrollY, controls]);

  return (
    <>
      <motion.footer
        initial="hidden"
        animate={controls}
        className="bg-stone-950 text-white text-center py-6 max-md:py-3 "
      >
        <div className="max-md:scale-75">
          <motion.p
            initial="hidden"
            animate={controls}
            variants={textVariants}
            className="mb-4"
          >
            Created by Soumyajit
          </motion.p>
          <motion.div
            initial="hidden"
            animate={controls}
            variants={iconVariants}
            className="flex justify-center mb-4"
          >
            <motion.a
              href="https://instagram.com/soumyajit_guitarist"
              target="_blank"
              rel="noopener noreferrer"
              whileHover="hover"
              className="text-white text-2xl mx-3 hover:text-pink-500"
            >
              <FaInstagram />
            </motion.a>
            <motion.a
              href="https://www.youtube.com/@SoumyajitSengupta"
              target="_blank"
              rel="noopener noreferrer"
              whileHover="hover"
              className="text-white text-2xl mx-3 hover:text-red-600"
            >
              <FaYoutube />
            </motion.a>
            <motion.a
              href="https://linkedin.com/soumyajit-sengupta-analyst"
              target="_blank"
              rel="noopener noreferrer"
              whileHover="hover"
              className="text-white text-2xl mx-3 hover:text-blue-700"
            >
              <FaLinkedin />
            </motion.a>
          </motion.div>
          <motion.p initial="hidden" animate={controls} variants={textVariants}>
            <button
              onClick={() => setShowModal(true)}
              className="text-white hover:text-amber-400"
            >
              Contact me
            </button>
          </motion.p>
        </div>
      </motion.footer>
      <ContactForm showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Footer;
