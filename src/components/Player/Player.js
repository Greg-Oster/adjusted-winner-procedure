import React from "react";

export default function Player(props) {
  const sharedObjects = props.sharedObjects;
  const player = props.player;
  let remainPointsF = 100;
  let remainPointsS = 100;

  const renderShared = [];
  sharedObjects.forEach((element, index) => {
    remainPointsF -= isNaN(element.firstPlayerScore)
      ? 0
      : element.firstPlayerScore;
    remainPointsS -= isNaN(element.secondPlayerScore)
      ? 0
      : element.secondPlayerScore;
    renderShared.push(
      <PlayerObject
        handleChange={props.handleInputChange}
        name={element.name}
        playerScore={
          player === "first"
            ? element.firstPlayerScore
            : element.secondPlayerScore
        }
        isDevidable={element.isDevidable}
        key={element.id}
        number={index}
        ready={props.ready}
      />
    );
  });

  const remainPoints = player === "first" ? remainPointsF : remainPointsS;

  return (
    <>
      <div className="player">
        <h3 className="player__header">
          <input type="text" value={props.name} onChange={props.handleChange} />
        </h3>
        <div className="component-wrapper">
          {renderShared}
          {remainPoints > 0 ? (
            <RemainPoints value={remainPoints} />
          ) : remainPoints < 0 ? (
            <RemainPoints value={remainPoints} />
          ) : (
            <PlayerReadyBtn
              handleClick={props.readyBtnClick}
              ready={props.ready}
            />
          )}
        </div>
      </div>
    </>
  );
}

function PlayerObject(props) {
  const ready = props.ready;
  const wrapperClass = ready
    ? "player-object__wrapper player-ready"
    : "player-object__wrapper ";
  return (
    <div className={wrapperClass}>
      <div className="player-object__name">{props.name}</div>
      <input
        type="number"
        className="player-object__score"
        value={props.playerScore || ""}
        onChange={props.handleChange}
        id={props.number}
        disabled={ready ? "disabled" : ""}
      />
    </div>
  );
}

function RemainPoints(props) {
  return (
    <div className="remain-points-status">
      <span>Осталось баллов</span>
      <span>{props.value}</span>
    </div>
  );
}

function PlayerReadyBtn(props) {
  const ready = props.ready;
  return (
    <button className="player-ready-btn" onClick={props.handleClick}>
      {ready ? "Отменить" : "Готово"}
    </button>
  );
}
