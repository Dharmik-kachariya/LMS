import { Link, useLocation } from "react-router-dom";

export default function InstructorSidebar() {
  const { pathname } = useLocation();

  const menu = [
    { name: "Dashboard", path: "/instructor/dashboard" },
   { name: "Manage Courses", path: "/instructor/manage-course" },
    { name: "Create Course", path: "/instructor/create-course" },
    { name: "Students", path: "/instructor/students" },
    { name: "Earnings", path: "/instructor/earnings" },
  ];

  const isActive = (path) => {
    if (path === "/instructor/edit-course") {
      return pathname.startsWith("/instructor/edit-course");
    }
    return pathname === path;
  };

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 p-5 min-h-screen">
      <h2 className="text-xl font-bold mb-8 text-blue-500">
        LMS Instructor
      </h2>

      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-2 rounded-lg transition
              ${
                isActive(item.path)
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800"
              }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
