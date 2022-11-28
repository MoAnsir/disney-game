//TODO -
// Daisy UI
// Refactor code
// Black list ID's. the ones that have been shown and the ones that return an error

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Answers from "./Answers";
import Modal from "./Modal";

const Stage = () => {
  const [characterImage, setCharacterImage] = useState([]);
  const [characterName, setCharacterName] = useState("");
  const [allCharacterNames, setAllCharacterNames] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);
  const [startGameCounter, setStartGameCounter] = useState(false);
  const [score, setScore] = useState(0);
  const [gameCounter, setGameCounter] = useState(0);
  //const [blackList, setBlackList] = useState([]);

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
        setAllCharacterNames((state) => [...state, data[randomNum()].name]);
      }
    };
    getAllCharacterNames();
  }, []);

  const getRandomCharacter = async () => {
    setAllAnswers([]);
    setCharacterImage([]);
    setCharacterName("");
    const ranNum = randomNum();
    try {
      const res = await fetch(`https://api.disneyapi.dev/characters/${ranNum}`);
      const data = await res.json();
      setCharacterImage(data.imageUrl);
      setCharacterName(data.name);
      for (let i = 0; i < 3; i++) {
        setAllAnswers((state) => [...state, allCharacterNames[randomNum()]]);
        if (i === 2) {
          setAllAnswers((state) => [...state, data.name]);
        }
      }
    } catch (err) {
      console.log("----ERROR----", err, " - ranNum - ", ranNum);
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
  const resetGame = () => {
    setScore(0);
    setGameCounter(0);
    setAllAnswers([]);
    setCharacterImage([]);
    setCharacterName("");
    setStartGameCounter(false);
  };

  const checkAnswer = (name) => {
    console.log("name - ", name);
    if (name === characterName) {
      //alert("Correct");
      setScore(score + 1);
      setGameCounter(gameCounter + 1);
      if (gameCounter === 10) {
        alert("Finished your score is - ", score, " Game counter is - ", gameCounter);
        console.log("Finished your score is - ", score, " Game counter is - ", gameCounter);
        setScore(0);
        setGameCounter(0);
        setAllAnswers([]);
        setCharacterImage([]);
        setCharacterName("");
        setStartGameCounter(false);
      } else {
        getRandomCharacter();
      }
    } else {
      //alert("Wrong");
      setGameCounter(gameCounter + 1);
      if (gameCounter === 10) {
        alert("Finished your score is - ", score, " Game counter is - ", gameCounter);
        console.log("Finished your score is - ", score, " Game counter is - ", gameCounter);
        setScore(0);
        setGameCounter(0);
        setAllAnswers([]);
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
      <button className="btn" onClick={() => startGame()} disabled={startGameCounter}>
        Start
      </button>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>{characterImage && characterImage.length > 0 ? <Image width="450" height="450" src={characterImage} alt="guess who" /> : <p>Loading.....</p>}</figure>
        <div className="card-body">
          {gameCounter === 10 ? (
            <label htmlFor="my-modal" className="btn">
              Game Over!
            </label>
          ) : (
            <Answers allAnswers={allAnswers} checkAnswer={checkAnswer} />
          )}
        </div>
      </div>
      <Modal score={score} resetGame={resetGame} />
    </main>
  );
};

export default Stage;
