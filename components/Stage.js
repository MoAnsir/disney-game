import Image from "next/image";
import React, { useEffect, useState } from "react";

const Stage = () => {
  const [character, setCharacter] = useState([]);
  const [allCharactersNames, setAllCharactersNames] = useState([]);
  const [answer, setAnswer] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState([]);
  console.log("🚀 ~ file: Stage.js ~ line 7 ~ Stage ~ allCharacters", allCharactersNames);
  //console.log("🚀 ~ file: Stage.js ~ line 5 ~ Stage ~ character", character);

  //TODO -
  // some times the character ID fails and doesn't return anything, Put a check in to see if it fails call the API again until it gives back a success.
  // Once a character has been shown put them in a black list so they cant be shown again
  // Have a counter for the round

  const randomCharacters = (data) => {
    for (let i = 0; i < 30; i++) {
      setAllCharactersNames((state) => [...state, data[randomNum()].name]);
    }
  };

  const randomNum = () => {
    return Math.floor(Math.random() * 50) + 0;
  };

  const getAllCharacter = async () => {
    setAllCharactersNames([]);
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
    } catch (err) {
      console.log("--------", err);
    }
  };

  useEffect(() => {
    getAllCharacter();
  }, []);

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
        <div>Name 1 - {answer}</div>
        <div>Name 2 - {allCharactersNames[randomNum()]}</div>
        <div>Name 3 - {allCharactersNames[randomNum()]}</div>
        <div>Name 4 - {allCharactersNames[randomNum()]}</div>
      </div>
    </main>
  );
};

export default Stage;
