import React from "react";

const Title = () => {
  return (
    <div className="description">
      <p>The aim of the game is to guess the film or tv show of the Disney character</p>
      <ul className="list-disc my-5">
        <li>Each game has 10 rounds</li>
        <li>Each round you will be shown a new character, you will be given four answers but only one of them will be correct</li>
        <li>You will only have one guess per round</li>
        <li>At the end of the game you will be given a total score</li>
      </ul>
    </div>
  );
};

export default Title;
