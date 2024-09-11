import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import loadingIcon from "../../assets/code.svg"; // Adjust path as necessary

const LoadingScreen = ({ loading, children }) => {
  // Motion configuration for fading in and out 2 times
  const logoAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 1, 0], // Fade in and out 2 times
      transition: {
        duration: 2, // Total duration of fade in/out cycle
        repeat: 1, // Repeat once (so it fades in and out twice)
        ease: "easeInOut",
      },
    },
    fadeOut: { opacity: 0, transition: { duration: 1 } }, // Fade out completely
  };

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} // Fade out effect for the overall component
            transition={{ duration: 2 }} // Duration of fade-out
          >
            {/* Logo with fade in/out effect */}
            <motion.img
              src={loadingIcon}
              alt="Loading"
              className="w-16 h-16 scale-150"
              variants={logoAnimation}
              initial="hidden"
              animate="visible"
              exit="fadeOut"
            />
          </motion.div>
        )}
      </AnimatePresence>
      {!loading && children} {/* Show children after loading completes */}
    </>
  );
};

export default LoadingScreen;
