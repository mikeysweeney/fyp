import React, { useState } from "react";
import "./form.css";


const Form = () => {
  const [showResults, setShowResults] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    {
      text: "How do you usually commute to work or school?",
      options: [
        { id: 0, text: "Drive alone in a car", carbonEmissions: 3600 },
        { id: 1, text: "Public transportation", carbonEmissions: 600 },
        { id: 2, text: "Carpool", carbonEmissions: 1000 },
        { id: 3, text: "Bike/Walk", carbonEmissions: 0 },
        { id: 4, text: "Work or study from home", carbonEmissions: 0 },
      ],
    },
    {
      text: "How often do you take domestic flights in a year?",
      options: [
        { id: 0, text: "More than 3 times", carbonEmissions: 2400 },
        { id: 1, text: "2-3 times", carbonEmissions: 1200 },
        { id: 2, text: "Once", carbonEmissions: 500 },
        { id: 3, text: "Never", carbonEmissions: 0 },
      ],
    },
    {
      text: "How often do you take international flights in a year?",
      options: [
        { id: 0, text: "More than 3 times", carbonEmissions: 6000 },
        { id: 1, text: "2-3 times", carbonEmissions: 4000 },
        { id: 2, text: "Once", carbonEmissions: 2000 },
        { id: 3, text: "Never", carbonEmissions: 0 },
      ],
    },
    {
      text: "How often do you use ride-hailing services like Uber or Lyft?",
      options: [
        { id: 0, text: "More than ten times a week", carbonEmissions: 9000 },
        { id: 1, text: "More than once a week", carbonEmissions: 1200 },
        { id: 2, text: "Once a week or less ", carbonEmissions: 300 },
        { id: 3, text: "Never", carbonEmissions: 0 },
      ],
    },
    {
      text: "How often do you drive a personal car for non-commuting purposes (e.g., shopping, entertainment)?",
      options: [
        { id: 0, text: "More than ten times a week", carbonEmissions: 9000 },
        { id: 1, text: "More than once a week", carbonEmissions: 1200 },
        { id: 2, text: "Once a week", carbonEmissions: 300 },
        { id: 3, text: "Never", carbonEmissions: 0 },
      ],
    },
  ];

  // Helper Functions

  /* A possible answer was clicked */
  const optionClicked = (carbonEmissions) => {
    // Increment the score
    setScore(score + carbonEmissions);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };

  return (
    <div className="App">
      {/* 1. Header  */}
      <h1>Carbon Calculator</h1>

      {/* 2. Current Score  */}
      <h2>Co2 emissions: {score} KG of CO2 emissions</h2>

      {/* 3. Show results or show the question game  */}
      {showResults ? (
        /* 4. Final Results */
        <div className="final-results">
          <h1>Final Results</h1>
          <h2>
            You output {score} KG of CO2 emissions a year - (
            {(score / 7300) * 100}% of the national average)
          </h2>
          <button onClick={() => restartGame()}>Restart quiz</button>
        </div>
      ) : (
        /* 5. Question Card  */
        <div className="question-card">
          {/* Current Question  */}
          <h2>
            Question: {currentQuestion + 1} out of {questions.length}
          </h2>
          <h3 className="question-text">{questions[currentQuestion].text}</h3>

          {/* List of possible answers  */}
          <ul>
            {questions[currentQuestion].options.map((option) => {
              return (
                <li1
                  key={option.id}
                  onClick={() => optionClicked(option.carbonEmissions)}
                >
                  {option.text}
                </li1>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Form;