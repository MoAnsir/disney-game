import Image from "next/image";
import React, { useEffect, useState } from "react";

const Stage = () => {
  const [characterImage, setCharacterImage] = useState([]);
  const [characterName, setCharacterName] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [wrongAnswers2, setWrongAnswers2] = useState([]);
  const [startGameCounter, setStartGameCounter] = useState(false);
  const [score, setScore] = useState(0);
  const [gameCounter, setGameCounter] = useState(0);
  //const [blackList, setBlackList] = useState([]);
  //console.log("🚀 ~ file: Stage.js ~ line 11 ~ Stage ~ blackList", blackList);
  //console.log("🚀 ~ file: Stage.js ~ line 6 ~ Stage ~ characterImage", characterImage);
  //console.log("🚀 ~ file: Stage.js ~ line 6 ~ Stage ~ wrongAnswers2", wrongAnswers2);

  //TODO -
  // use css to randomly position button elements.
  // Black list ID's. the ones that have been shown and the ones that return an error

  const randomNum = () => {
    return Math.floor(Math.random() * 50) + 0;
  };

  useEffect(() => {
    const getAllCharacterNames = async () => {
      try {
        const res = await fetch(`https://api.disneyapi.dev/characters`);
        const data = await res.json();
        setRandomCharacterNames(data.data);
      } catch (err) {
        console.log("--------", err);
      }
    };
    const setRandomCharacterNames = (data) => {
      console.log(data.length);
      for (let i = 0; i <= data.length; i++) {
        setWrongAnswers((state) => [...state, data[randomNum()].name]);
      }
    };
    getAllCharacterNames();
  }, []);

  const getRandomCharacter = async () => {
    setWrongAnswers2([]);
    setCharacterImage([]);
    setCharacterName("");
    const ranNum = randomNum();
    try {
      const res = await fetch(`https://api.disneyapi.dev/characters/${ranNum}`);
      const data = await res.json();
      setCharacterImage(data.imageUrl);
      setCharacterName(data.name);
      for (let i = 0; i < 3; i++) {
        setWrongAnswers2((state) => [...state, wrongAnswers[randomNum()]]);
        if (i === 2) {
          setWrongAnswers2((state) => [...state, data.name]);
        }
      }
    } catch (err) {
      console.log("--------", err, " - ranNum - ", ranNum);
      getRandomCharacter();
    }
  };

  const startGame = async () => {
    setStartGameCounter(true);
    setGameCounter(gameCounter + 1);
    const ranNum = randomNum();
    try {
      const res = await fetch(`https://api.disneyapi.dev/characters/${ranNum}`);
      const data = await res.json();
      setCharacterImage(data.imageUrl);
      setCharacterName(data.name);
      getRandomCharacter();
    } catch (err) {
      console.log("----ERROR----", err, " - ranNum - ", ranNum);
      startGame();
    }
  };

  const checkAnswer = (name) => {
    if (name === characterName) {
      alert("Correct");
      setScore(score + 1);
      setGameCounter(gameCounter + 1);
      if (gameCounter === 10) {
        alert("Finished your score is - ", score, " Game counter is - ", gameCounter);
        setScore(0);
        setGameCounter(0);
        setWrongAnswers2([]);
        setCharacterImage([]);
        setCharacterName("");
        setStartGameCounter(false);
      } else {
        getRandomCharacter();
      }
    } else {
      alert("Wrong");
      setGameCounter(gameCounter + 1);
      if (gameCounter === 10) {
        alert("Finished your score is - ", score, " Game counter is - ", gameCounter);
        setScore(0);
        setGameCounter(0);
        setWrongAnswers2([]);
        setCharacterImage([]);
        setCharacterName("");
        setStartGameCounter(false);
      } else {
        getRandomCharacter();
      }
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
      <button onClick={() => startGame()} disabled={startGameCounter}>
        Start
      </button>
      <div>
        <p>Play area</p>
        <div>{characterImage && characterImage.length > 0 ? <Image width="450" height="450" src={characterImage} alt="guess who" /> : <p>Loading.....</p>}</div>
        {wrongAnswers2.map((name, index) => (
          <button key={index} onClick={() => checkAnswer(name)}>
            Name {index + 1} - {name}
            {/* {name[Math.floor(Math.random() * items.length)]} */}
          </button>
        ))}
      </div>
    </main>
  );
};

export default Stage;
