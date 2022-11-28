//TODO -
// Refactor code
// Black list ID's. the ones that have been shown and the ones that return an error
// Refactor to use Axios and and resubmit requests based on HTTP error code

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Answers from "./Answers";
import Modal from "./Modal";
import Title from "./Title";

const Stage = () => {
  const [characterImage, setCharacterImage] = useState([]);
  const [characterName, setCharacterName] = useState("");
  const [allCharacterNames, setAllCharacterNames] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);
  const [showStartButton, setShowStartButton] = useState(false);
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
        console.log("----Error On initial load----", err);
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
      console.log("----Error On get ran char----", err, " - ranNum - ", ranNum);
      getRandomCharacter();
    }
  };

  const startGame = async () => {
    setShowStartButton(true);
    setGameCounter(gameCounter + 1);
    const ranNum = randomNum();
    try {
      const res = await fetch(`https://api.disneyapi.dev/characters/${ranNum}`);
      const data = await res.json();
      setCharacterImage(data.imageUrl);
      setCharacterName(data.name);
      getRandomCharacter();
    } catch (err) {
      console.log("----Error On Start Game----", err, " - ranNum - ", ranNum);
      startGame();
    }
  };

  const resetGame = () => {
    setScore(0);
    setGameCounter(0);
    setAllAnswers([]);
    setCharacterImage([]);
    setCharacterName("");
    setShowStartButton(false);
  };

  const gameOver = (gameCounter) => {
    if (gameCounter === 10) {
      resetGame();
    } else {
      setGameCounter(gameCounter + 1);
      getRandomCharacter();
    }
  };

  const checkAnswer = (name) => {
    if (name === characterName) {
      setScore(score + 1);
      gameOver(gameCounter);
    } else {
      gameOver(gameCounter);
    }
  };

  return (
    <main>
      <Title />
      <div className="my-5 text-center">
        <button className="btn" onClick={() => startGame()} disabled={showStartButton}>
          Start
        </button>
      </div>
      {allAnswers.length > 0 && (
        <div className="card w-96 bg-base-100 shadow-xl mx-auto">
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
      )}
      <Modal score={score} resetGame={resetGame} />
    </main>
  );
};

export default Stage;
