import React, { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi"; // Ensure this import is correct
import { navBar } from "../../constants/constants";
import { Link } from "react-scroll";
import ContactForm from "../contactForm/ContactForm";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 500) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  };

  const handleMouseMove = (e) => {
    if (e.clientY < 50) {
      setIsHidden(false);
    } else if (window.scrollY > 500) {
      setIsHidden(true);
    }
  };

  const handleClickOutside = (e) => {
    // Close menu if clicked outside the menu
    if (isOpen && !document.querySelector("nav").contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleOptionClick = () => {
    setIsOpen(false); // Close menu when clicking any option
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleClickOutside); // Add listener for outside clicks

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClickOutside); // Clean up listener
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-transform duration-500 ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="bg-black bg-opacity-50 backdrop-blur-lg shadow-lg">
          <div className="w-full max-w-[1200px] mx-auto px-5 flex items-center justify-between p-4">
            <a href="#" className="text-xl font-bold text-white">
              Who am I?
            </a>
            <div className="hidden lg:flex space-x-4">
              {navBar.map((item, key) => (
                <Link
                  to={item.navLink}
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={1000}
                  key={key}
                  className="cursor-pointer text-white hover:text-gray-300"
                >
                  {item.name}
                </Link>
              ))}
              {/* Contact Button */}
              <button
                onClick={() => setShowModal(true)}
                className="cursor-pointer text-white hover:text-gray-300"
              >
                Contact
              </button>
            </div>
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-gray-300 focus:outline-none"
              >
                <FiMenu size={24} color="white" />
              </button>
            </div>
          </div>
          {isOpen && (
            <div className="absolute top-full left-0 right-0 w-full bg-black bg-opacity-70 backdrop-blur-lg p-4 grid grid-cols-2 gap-4 place-items-center lg:hidden">
              {navBar.map((item, key) => (
                <Link
                  to={item.navLink}
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={1000}
                  key={key}
                  onClick={handleOptionClick} // Close menu on click
                  className="text-white hover:text-gray-300"
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setShowModal(true);
                  setIsOpen(false); // Close menu on "Contact"
                }}
                className="cursor-pointer text-white hover:text-gray-300"
              >
                Contact
              </button>
            </div>
          )}
        </div>
      </nav>
      <ContactForm showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Header;
