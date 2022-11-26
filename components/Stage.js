import Image from "next/image";
import React, { useEffect, useState } from "react";

const Stage = () => {
  const [characterImage, setCharacterImage] = useState([]);
  console.log("🚀 ~ file: Stage.js ~ line 6 ~ Stage ~ characterImage", characterImage);
  const [characterName, setCharacterName] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [roundCounter, setRoundCounter] = useState(0);

  //TODO -
  // some times the character ID fails and doesn't return anything, Put a check in to see if it fails call the API again until it gives back a success.
  // Once a character has been shown put them in a black list so they cant be shown again
  // Have a counter for the round

  const randomCharacters = (data) => {
    setWrongAnswers([]);
    for (let i = 0; i < 3; i++) {
      setWrongAnswers((state) => [...state, data[randomNum()].name]);
    }
    //setWrongAnswers((state) => [...state, answer]);
  };

  const randomNum = () => {
    return Math.floor(Math.random() * 50) + 0;
  };

  const getAllCharacter = async () => {
    try {
      const res = await fetch(`https://api.disneyapi.dev/characters`);
      const data = await res.json();
      randomCharacters(data.data);
    } catch (err) {
      console.log("--------", err);
    }
  };

  const getRandomCharacter = async () => {
    setCharacterImage([]);
    setCharacterName("");
    try {
      const res = await fetch(`https://api.disneyapi.dev/characters/${randomNum()}`);
      const data = await res.json();
      setCharacterImage(data.imageUrl);
      setCharacterName(data.name);
      getAllCharacter();
    } catch (err) {
      console.log("--------", err);
    }
  };

  const checkAnswer = (name) => {
    if (name === characterName) {
      alert("Correct");
      setScore(score + 1);
    } else {
      alert("Wrong");
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
      <button onClick={() => getRandomCharacter()}>Start</button>
      <div>
        <p>Play area</p>
        <div>{characterImage && <Image width="450" height="450" src={characterImage} alt="guess who" />}</div>
        {/* CSS to arrange the buttons randomly */}
        <button onClick={() => checkAnswer(characterName)}>Name 1 - {characterName}</button>
        {wrongAnswers.map((name, index) => (
          <button key={index} onClick={() => checkAnswer(name)}>
            Name {index + 2} - {name}
          </button>
        ))}
      </div>
    </main>
  );
};

export default Stage;
