import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Login from "./pages/auth/login.jsx";
import Register from "./pages/auth/register.jsx";
import InstructorDashboard from "./pages/instructor/dashbord.jsx";
import CreateCourse from "./pages/instructor/createcourse.jsx";
import Profile from "./pages/profile/profile.jsx";
import Home from "./pages/public/home.jsx";
import About from "./pages/public/about.jsx";
import ContactUs from "./pages/public/contact.jsx";
import Careers from "./pages/public/careers.jsx";
import Blog from "./pages/public/blog.jsx";
import BlogDetail from "./pages/public/blogDetail.jsx";
import Pricing from "./pages/public/pricing.jsx";
import FAQ from "./pages/public/faq.jsx";
import Testimonials from "./pages/public/testimonials.jsx";
import Footer from "./components/footer.jsx";
import ManageCourses from "./pages/instructor/managecourse.jsx";
import EditCourse from "./pages/instructor/editCourse.jsx";
import ViewCourse from "./pages/instructor/ViewCourse.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
        <Route path="/instructor/create-course" element={<CreateCourse />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blogdetail" element={<BlogDetail />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/course/:courseId" element={<ViewCourse />} />
        <Route path="/instructor/manage-course" element={<ManageCourses />} />
        <Route path="/instructor/edit-course/:courseId" element={<EditCourse />} />
      </Routes>
    </>
  );
}

export default App;
