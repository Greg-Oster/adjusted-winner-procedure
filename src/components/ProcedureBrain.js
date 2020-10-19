import React, { Component } from "react";
import ProcedureHeader from "./ProcedureHeader/ProcedureHeader";
import SharedObjectList from "./SharedObjectList/SharedObjectList";
import Player from "./Player/Player";
import ResultList from "./ResultList/ResultList";
import { v4 as uuidv4 } from "uuid";

import { data } from "./data";

export default class ProcedureBrain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sharedObjects: data,
      firstPlayer: { name: "Игрок 1", ready: false },
      secondPlayer: { name: "Игрок 2", ready: false },
      renderResult: false,
    };
  }

  changeSharedItem = (e) => {
    let itemId = e.target.id;
    let updateObject = this.state.sharedObjects.slice();
    updateObject[itemId].name = e.target.value;
    this.setState({
      sharedObjects: updateObject,
    });
  };

  addObject = () => {
    this.setState({
      sharedObjects: [
        ...this.state.sharedObjects,
        {
          id: uuidv4(),
          name: "",
          firstPlayerScore: null,
          secondPlayerScore: null,
          isDevidable: false,
        },
      ],
    });
  };

  handleChange = (name) => (e) => {
    this.setState({
      [name]: {
        ...this.state[name],
        name: e.target.value,
      },
    });
  };

  deleteItem = (index) => (e) => {
    let updateObject = this.state.sharedObjects.slice();
    updateObject.splice(index, 1);
    this.setState({
      sharedObjects: updateObject,
    });
  };

  //sharedObjects[{…}, {…}, {…}, {…}, {…}, {…}, {…}]
  //  0: {firstPlayerScore: 17, id: 1, isDevidable: false, n…}
  handleInputChange = (name) => (e) => {
    let newObject = this.state.sharedObjects.slice();
    if (name === "firstPlayerScore") {
      newObject[e.target.id].firstPlayerScore = parseInt(e.target.value);
    } else {
      newObject[e.target.id].secondPlayerScore = parseInt(e.target.value);
    }

    this.setState({
      sharedObjects: newObject,
    });
  };

  readyBtnClick = (name) => (e) => {
    const flagReady =
      name === "firstPlayer"
        ? this.state.firstPlayer.ready
        : this.state.secondPlayer.ready;
    this.setState({
      [name]: {
        ...this.state[name],
        ready: !flagReady,
      },
      renderResult: false,
    });
  };

  calculateResult = (e) => {
    this.setState({
      renderResult: true,
    });
  };

  handlePresetClick = (array) => (e) => {
    this.setState({
      sharedObjects: array.slice(),
      firstPlayer: { name: "Профсоюз", ready: false },
      secondPlayer: { name: "Аэрофлот", ready: false },
      renderResult: false,
    });
  };

  handleReset = (e) => {
    this.setState({
      sharedObjects: [],
      firstPlayer: { name: "Игрок 1", ready: false },
      secondPlayer: { name: "Игрок 2", ready: false },
      renderResult: false,
    });
  };

  render() {
    const firstPlayer = this.state.firstPlayer;
    const secondPlayer = this.state.secondPlayer;
    const playersReady = firstPlayer.ready && secondPlayer.ready ? true : false;
    const anyPlayerReady =
      firstPlayer.ready || secondPlayer.ready ? true : false;
    return (
      <>
        <ProcedureHeader handlePresetClick={this.handlePresetClick} />
        <div className="procedure-body">
          <div className="procedure-body__inner-wrapper">
            <SharedObjectList
              areReady={playersReady}
              anyPlayerReady={anyPlayerReady}
              sharedObjects={this.state.sharedObjects}
              calculateResult={this.calculateResult}
              changeSharedItem={this.changeSharedItem}
              addObject={this.addObject}
              deleteItem={this.deleteItem}
            />

            <Player
              name={this.state.firstPlayer.name}
              sharedObjects={this.state.sharedObjects}
              player="first"
              ready={this.state.firstPlayer.ready}
              handleChange={this.handleChange("firstPlayer")}
              handleInputChange={this.handleInputChange("firstPlayerScore")}
              readyBtnClick={this.readyBtnClick("firstPlayer")}
            />

            <Player
              name={this.state.secondPlayer.name}
              sharedObjects={this.state.sharedObjects}
              player="second"
              ready={this.state.secondPlayer.ready}
              handleChange={this.handleChange("secondPlayer")}
              handleInputChange={this.handleInputChange("secondPlayerScore")}
              readyBtnClick={this.readyBtnClick("secondPlayer")}
            />
            <div className="result-list">
              <h3>Результаты спора</h3>
              <div className="component-wrapper">
                <ResultList
                  sharedObjects={this.state.sharedObjects}
                  renderResult={this.state.renderResult}
                  firstPLayerName={this.state.firstPlayer.name}
                  secondPLayerName={this.state.secondPlayer.name}
                  handleReset={this.handleReset}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
