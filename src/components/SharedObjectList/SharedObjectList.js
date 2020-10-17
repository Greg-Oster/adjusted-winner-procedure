import React from "react";

export default function SharedObjectList(props) {
  const button = props.areReady ? <CalculateResultBtn /> : <AddObjectBtn />;

  return (
    <div>
      <SharedObject />
      <SharedObject />
      <SharedObject />
      {button}
    </div>
  );
}

function SharedObject(props) {
  return <div className="">i'm shared object</div>;
}

function AddObjectBtn() {
  return <button>I'm add button</button>;
}

function CalculateResultBtn() {
  return <button>I'm calculate button</button>;
}
