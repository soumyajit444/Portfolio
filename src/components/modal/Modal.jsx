import React, { useEffect } from "react";
import { motion } from "framer-motion";

const Modal = ({ hobby, onClose }) => {
  useEffect(() => {
    // Disable scrolling on the body when the modal is open
    document.body.style.overflow = "hidden";

    // Clean up function to re-enable scrolling
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      {/* Darkened background */}
      <div
        className="absolute inset-0 bg-black opacity-60"
        onClick={onClose} // Close the modal when clicking outside
      ></div>

      {/* Modal content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-50 p-0 bg-black shadow-lg backdrop-blur-xl bg-opacity-80 flex items-center justify-center border-[1px] border-white rounded-lg"
        style={{
          width: "80vw",
          height: "80vh",
          maxWidth: "500px",
          maxHeight: "500px",
        }} // Adjusted for mobile screens
      >
        {hobby.mediaType === "photo" ? (
          <img
            src={hobby.realMediaSrc}
            alt={hobby.name}
            className="w-full h-full object-contain p-2" // Added padding
          />
        ) : (
          <video
            src={hobby.realMediaSrc}
            controls
            autoPlay
            title={hobby.name}
            className="w-full h-full object-contain p-2" // Added padding
          ></video>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white px-2 font-light text-3xl hover:bg-red-600 hover:px-2 hover:rounded-lg hover:bg-opacity-70"
        >
          X
        </button>
      </motion.div>
    </div>
  );
};

export default Modal;
