import React, { useEffect, useState } from "react";

const Stage = () => {
  const [character, setCharacter] = useState([]);
  const [answer, setAnswer] = useState([]);
  console.log("🚀 ~ file: Stage.js ~ line 5 ~ Stage ~ character", character);

  // const randomCharacters = (data) => {
  //   for (let i = 0; i < 10; i++) {
  //     setCharacters((state) => [...state, data[randomNum()]]);
  //   }
  // };

  const randomNum = () => {
    return Math.floor(Math.random() * 50) + 0;
  };

  const callAPI = async () => {
    setCharacter([]);
    try {
      const res = await fetch(`https://api.disneyapi.dev/characters/${randomNum()}`);
      const data = await res.json();
      console.log("🚀 ~ file: Stage.js ~ line 23 ~ callAPI ~ data", data);
      setCharacter(data);
      //randomCharacters(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main>
      <p>The aim of the game is to guess the film or tv show of the Disney character</p>
      <ul>
        <li>Each game has 10 rounds</li>
        <li>Each round you will be shown a new character, you will be given four answers but only one of them will be correct</li>
        <li>You will only have one guess per round</li>
        <li>At the end of the game you will be given a total score</li>
      </ul>
      <button onClick={() => callAPI()}>Start</button>
      <div>
        <p>Play area</p>
      </div>
    </main>
  );
};

export default Stage;
