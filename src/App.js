import Die from "./components/Die";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
function App() {
  const generateDice = () => {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    };
  };
  const allNewDice = () => {
    const dices = [];
    for (let i = 0; i < 10; i++) {
      dices.push(generateDice());
    }
    return dices;
  };

  const rollDice = () => {
    if (!tenzies) {
      setDicesArray((prevDiceArray) =>
        prevDiceArray.map((dice) => {
          return dice.isHeld ? dice : generateDice();
        })
      );
    } else {
      setTenzies(false);
      setDicesArray(allNewDice());
      setRolls(0);
    }
  };

  const holdDice = (id) => {
    setDicesArray((oldDice) =>
      oldDice.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      })
    );
  };

  const [dicesArray, setDicesArray] = useState(allNewDice);
  const diceElements = dicesArray.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isClicked={die.isHeld}
      holdDice={() => {
        holdDice(die.id);
      }}
    />
  ));

  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useState(1);
  const incrementRolls = () => {
    setRolls((prevRolls) => prevRolls + 1);
  };

  useEffect(() => {
    const allHeld = dicesArray.every((die) => die.isHeld);
    const firstValue = dicesArray[0].value;
    const allSameValue = dicesArray.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won");
    }
  }, [dicesArray]);
  return (
    <div className="App">
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          {!tenzies
            ? "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."
            : "You Won!"}
        </p>
        <div className="dice-container">{diceElements}</div>
        <p className="instructions">Rolls: {rolls}</p>
        <button
          className="roll"
          onClick={() => {
            rollDice();
            incrementRolls();
          }}
        >
          {!tenzies ? "Roll" : "New Game"}
        </button>
      </main>
    </div>
  );
}

export default App;
