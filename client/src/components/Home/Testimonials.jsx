import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Tarsariya Kevin B.",
      role: "Full Stack Developer",
      message:
        "This LMS helped me crack my first developer job. The courses are very practical!",
    },
    {
      name: "Kachariya Dharmik K.",
      role: "Full Stack Developer",
      message:
        "The React and MERN courses are well structured and easy to follow.",
    },
    {
      name: "Kalsariya Krish G.",
      role: "Full Stack Developer",
      message:
        "Best learning platform for beginners. The instructors explain concepts clearly.",
    },
  ];

  return (
    <section className="py-16 bg-gray-800 px-10">
      <h2 className="text-3xl font-bold text-center mb-12">
        What Our Students Say
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-gray-900 p-6 rounded-lg shadow-md"
          >
            <p className="text-gray-300 mb-4">
              “{item.message}”
            </p>

            <div className="mt-4">
              <h4 className="font-semibold text-white">{item.name}</h4>
              <p className="text-sm text-gray-400">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
