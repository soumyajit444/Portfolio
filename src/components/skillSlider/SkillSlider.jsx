import React from "react";
import Marquee from "react-fast-marquee";
import skills from "../../constants/constants";
import { tools } from "../../constants/constants";
import { useSpring, animated } from "@react-spring/web";

const SkillSlider = () => {
  // Fade-in animation for the whole component
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 2500 }, // Adjust duration as needed
  });

  return (
    <animated.div
      style={fadeIn} // Apply fade-in effect
      className="w-full mb-[100px] max-md:mt-[50px] flex flex-col justify-center items-center text-neutral-200"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-col text-center mb-10">
          <span className="text-5xl font-thin md:text-5xl max-md:text-3xl">
            Technology Stack
          </span>
        </div>
        <Marquee autoFill pauseOnHover>
          {skills.map((items, key) => (
            <div
              key={key}
              className="bg-[#202020] m-1 rounded-xl flex gap-2 items-center justify-center space-x-5 p-4 font-bold text-2xl cursor-pointer"
            >
              <span>{items.icon}</span>
              {items.name}
            </div>
          ))}
        </Marquee>
        <Marquee autoFill pauseOnHover direction="right">
          {tools.map((items, k) => (
            <div
              key={k}
              className={`bg-[#202020] ${items.colorClass} m-1 rounded-xl flex gap-2 items-center justify-center space-x-5 p-4 font-bold text-2xl cursor-pointer`}
            >
              {items.name}
            </div>
          ))}
        </Marquee>
      </div>
    </animated.div>
  );
};

export default SkillSlider;
