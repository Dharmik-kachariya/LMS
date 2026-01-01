import DashboardLayout from "../../layout/DashbordLayout";

export default function InstructorDashboard() {
  return (
    <DashboardLayout role="instructor">
      <h1 className="text-2xl font-bold mb-6 text-white">
        👨‍🏫 Instructor Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Total Courses" value="4" />
        <DashboardCard title="Total Students" value="120" />
        <DashboardCard title="Revenue" value="₹25,000" />
      </div>
    </DashboardLayout>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl shadow">
      <h3 className="text-gray-400 text-sm">{title}</h3>
      <p className="text-3xl font-bold text-white mt-2">{value}</p>
    </div>
  );
}
