import Hero from "../../components/Home/Hero.jsx";
import Features from "../../components/Home/Features.jsx";
import PopularCourses from "../../components/Home/PopularCourses.jsx";
import Footer from "../../components/footer";
import Testimonials from "../../components/Home/Testimonials.jsx";
import HowItWorks from "../../components/Home/HowItWorks.jsx";
import CTA from "../../components/Home/CTA.jsx";
import Categories from "../../components/Home/Categories.jsx";

export default function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Hero />
      <Features />
      <PopularCourses />
      <Categories />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
      
    </div>
  );
}
