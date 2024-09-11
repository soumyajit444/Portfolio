import React from "react";
import {
  FaReact,
  FaJs,
  FaBootstrap,
  FaDatabase,
  FaGithub,
  FaHtml5,
  FaGit,
  FaCss3Alt,
} from "react-icons/fa";

const navBar = [
  { name: "About Me", navLink: "aboutMe" },
  { name: "Projects", navLink: "projects" },
  { name: "Experience", navLink: "experience" },
];

const skills = [
  {
    name: "React",
    icon: <FaReact className="text-blue-600 md:text-[48px] text-[32px]" />,
  },
  {
    name: "Javascript",
    icon: <FaJs className="text-yellow-500 md:text-[48px] text-[32px]" />,
  },
  {
    name: "Tailwind",
    icon: <FaCss3Alt className="text-sky-400 md:text-[48px] text-[32px]" />, // No official Tailwind icon, using CSS icon
  },
  {
    name: "Bootstrap",
    icon: (
      <FaBootstrap className="text-purple-600 md:text-[48px] text-[32px]" />
    ),
  },
  {
    name: "MySQL",
    icon: <FaDatabase className="text-blue-500 md:text-[48px] text-[32px]" />,
  },
  {
    name: "Git",
    icon: <FaGit className="text-orange-500 md:text-[48px] text-[32px]" />,
  },
  {
    name: "GitHub",
    icon: <FaGithub className="md:text-[48px] text-[32px]" />,
  },
  {
    name: "HTML",
    icon: <FaHtml5 className="text-orange-600 md:text-[48px] text-[32px]" />,
  },
  {
    name: "CSS",
    icon: <FaCss3Alt className="text-blue-500 md:text-[48px] text-[32px]" />,
  },
];

const tools = [
  {
    name: "Postman",
    colorClass: "text-red-600", // Example color for Postman
  },
  {
    name: "Netlify",
    colorClass: "text-green-600", // Example color for Netlify
  },
  {
    name: "VS Code",
    colorClass: "text-blue-500", // Example color for VS Code
  },
  {
    name: "Firebase",
    colorClass: "text-yellow-500", // Example color for Firebase
  },
  {
    name: "Vercel",
    colorClass: "text-white", // Example color for Vercel
  },
  {
    name: "Figma",
    colorClass: "text-purple-600", // Example color for Figma
  },
  {
    name: "Photoshop",
    colorClass: "text-blue-700", // Example color for Photoshop
  },
  {
    name: "After Effects",
    colorClass: "text-purple-400", // Example color for After Effects
  },
];

export default skills;
export { tools, navBar };
