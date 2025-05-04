import HiglightBtn from "../components/core/HomePage/HighlightBtn";
import Higlighter from "../components/core/common/Highlighter";
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
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ResetPassword from "../pages/ResetPassword";
import About from "../pages/About";
import AboutHeroImages from "../components/core/About/AboutHeroImages";
import AboutHeroImg1 from "../assets/Images/About/girl1.png"
import AboutHeroImg2 from "../assets/Images/About/girl2.png";
import AboutHeroImg3 from "../assets/Images/About/girl3.png"
import { AboutUsData, statsData, LearnGridData } from "../data/About";
import AboutUs from "../components/core/About/AboutUs";
import StatsComponenet from "../components/core/About/StatsComponenet";
import LearnGrid from "../components/core/About/LearnGrid";
import ContactForm from "../components/core/common/ContactForm";

import CountryCode from "../data/countrycode.json";

import Footer from "../pages/common/Footer";
import FooterLink from "../components/core/Footer/FooterLink";
import { FooterLink2 } from "../data/footer-links";
import ContactUs from "../pages/ContactUs";
import ContactSupportCard from "../components/core/Contact/ContactSupportCard";
import Dashboard from "../pages/Dashboard";
import MyProfile from "../components/core/Dashboard/MyProfile";
import Sidebar from "../components/core/Dashboard/Sidebar";
import SideBarLink from "../components/core/Dashboard/SideBarLink";
import Error from "../pages/common/Error";
import Icon from "../components/core/Dashboard/Icon";
import PasswordComponent from "../components/core/common/PasswordComponent";
import ProtectedRoute from "../components/core/common/ProtectedRoute";
import IconBtn from "../components/core/common/IconBtn";
import EditProfile from "../components/core/Dashboard/EditProfile";
import {updateProfilePictue} from "../hook/profile"
import { ProfilePictureAPI } from "../services/apis";
import Settings from "../components/core/Dashboard/setting";
import EnrolledCourses from "../components/core/Dashboard/EnrolledCourses";
import { getUserEnrolledCourses } from "../hook/profile";
import Cart from "../components/core/Dashboard/Cart/index";
import AddCourse from "../components/core/Dashboard/AddCourse";
import MyCourses from "../components/core/Dashboard/Instructor_Dasboard/MyCourses";
import EditCourse from "../components/core/Dashboard/EditCourse/EditCourse";
import CourseSlider from "../components/core/Catlog/CourseSlider";
import Course_Card from "../components/core/Catlog/Course_Card";
import RatingStars from "../components/RatingStars";
import GetAvgRating from "../components/GetAvgRating";
import { getAllCategoriesCourse , getCatalogaPageData } from "../hook/Courses";
import Catalog from "../pages/Catlog";
import CourseDetails from "../pages/CourseDetails";




export {
    // homepage
    HiglightBtn, Higlighter, Home, Preview, CourseCard, ExploreCourse, TimelineHomeSection, KnowMoreSection, BecomeInstructorSection,
    ResetPassword,
    HomePageExplore, HomePageTags, NavbarLinks, logo_nav, store, FooterLink, FooterLink2,

    // 
    Navigation, ProfileDropDown, Login, SignUp, ContactForm, Footer,ContactUs,ContactSupportCard,
    CountryCode,
    Dashboard, MyProfile,Error, Sidebar, SideBarLink, Icon, ProtectedRoute,

    // About
    About, AboutHeroImages, AboutUs, StatsComponenet, LearnGrid,
    AboutHeroImg1, AboutHeroImg2, AboutHeroImg3, AboutUsData, statsData, LearnGridData,

    PasswordComponent, IconBtn, EditProfile, updateProfilePictue, ProfilePictureAPI, 
    Settings, EnrolledCourses, getUserEnrolledCourses, Cart,

    AddCourse, MyCourses, EditCourse,

    CourseSlider, Course_Card, Catalog,
    RatingStars, GetAvgRating,
    getAllCategoriesCourse, getCatalogaPageData,
    CourseDetails,

 }