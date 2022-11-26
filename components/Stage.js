import Image from "next/image";
import React, { useEffect, useState } from "react";

const Stage = () => {
  const [character, setCharacter] = useState([]);
  const [answer, setAnswer] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [score, setScore] = useState();

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
    setCharacter([]);
    setAnswer("");
    try {
      const res = await fetch(`https://api.disneyapi.dev/characters/${randomNum()}`);
      const data = await res.json();
      setCharacter(data);
      setAnswer(data.name);
      getAllCharacter();
    } catch (err) {
      console.log("--------", err);
    }
  };

  const checkAnsewr = (name) => {
    if (name === answer) {
      alert("Correct");
    } else {
      alert("Wrong");
    }
  };

  // useEffect(() => {
  //   setWrongAnswers((state) => [...state, answer]);
  // }, []);

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
        <div>{character.imageUrl && <Image width="450" height="450" src={character.imageUrl} alt="guess who" />}</div>
        <button onClick={() => checkAnsewr(answer)}>Name 1 - {answer}</button>
        {wrongAnswers.map((name, index) => (
          <button key={index} onClick={() => checkAnsewr(name)}>
            Name {index + 2} - {name}
          </button>
        ))}
      </div>
    </main>
  );
};

export default Stage;
