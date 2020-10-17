import React from "react";
import SharedObject from "./SharedObject";

export default function SharedObjectList(props) {
  const button = props.areReady ? <CalculateResultBtn /> : <AddObjectBtn />;
  const sharedObjects = props.sharedObjects;

  const renderShared = [];
  sharedObjects.forEach((element) => {
    renderShared.push(
      <SharedObject
        name={element.name}
        isDevidable={element.isDevidable}
        key={element.id}
      />
    );
  });

  return (
    <div className="component-wrapper">
      {renderShared}
      {button}
    </div>
  );
}

function AddObjectBtn() {
  return (
    <button className="add-object-btn">
      <i class="fas fa-plus" aria-hidden="true"></i>
      Добавить объект спора
    </button>
  );
}

function CalculateResultBtn() {
  return <button className="add-object-btn">I'm calculate button</button>;
}
