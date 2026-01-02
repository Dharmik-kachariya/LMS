export default function Features() {
  return (
    <section className="py-16 bg-gray-800">
      <h2 className="text-3xl font-bold text-center mb-12">
        Why Choose Our LMS?
      </h2>

      <div className="grid md:grid-cols-3 gap-8 px-10">
        <div className="bg-gray-900 p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
          <p className="text-gray-400">
            Learn from experienced developers and professionals.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
          <p className="text-gray-400">
            Access courses anytime, anywhere on any device.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-2">Certificates</h3>
          <p className="text-gray-400">
            Get certified after course completion.
          </p>
        </div>
      </div>
    </section>
  );
}
