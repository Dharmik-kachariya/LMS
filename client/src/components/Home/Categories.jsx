import React from 'react'

const Categories = () => {
  const categories = [
    "Web Development",
    "Data Science",
    "Mobile Development",
    "UI / UX Design",
    "Cloud Computing",
    "AI & ML",
  ];

  return (
    <section className="py-16 px-10 bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-10">
        Explore Categories
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat}
            className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 cursor-pointer"
          >
            <h3 className="text-lg font-semibold">{cat}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;