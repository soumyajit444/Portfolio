import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import video from "../../assets/video1.mp4";
import video2 from "../../assets/video2.mp4";
import video3 from "../../assets/video3.mp4";
import video4 from "../../assets/video4.mp4";
import video5 from "../../assets/video5.mp4";
import video6 from "../../assets/video6.mp4";

// Sample video imports with titles
const videoData = [
  { src: video2, title: "Project Management" },
  { src: video6, title: "Amazon Clone" },
  { src: video5, title: "Weather App" },
  { src: video3, title: "Investment Calculator" },
  { src: video4, title: "Photogram" },
  { src: video, title: "Portfolio" },
];

const VideoSlider = () => {
  // Ref to store video elements
  const videoRefs = useRef([]);

  // Function to handle slide change and reset video
  const handleBeforeChange = (currentSlide, nextSlide) => {
    // Reset the video playback for the previous slide
    if (videoRefs.current[currentSlide]) {
      videoRefs.current[currentSlide].pause();
      videoRefs.current[currentSlide].currentTime = 0;
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 800, // Transition speed
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Make navigation arrows visible
    autoplay: true,
    autoplaySpeed: 8000, // Change slide every 7 seconds
    pauseOnHover: true, // Pause autoplay on hover
    cssEase: "linear", // Smooth transition effect
    beforeChange: handleBeforeChange, // Handle video reset before slide change
  };

  return (
    <div
      id="projects"
      className="max-w-4xl mx-auto p-4 my-[100px] max-md:mb-[150px] relative md:scale-75 max-md:scale-75"
    >
      <h2 className="text-5xl font-light text-center mb-8 text-white max-md:text-4xl">
        Personal Projects
      </h2>
      <Slider {...settings}>
        {videoData.map((video, index) => (
          <div key={index} className="p-2 relative">
            <video
              className="w-full h-auto rounded-lg shadow-lg"
              autoPlay
              loop
              muted
              ref={(el) => (videoRefs.current[index] = el)} // Assign ref
            >
              <source src={video.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="text-center mt-4 text-xl font-semibold text-gray-200">
              {video.title}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VideoSlider;
