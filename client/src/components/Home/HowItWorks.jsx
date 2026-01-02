import React from 'react'

const HowItWorks = () => {
  return (
    <>
    <section className="py-16 bg-gray-800 px-10">
      <h2 className="text-3xl font-bold text-center mb-12">
        How It Works
      </h2>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">1. Register</h3>
          <p className="text-gray-400">
            Create your free account and join our platform.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">2. Learn</h3>
          <p className="text-gray-400">
            Enroll in courses and learn at your own pace.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">3. Get Certified</h3>
          <p className="text-gray-400">
            Complete courses and earn certificates.
          </p>
        </div>
      </div>
    </section>
    </>
  )
}

export default HowItWorks