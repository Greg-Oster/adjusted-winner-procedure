import React from "react";
import "./ProcedureHeader.scss";
import { data } from "../presetdata";

export default function ProcedureHeader(props) {
  const newData = data();
  return (
    <header>
      <nav>
        <div>
          <h2>Справедливый дележ</h2>
          <h3>процедура — “подстраивающийся победитель”</h3>
        </div>
        <button
          class="preset"
          id="preset_1"
          onClick={props.handlePresetClick(newData)}>
          Пресет 1
        </button>
      </nav>
    </header>
  );
}
