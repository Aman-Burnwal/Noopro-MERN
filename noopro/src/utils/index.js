import HiglightBtn from "../components/core/HomePage/HighlightBtn";
import Higlighter from "../components/core/HomePage/Highlighter";
import Home from "../pages/Home";
import Preview from "../components/core/HomePage/Preview";
import CourseCard from "../components/core/HomePage/CourseCard";
import ExploreCourse from "../components/core/HomePage/ExploreCourse";
import TimelineHomeSection from "../components/core/HomePage/TimelineHomeSection";
import KnowMoreSection from "../components/core/HomePage/KnowMoreSection";
import BecomeInstructorSection from "../components/core/HomePage/BecomeInstructorSection";
import { HomePageTags , HomePageExplore } from "../data/homepage-explore";
import Navigation from "../pages/common/Navigation";
import {NavbarLinks} from "../data/navbar-links";
import logo_nav from "../assets/Logo/Logo-Full-Light.png"
import store from '../../store/store'
import ProfileDropDown from "../components/core/Auth/ProfileDropDown";


export {
    // homepage
    HiglightBtn, Higlighter, Home, Preview, CourseCard, ExploreCourse, TimelineHomeSection, KnowMoreSection, BecomeInstructorSection,
    HomePageExplore, HomePageTags, NavbarLinks, logo_nav, store,

    // 
    Navigation, ProfileDropDown,
 }