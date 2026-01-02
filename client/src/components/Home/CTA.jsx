import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-24 bg-linear-to-r from-blue-600 to-indigo-700">
      <div className="max-w-4xl mx-auto text-center bg-white/10 backdrop-blur-md p-12 rounded-2xl shadow-xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Start Learning Today
        </h2>

        <p className="mb-8 text-blue-100 text-lg">
          Join thousands of students building real-world skills and careers.
        </p>

        <Link
          to="/register"
          className="inline-block bg-white text-blue-700 px-10 py-4 rounded-xl font-semibold text-lg hover:scale-105 hover:bg-gray-100 transition"
        >
          Join Now
        </Link>
      </div>
    </section>
  );
};

export default CTA;
