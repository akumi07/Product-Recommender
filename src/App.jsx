import React, { useState } from "react"; 
import { Toaster, toast } from "react-hot-toast";

// Utility function to shuffle an array
const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const App = () => {
  const questions = [
    { question: "How do you like your perfume intensity?", options: ["Mild", "Moderate", "Strong"] },
    { question: "Which fragrance type do you prefer?", options: ["Floral", "Woody", "Citrusy", "Fresh"] },
    { question: "Do you need a mist that refreshes your skin?", options: ["Yes", "No"] },
    { question: "When do you usually wear perfume?", options: ["Morning", "Evening", "All day"] },
    { question: "What benefit do you want from your perfume?", options: ["Relaxation", "Energy Boost", "Confidence"] }
  ];

  const products = [
    { id: 1, name: "Serenity Mist", keywords: ["Relaxation", "Mild"], image: "https://via.placeholder.com/150", url: "https://www.blisifu.com/product-page/serenity-mist" },
    { id: 2, name: "Energy Mist", keywords: ["Energy Boost", "Strong"], image: "https://via.placeholder.com/150", url: "https://www.blisifu.com/product-page/energy-mist" },
    { id: 3, name: "Bliss Mist", keywords: ["Confidence", "Moderate"], image: "https://via.placeholder.com/150", url: "https://www.blisifu.com/product-page/vitality-mist" }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recommendedProduct, setRecommendedProduct] = useState(null);
  const [shuffledQuestions, setShuffledQuestions] = useState(shuffleArray(questions));  // Store shuffled questions

  const handleSelect = (option) => {
    setAnswers({ ...answers, [currentQuestion]: option });
  };

  const nextQuestion = () => {
    if (!answers[currentQuestion]) {
      toast.error("Please select an option before proceeding!");
      return;
    }
    setCurrentQuestion((prev) => prev + 1);
  };

  const prevQuestion = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  // Confirmation for closing quiz
  const closeQuiz = () => {
    if (Object.keys(answers).length !== questions.length) {
      toast("Oops! You haven't completed the quiz. Hoping to see you back soon!", { icon: "😢" });
    }

    // Show confirmation toast
    toast.custom((t) => (
      <div className="bg-white p-4 rounded-lg shadow-md max-w-xs mx-auto">
        <p className="text-center">Are you sure you want to end the quiz?</p>
        <div className="flex justify-between mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={() => {
              toast.dismiss(t.id);
              window.top.location.href = "https://www.blisifu.com"; // Redirect to a different page
            }}
          >
            Yes, End Quiz
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            onClick={() => toast.dismiss(t.id)}
          >
            No, Stay
          </button>
        </div>
      </div>
    ));
  };

  const calculateRecommendation = () => {
    const match = products.find((product) =>
      product.keywords.some((keyword) => answers[currentQuestion] && answers[currentQuestion].includes(keyword))
    );
    setRecommendedProduct(match || products[0]);
  };

  const submitQuiz = () => {
    if (Object.keys(answers).length !== questions.length) {
      toast.error("Please complete all questions before submitting!");
      return;
    }
    calculateRecommendation();
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Background Video */}
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover" 
        autoPlay 
        loop 
        muted 
      >
        <source src="/perfumeMaking.mp4" type="video/mp4" />
      </video>

      <Toaster />
      <h1 className="text-2xl font-bold text-white z-10 mb-6">Perfume Recommender</h1>

      {/* Quiz Section */}
      {!recommendedProduct ? (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full z-10 relative">
          <button
            onClick={closeQuiz}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
          <h2 className="text-xl font-semibold mb-4">Question {currentQuestion + 1} of {shuffledQuestions.length}</h2>
          <p className="mb-4">{shuffledQuestions[currentQuestion].question}</p>
          <div className="grid grid-cols-2 gap-3">
            {shuffledQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className={`p-3 rounded-lg text-white ${answers[currentQuestion] === option ? "bg-blue-600" : "bg-gray-400 hover:bg-gray-500"}`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className={`px-4 py-2 rounded-lg ${currentQuestion === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"}`}
            >
              Previous
            </button>
            {currentQuestion < shuffledQuestions.length - 1 ? (
              <button
                onClick={nextQuestion}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Next
              </button>
            ) : (
              <button
                onClick={submitQuiz}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      ) : (
        // Recommendation Section
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full z-10 relative">
          <h2 className="text-xl font-semibold mb-4">Recommended Product</h2>
          <div className="flex flex-col items-center">
            <img
              src={recommendedProduct.image}
              alt={recommendedProduct.name}
              className="w-40 h-40 mb-4"
            />
            <h3 className="text-lg font-bold mb-2">{recommendedProduct.name}</h3>
            <a
              href={recommendedProduct.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Buy Now
            </a>
          </div>
          <button
            onClick={closeQuiz}
            className="mt-4 text-gray-600 underline"
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
