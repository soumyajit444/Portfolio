import React, { useState, useEffect } from "react";
import ContentWrapper from "./components/content-wrapper/ContentWrapper";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import SkillSlider from "./components/skillSlider/SkillSlider";
import AnimatedContainer from "./components/animatedContainer/AnimatedContainer";
import Footer from "./components/footer/Footer";
import TextReveal from "./components/textReveal/TextReveal";
import VideoSlider from "./components/videoSlider/VideoSlider";
import ContactForm from "./components/contactForm/ContactForm";
import LoadingScreen from "./components/loadingScreen/LoadingScreen";
import ScrollVideo from "./components/scrollVideo/ScrollVideo";
import AboutMe from "./components/aboutMe/AboutMe";
import LowerAboutMe from "./components/aboutMe/LowerAboutMe";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading process
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the loading time as needed
  }, []);

  return (
    <>
      <LoadingScreen loading={isLoading}>
        <div className="bg-black min-h-screen">
          <ContentWrapper>
            <Header />
            <Hero />
            <SkillSlider />
          </ContentWrapper>
          <AnimatedContainer />
          <ContentWrapper>
            <TextReveal />
          </ContentWrapper>
          <ScrollVideo />
          <VideoSlider />
          <ContactForm />
          <AboutMe />
          <LowerAboutMe />
          <Footer />
        </div>
      </LoadingScreen>
    </>
  );
}
