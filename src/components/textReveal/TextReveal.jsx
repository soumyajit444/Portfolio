import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TextReveal = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const text = textRef.current;
    const letters = text.querySelectorAll(".reveal-text span");

    gsap.fromTo(
      letters,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        scrollTrigger: {
          trigger: text,
          id: "text-reveal-trigger",
          start: "top 70%",
          end: "+=1200",
          scrub: true,
        },
      }
    );
  }, []);

  const wrapTextInSpans = (text) =>
    text.split("").map((char, i) => <span key={i}>{char}</span>);

  return (
    <div className="h-[180vh] max-md:h-[200vh]">
      <div className="sticky top-0">
        <div
          className="flex h-[90vh] max-md:h-[100vh] w-auto text-white font-medium text-5xl items-center
        max-md:scale-75 max-md:text-3xl"
        >
          {/* Gray Layer */}
          <p className="absolute text-gray-600 text-gray-layer justify-center text-center p-10">
            {wrapTextInSpans("Crafting digital experiences with ")}
            <span className="text-blue-800">creativity</span>
            {wrapTextInSpans(", ")}
            <span className="text-yellow-800">precision</span>
            {wrapTextInSpans(", and ")}
            <span className="text-green-800">passion</span>
            {wrapTextInSpans(". Each line of code is a step towards ")}
            <span className="text-purple-800">innovation</span>
            {wrapTextInSpans(
              ", and every design choice reflects my commitment to "
            )}
            <span className="text-red-800">excellence</span>
            {wrapTextInSpans(". Let's build the ")}
            <span className="text-pink-800">future</span>
            {wrapTextInSpans(" together.")}
          </p>
          {/* Text Reveal Layer */}
          <p
            ref={textRef}
            className="relative reveal-text justify-center  text-center p-10"
          >
            {wrapTextInSpans("Crafting digital experiences with ")}
            <span className="text-blue-400">creativity</span>
            {wrapTextInSpans(", ")}
            <span className="text-yellow-400">precision</span>
            {wrapTextInSpans(", and ")}
            <span className="text-green-400">passion</span>
            {wrapTextInSpans(". Each line of code is a step towards ")}
            <span className="text-purple-400">innovation</span>
            {wrapTextInSpans(
              ", and every design choice reflects my commitment to "
            )}
            <span className="text-red-400">excellence</span>
            {wrapTextInSpans(". Let's build the ")}
            <span className="text-pink-400">future</span>
            {wrapTextInSpans(" together.")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TextReveal;
