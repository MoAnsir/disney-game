import React from "react";

const Answers = ({ allAnswers, checkAnswer }) => {
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  return (
    <>
      {shuffle(allAnswers).map((name, index) => (
        <button htmlFor="my-modal" className={`btn a-${index}`} key={index} onClick={() => checkAnswer(name)}>
          {name}
        </button>
      ))}
    </>
  );
};

export default Answers;
