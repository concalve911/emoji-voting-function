import React, { useState } from "react";
import "../style/voting.styles.scss";

export default () => {
  const emojis = ["😀", "😂", "😍", "😎", "🤔"];

  const [counts, setCounts] = useState(Array(emojis.length).fill(0));
  const [showResults, setShowResults] = useState(false);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    const newCounts = [...counts];
    newCounts[index] += 1;
    setCounts(newCounts);
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const handleClearResults = () => {
    setCounts(Array(emojis.length).fill(0));
    setShowResults(false);
    setWinner(null);
  };

  const handleShowWinner = () => {
    const maxVotes = Math.max(...counts);
    const winnerIndex = counts.indexOf(maxVotes);
    setWinner(emojis[winnerIndex]);
    setShowResults(true);
  };

  return (
    <div className="emoji__container">
      {emojis.map((emoji, index) => (
        <div
          key={index}
          className="emoji__box"
          onClick={() => handleClick(index)}
        >
          <span>{emoji}</span>
          <div className="emoji__count">Клики: {counts[index]}</div>
        </div>
      ))}

      <div className="emoji__btn-inner">
        <button className="emoji__btn" onClick={handleShowResults}>
          Show Result
        </button>
        <button className="emoji__btn" onClick={handleClearResults}>
          Clear
        </button>
        <button className="emoji__btn" onClick={handleShowWinner}>
          Show Winner
        </button>
      </div>

      {showResults && (
        <div className="emoji__results">
          <h3>Results:</h3>
          <ul>
            {emojis.map((emoji, index) => (
              <li className="emoji__results-item" key={index}>
                {emoji}: {counts[index]} votes
              </li>
            ))}
          </ul>

          {winner && (
            <div>
              <h3>Winner: {winner}</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
