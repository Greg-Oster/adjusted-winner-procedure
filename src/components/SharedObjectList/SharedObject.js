import React from "react";

export default function SharedObject(props) {
  const objectIndex = props.id;
  const anyPlayerReady = props.anyPlayerReady;

  return (
    <>
      <div className="shared-object__wrapper">
        <div className="shared-object__input">
          <input
            placeholder="Что будем делить?"
            value={props.name}
            onChange={props.changeSharedItem}
            id={props.id}
            disabled={anyPlayerReady ? "disabled" : ""}
          />
        </div>
        <div className="shared-object__devidable">делимый</div>
        <button
          className="shared-object__delete-btn"
          onClick={props.deleteItem(objectIndex)}
          disabled={anyPlayerReady ? "disabled" : ""}>
          <i className="fas fa-times" aria-hidden="true"></i>
        </button>
      </div>
    </>
  );
}
