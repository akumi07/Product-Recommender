import React from "react";
import {
  BrowserRouter as Router,
  Route, Routes
} from 'react-router-dom';
import Quiz from "./component/Quiz";
import IntroScreen from "./component/intro";// Import the Quiz component

const App = () => {
  return (
    
            <div>
                <Routes>
                    <Route path="/" element={<IntroScreen />} />
                    <Route path="/quiz" element={<Quiz/>} />
                    
                </Routes>
            </div>
        
  );
};

export default App;
