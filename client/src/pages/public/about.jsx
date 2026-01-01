export default function AboutUs() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6">About Our LMS</h1>
      <p className="text-gray-700 leading-relaxed text-lg">
        Founded in 2024, our Learning Management System was built with a mission
        to make quality education accessible and affordable for everyone.
      </p>

      {/* Vision */}
      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-3">Our Vision</h2>
        <p className="text-gray-600 text-lg">
          To bridge the gap between education and industry by providing practical,
          project-based learning experiences.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-600 text-lg">
          <li>Modern curriculum designed by experts</li>
          <li>Flexible learning schedule</li>
          <li>Affordable pricing</li>
          <li>Dedicated student support</li>
          <li>Interactive video lectures & quizzes</li>
          <li>Certificate of completion for every course</li>
        </ul>
      </section>

      {/* Our Values */}
      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">
              Continuously improving our platform with the latest technologies.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
            <p className="text-gray-600">
              Making learning easy for everyone, anywhere, anytime.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600">
              Building a strong support system for learners and instructors.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Start Learning?
        </h2>
        <p className="text-gray-600 mb-6 text-lg">
          Join thousands of learners who are transforming their careers.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors duration-300">
          Get Started
        </button>
      </section>
    </div>
  );
}
