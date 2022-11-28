import Image from "next/image";
import React, { useEffect, useState } from "react";

const Stage = () => {
  const [characterImage, setCharacterImage] = useState([]);
  const [characterName, setCharacterName] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [startGameCounter, setStartGameCounter] = useState(false);
  const [score, setScore] = useState(0);
  const [gameCounter, setGameCounter] = useState(0);
  const [blackList, setBlackList] = useState([]);
  //console.log("🚀 ~ file: Stage.js ~ line 11 ~ Stage ~ blackList", blackList);
  //console.log("🚀 ~ file: Stage.js ~ line 6 ~ Stage ~ characterImage", characterImage);

  //TODO -
  // use css to randomly position button elements.
  // Have a counter for the round
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
    setWrongAnswers([]);
    setCharacterImage([]);
    setCharacterName("");
    const ranNum = randomNum();
    try {
      const res = await fetch(`https://api.disneyapi.dev/characters/${ranNum}`);
      const data = await res.json();
      setCharacterImage(data.imageUrl);
      setCharacterName(data.name);
      //setWrongAnswers(data.name);
      //setBlackList((state) => [...state, ranNum]);
      //getAllCharacter();
      //getAllCharacterNames();
    } catch (err) {
      console.log("--------", err, " - ranNum - ", ranNum);
      //setBlackList((state) => [...state, ranNum]);
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
      } else {
        getRandomCharacter();
      }
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
      <button onClick={() => startGame()} disabled={startGameCounter}>
        Start
      </button>
      <div>
        <p>Play area</p>
        <div>{characterImage && characterImage.length > 0 ? <Image width="450" height="450" src={characterImage} alt="guess who" /> : <p>Loading.....</p>}</div>
        {/* CSS to arrange the buttons randomly */}
        <div className="one">1</div>
        <div className="two">2</div>
        <div className="three">3</div>
        <div className="four">4</div>
        {/* Put all the answers into one array, then loop over array and assign random index */}
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
