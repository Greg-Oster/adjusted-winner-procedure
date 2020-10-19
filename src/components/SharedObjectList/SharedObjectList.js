import React from "react";
import SharedObject from "./SharedObject";

export default function SharedObjectList(props) {
  const button = props.areReady ? (
    <CalculateResultBtn calculateResult={props.calculateResult} />
  ) : (
    <AddObjectBtn
      addObject={props.addObject}
      anyPlayerReady={props.anyPlayerReady}
    />
  );
  const sharedObjects = props.sharedObjects;

  const renderShared = [];
  sharedObjects.forEach((element, index) => {
    renderShared.push(
      <SharedObject
        name={element.name}
        isDevidable={element.isDevidable}
        key={element.id}
        changeSharedItem={props.changeSharedItem}
        id={index}
        deleteItem={props.deleteItem}
        anyPlayerReady={props.anyPlayerReady}
      />
    );
  });

  return (
    <>
      <div className="shared-object">
        <h3>Список объектов спора</h3>
        <div className="component-wrapper">
          {renderShared}
          {button}
        </div>
      </div>
    </>
  );
}

function AddObjectBtn(props) {
  return (
    <button
      className="add-object-btn"
      onClick={props.addObject}
      disabled={props.anyPlayerReady ? "disabled" : ""}>
      {props.anyPlayerReady ? (
        ""
      ) : (
        <i className="fas fa-plus" aria-hidden="true"></i>
      )}
      {props.anyPlayerReady
        ? "Участник подтвердил готовность"
        : "Добавить объект спора"}
    </button>
  );
}

function CalculateResultBtn(props) {
  return (
    <button className="calculate-btn" onClick={props.calculateResult}>
      Посчитать
    </button>
  );
}
