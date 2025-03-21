import { nanoid } from "@reduxjs/toolkit";
import fondingStory from "../assets/Images/FoundingStory.png";

const AboutUsData = [
    {
        image: null,
        heading: "Our Founding Story",
        color: "from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-3xl font-bold",
        para1: "Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.",
        para2: "As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.",
        key: nanoid(),
    },
    {
        image: fondingStory,
        heading: null,
        para1: null,
        para2: null,
        key: nanoid(),
    },
    {
        image: null,
        heading: "Our Vision",
        color: "from-[#E65C00] to-[#F9D423] text-3xl font-bold",
        para1: "With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.",
        para2: null,
        key: nanoid(),
    },
    {
        image: null,
        heading: "Our Mission",
        color: "from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-3xl font-bold",
        para1: "our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.",
        para2: null,
        key: nanoid(),
    }
]

const statsData = [
    
    {
        name: "Active Students",
        counting : "5k"
    },
    {
        name: "Mentors",
        counting : "10+"
    },
    {
        name: "Courses",
        counting : "200+"
    },
    {
        name: "Awards",
        counting : "20+"
    },

]

const LearnGridData = [
    {
        order : 0, 
        heading: "World-Class Learning for ",
        higlight: "Anyone, Anywhere",
        description: "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        btn: "Learn More",
    }, 
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description: "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description: "The learning process uses the namely online and offline."
    },
    {
        order: 3,
        heading: "Certification",
        description: "You will get a certificate that can be used as a certification during job hunting."
    },
    {
        order: 4,
        heading: "Rating  Auto-grading ",
        description: "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor."
    },
    {
        order: 5,
        heading: "Ready to Work",
        description: "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program."
    }

]
export {AboutUsData, statsData, LearnGridData};