import Image from "next/image";
import React, { useEffect, useState } from "react";

const Stage = () => {
  const [character, setCharacter] = useState([]);
  const [answer, setAnswer] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState([]);
  console.log("🚀 ~ file: Stage.js ~ line 5 ~ Stage ~ character", character);

  //TODO -
  // some times the character ID fails and doesn't return anything, Put a check in to see if it fails if so call it again until it gives back a success.
  // Once it had show a character put them in a black list so they cant be shown again
  // Have a counter for the round

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
    setAnswer("");
    try {
      const res = await fetch(`https://api.disneyapi.dev/characters/${randomNum()}`);
      const data = await res.json();
      console.log("🚀 ~ file: Stage.js ~ line 23 ~ callAPI ~ data", data);
      setCharacter(data);
      setAnswer(data.name);
      //randomCharacters(data.data);
    } catch (err) {
      //Rerun the api call
      console.log("--------", err);
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
        <div>{character.imageUrl && <Image width="450" height="450" src={character.imageUrl} alt="guess who" />}</div>
        <div>Name - {answer}</div>
      </div>
    </main>
  );
};

export default Stage;
