import React from "react";

export default function Remake(props) {
  return (
    <button className="reset-app" onClick={props.handleReset}>
      Очистить все
    </button>
  );
}
