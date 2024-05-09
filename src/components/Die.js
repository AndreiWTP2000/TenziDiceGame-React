function Die(props) {
  return (
    <div
      className={`die ${props.isClicked ? "dice-locked" : ""}`}
      onClick={props.holdDice}
    >
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}

export default Die;
