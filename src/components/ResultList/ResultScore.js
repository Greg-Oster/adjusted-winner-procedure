import React from "react";

export default function ResultScore(props) {
  return (
    <div className="result-score">
      Удовлетворенность каждого участника спора:<br></br> {props.result} из 100
    </div>
  );
}
