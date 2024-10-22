import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa";
import video from "../../assets/animation.mp4";
import fallbackImage from "../../assets/fallback_pic.jpg";

const ContactForm = ({ showModal, setShowModal }) => {
  const form = useRef();
  const [hovered, setHovered] = useState({ phone: false, email: false });
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("activeModal");
    } else {
      document.body.classList.remove("activeModal");
    }

    const messenger = document.querySelector("df-messenger");
    if (showModal && messenger) {
      messenger.remove();
    } else if (!showModal && !messenger) {
      const newMessenger = document.createElement("df-messenger");
      newMessenger.setAttribute("intent", "WELCOME");
      newMessenger.setAttribute("chat-title", "Echo-AI");
      newMessenger.setAttribute(
        "agent-id",
        "d003c164-a277-46ce-bdcc-0c76e5e6249c"
      );
      newMessenger.setAttribute("language-code", "en");
      newMessenger.style.zIndex = 100;
      document.body.appendChild(newMessenger);
    }
  }, [showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_1ye5rbc", "template_nxr8y92", form.current, {
        publicKey: "g4EbswnRbOlha3mEc",
      })
      .then(() => {
        toast.success("Message sent successfully");
      })
      .catch(() => {
        toast.error("Failed to send message.");
      });
  };

  if (!showModal) return null;

  return (
    <>
      {/* Dark blurry background */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"></div>

      {/* Modal Content */}
      <div className="fixed inset-0 flex lg:flex-row md:flex-col-reverse max-md:flex-col-reverse lg:scale-[100%] md:scale-[80%] max-md:scale-[60%] items-center justify-center z-50 gap-4">
        {/* Container with video and transparent div */}
        <div className="flex flex-col justify-between max-w-md w-full h-auto gap-3">
          {/* Top Div with Video */}
          <div className="rounded-xl overflow-hidden relative">
            {!videoLoaded && (
              <img
                src={fallbackImage}
                alt="Fallback"
                className="w-full h-full object-cover absolute inset-0"
                style={{ objectFit: "cover" }}
              />
            )}
            <video
              autoPlay
              loop
              muted
              preload="auto"
              className="w-full h-full object-cover"
              onLoadedData={() => setVideoLoaded(true)}
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Bottom Transparent Div */}
          <div className="flex justify-between gap-4 mt-3 w-full">
            <div
              className="flex-1 p-5 rounded-xl border border-gray-300 text-white text-center transition-transform duration-300 bg-black shadow-lg backdrop-blur-lg bg-opacity-60 relative"
              onMouseEnter={() => setHovered({ ...hovered, phone: true })}
              onMouseLeave={() => setHovered({ ...hovered, phone: false })}
            >
              {hovered.phone ? "8622874796" : "Call me"}
            </div>
            <div
              className="flex-1 p-5 rounded-xl border border-gray-300 text-white text-center transition-transform duration-300 bg-black shadow-lg backdrop-blur-lg bg-opacity-60 relative"
              onMouseEnter={() => setHovered({ ...hovered, email: true })}
              onMouseLeave={() => setHovered({ ...hovered, email: false })}
            >
              {hovered.email ? "soumyajitsengupta15@gmail.com" : "Email me"}
            </div>
          </div>

          {/* New Div with Icons */}
          <div className="flex justify-between mt-3 rounded-xl border border-gray-300 p-4 h-auto bg-black shadow-lg backdrop-blur-lg bg-opacity-60 relative">
            <a
              href="https://www.linkedin.com/in/soumyajit-sengupta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-4xl mx-1.5 transition-transform duration-300 hover:scale-105"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:soumyajitsengupta15@gmail.com"
              className="text-yellow-500 text-4xl mx-1.5 transition-transform duration-300 hover:scale-105"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://github.com/soumyajit444"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 text-4xl mx-1.5 transition-transform duration-300 hover:scale-105"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-black border border-gray-300 p-6 rounded-xl shadow-lg backdrop-blur-lg bg-opacity-60 max-w-md w-full relative">
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 text-white px-2 font-light text-3xl hover:bg-red-600 hover:px-2 hover:rounded-lg hover:bg-opacity-70"
          >
            X
          </button>
          <p className="text-3xl font-light mb-4 text-center text-white">
            Contact Me
          </p>
          <form ref={form} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block text-white">First Name</label>
              <input
                placeholder="Enter your first name"
                type="text"
                name="firstName"
                className="w-full mt-1 p-2 rounded bg-gray-800 text-white placeholder-gray-400"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-white">Last Name</label>
              <input
                placeholder="Enter your last name"
                type="text"
                name="lastName"
                className="w-full mt-1 p-2 rounded bg-gray-800 text-white placeholder-gray-400"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-white">Email</label>
              <input
                placeholder="Enter your email address"
                type="email"
                name="email"
                className="w-full mt-1 p-2 rounded bg-gray-800 text-white placeholder-gray-400"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-white">Message</label>
              <textarea
                placeholder="Write something to Soumyajit"
                name="message"
                className="w-full mt-1 p-2 rounded bg-gray-800 text-white placeholder-gray-400"
                rows="3"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-4 py-2 h-auto flex justify-center items-center rounded-lg border border-white text-white text-1xl font-medium text-center bg-transparent hover:bg-white hover:text-black transition-colors duration-300 shadow-md hover:shadow-lg mx-auto"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
};

export default ContactForm;
