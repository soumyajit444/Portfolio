import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaLinkedin, FaEnvelope, FaYoutube } from "react-icons/fa";
import video from "../../assets/animation.mp4";

const ContactForm = ({ showModal, setShowModal }) => {
  const form = useRef();
  const [hovered, setHovered] = useState({ phone: false, email: false });

  if (showModal) {
    document.body.classList.add("activeModal");
  } else {
    document.body.classList.remove("activeModal");
  }

  // Dialog Flow Chatbot

  if (showModal) {
    const messenger = document.querySelector("df-messenger");
    if (messenger) {
      messenger.remove(); // Removes the df-messenger element if it exists
    }
  } else {
    if (!document.querySelector("df-messenger")) {
      const messenger = document.createElement("df-messenger");
      messenger.setAttribute("intent", "WELCOME");
      messenger.setAttribute("chat-title", "Echo-AI");
      messenger.setAttribute(
        "agent-id",
        "d003c164-a277-46ce-bdcc-0c76e5e6249c"
      );
      messenger.setAttribute("language-code", "en");
      messenger.style.zIndex = 10;
      document.body.appendChild(messenger); // Adds the df-messenger element
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_1ye5rbc", "template_nxr8y92", form.current, {
        publicKey: "g4EbswnRbOlha3mEc",
      })
      .then(() => {
        toast.success("Message sent successfully");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Failed to send message.");
      });
  };

  if (!showModal) return null;

  return (
    <>
      <div className="fixed inset-0 flex lg:flex-row md:flex-col max-md:flex-col max-md:scale-75 items-center justify-center bg-black bg-opacity-80 z-50 gap-4">
        {/* Container with video and transparent div */}
        <div className="flex flex-col justify-between max-w-md w-full h-auto gap-3">
          {/* Top Div with Video */}
          <div className="rounded-xl overflow-hidden">
            <video autoPlay loop muted className="w-full h-full object-cover">
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          {/* Bottom Transparent Div */}
          <div className="flex justify-between mt-3 w-full">
            <div
              className="flex-1 mx-2 p-5 rounded-xl border border-gray-300 text-white text-center transition-transform duration-300 bg-black shadow-lg backdrop-blur-lg bg-opacity-30 relative"
              onMouseEnter={() => setHovered({ ...hovered, phone: true })}
              onMouseLeave={() => setHovered({ ...hovered, phone: false })}
            >
              {hovered.phone ? "8622874796" : "Call me"}
            </div>
            <div
              className="flex-1 mx-2 p-5  rounded-xl border border-gray-300 text-white text-center transition-transform duration-300 bg-black shadow-lg backdrop-blur-lg bg-opacity-30 relative"
              onMouseEnter={() => setHovered({ ...hovered, email: true })}
              onMouseLeave={() => setHovered({ ...hovered, email: false })}
            >
              {hovered.email ? "soumyajitsengupta15@gmail.com" : "Email me"}
            </div>
          </div>
          {/* New Div with Icons */}
          <div className="flex justify-between mt-3 rounded-xl border border-gray-300 p-4 h-auto bg-black shadow-lg backdrop-blur-lg bg-opacity-30 relative">
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
              href="https://www.youtube.com/SoumyajitSengupta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 text-4xl mx-1.5 transition-transform duration-300 hover:scale-105"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-black border border-gray-300 p-6 rounded-xl shadow-lg backdrop-blur-lg bg-opacity-30 max-w-md w-full relative">
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
                className="w-full mt-1 p-2   rounded bg-gray-800 text-white placeholder-gray-400"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-white">Last Name</label>
              <input
                placeholder="Enter your last name"
                type="text"
                name="lastName"
                className="w-full mt-1 p-2   rounded bg-gray-800 text-white placeholder-gray-400"
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
