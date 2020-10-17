import React, { Component } from "react";
import ProcedureHeader from "./ProcedureHeader/ProcedureHeader";
import SharedObjectList from "./SharedObjectList/SharedObjectList";
import Player from "./Player/Player";
import ResultList from "./ResultList/ResultList";

export default class ProcedureBrain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sharedObjects: [
        {
          id: 1,
          name: "Первый объект",
          firstPlayerScore: 0,
          secondPlayerScore: 0,
        },
        {
          id: 2,
          name: "Второй объект",
          firstPlayerScore: 0,
          secondPlayerScore: 0,
        },
        {
          id: 3,
          name: "Третий объект",
          firstPlayerScore: 0,
          secondPlayerScore: 0,
        },
      ],
      firstPlayer: { name: "Игрок 1", ready: false },
      secondPlayer: { name: "Игрок 2", ready: false },
    };
  }
  render() {
    const firstPlayer = this.state.firstPlayer;
    const secondPlayer = this.state.secondPlayer;
    const playersReady = firstPlayer.ready && secondPlayer.ready ? true : false;
    return (
      <>
        <ProcedureHeader />
        <div class="procedure-body__outer-wrapper">
          <div class="procedure-body__inner-wrapper">
            <SharedObjectList areReady={playersReady} />
            <Player name={this.state.firstPlayer.name} />
            <Player name={this.state.secondPlayer.name} />
            <ResultList />
          </div>
        </div>
      </>
    );
  }
}
