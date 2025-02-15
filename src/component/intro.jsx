import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const IntroScreen = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (name.trim() !== "") {
      navigate("/quiz");
    } else {
      alert("Please enter your name");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-bold">Before we dive into the quiz, we'd like to know your name.</h1>
        <p className="mt-2 text-gray-400">
          This will help us provide a more personalized solution, ensuring that the beard style and
          product recommendations are perfectly tailored to suit you.
        </p>
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-4 p-3 border border-gray-600 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <div className="flex justify-between mt-6">
          <button className="px-6 py-2 bg-gray-700 rounded-lg" onClick={() => navigate(-1)}>← Back</button>
          <button className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700" onClick={handleNext}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
