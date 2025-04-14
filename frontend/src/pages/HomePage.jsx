import React from "react";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6">
          Welcome to CBC Tracker
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mb-8">
          A simple and efficient way to monitor and view students' CBC work —
          stay updated on learning progress, assessments, and achievements.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow">
            Get Started
          </button>
          <button className="bg-white hover:bg-gray-200 text-blue-600 font-semibold py-2 px-6 border border-blue-600 rounded-lg">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
