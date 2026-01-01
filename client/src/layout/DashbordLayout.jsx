import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import InstructorSidebar from "../components/insructor/sidebar";


export default function DashboardLayout({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  // 🔐 Protect route
  if (!user || user.role !== role) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Sidebar */}
      <InstructorSidebar />
    

      {/* Main Content */}
      <main className="flex-1 p-6 bg-linear-to-br from-black via-gray-900 to-black">
        
        {children}
      </main>
    </div>
  );
}
