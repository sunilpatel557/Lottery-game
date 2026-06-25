
import React, { useState } from "react";
import "./Lottery.css";

export default function Lottery() {
  const [lot, setLot] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [history, setHistory] = useState([]);
  const [prize, setPrize] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0)

  const luckyNumber = 5;
  const prizeAmount = 50000;

  function openLottery() {
    const random = Math.floor(Math.random() * 5) + 1;
    setLot(random);
    setAttempts(prev => prev + 1);

    const result = random === luckyNumber;

    setHistory(prev => {
      const updated = [
        { number: random, result: result ? "Win" : "Lose" },
        ...prev,
      ];
      return updated.slice(0, 5);
    });

    if (result) {
      setWins(prev => prev + 1);
      setPrize(prev => prev + prizeAmount);
      setStreak(prev => {
        const next = prev + 1;
        setBestStreak(best => Math.max(best, next));
        return next;
      });
    } else {
      setLosses(prev => prev + 1);
      setStreak(0);
    }
  }

  function resetGame() {
    setLot(null);
    setAttempts(0);
    setWins(0);
    setLosses(0);
    setHistory([]);
    setPrize(0);
    setStreak(0);
    setBestStreak(0);
  }

  function clearHistory() {
    setHistory([]);
  }

  const rate = attempts ? ((wins / attempts) * 100).toFixed(1) : 0;

  return (
    <div className="page">
      <div className="card">
        <h1>🎲 Sunil Lottery</h1>
        <p>Lucky Number: <b>{luckyNumber}</b> | Prize: ₹{prizeAmount.toLocaleString()}</p>

        <div className="btns">
          <button onClick={openLottery}>{lot === null ? "Open Lottery" : "Try Again"}</button>
          <button className="secondary" onClick={resetGame}>Reset</button>
          <button className="secondary" onClick={clearHistory}>Clear History</button>
        </div>

        {lot !== null && (
          <>
            <h2>Your Number: {lot}</h2>
            {lot === luckyNumber ? (
              <p className="win">🎉 Congratulations! You won.</p>
            ) : (
              <p className="lose">😔 Better Luck Next Time.</p>
            )}
          </>
        )}

        <div className="grid">
          <div className="box"><h3>Attempts</h3><p>{attempts}</p></div>
          <div className="box"><h3>Wins</h3><p>{wins}</p></div>
          <div className="box"><h3>Losses</h3><p>{losses}</p></div>
          <div className="box"><h3>Win %</h3><p>{rate}%</p></div>
          <div className="box"><h3>Prize Won</h3><p>₹{prize.toLocaleString()}</p></div>
          <div className="box"><h3>Current Streak</h3><p>{streak}</p></div>
          <div className="box"><h3>Best Streak</h3><p>{bestStreak}</p></div>
        </div>

        <h2>Last 5 Results</h2>
        <div className="history">
          {history.length === 0 ? (
            <p>No history yet.</p>
          ) : (
            history.map((item, index) => (
              <div key={index} className={item.result === "Win" ? "historyItem winBox" : "historyItem loseBox"}>
                #{history.length - index}<br/>
                {item.number}<br/>
                {item.result}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
