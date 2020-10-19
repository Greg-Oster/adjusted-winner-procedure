import React from "react";
import ResultScore from "./ResultScore";
import Remake from "./Remake";

export default function ResultList(props) {
  if (props.renderResult) {
    const result = getResult(props.sharedObjects);
    const firstPlayerResult = result.firstPlayer;
    const secondPlayerResult = result.secondPlayer;

    return (
      <>
        <div>
          <PlayerResultList
            result={firstPlayerResult}
            name={props.firstPLayerName}
          />
          <PlayerResultList
            result={secondPlayerResult}
            name={props.secondPLayerName}
          />
        </div>
        <ResultScore result={result.points} />
        <Remake handleReset={props.handleReset} />
      </>
    );
  } else {
    return (
      <>
        <p>
          Участники должны распределить свои баллы в соответствии со своими
          предпочтениями и нажать "Готово"
        </p>
      </>
    );
  }
}

function PlayerResultList(props) {
  const result = props.result.map((item, key) => (
    <PlayerResultObject name={item.name} part={item.sharedPart} />
  ));
  return (
    <div class="player-result">
      <div class="player-result_header">
        <h4>{props.name}</h4>
      </div>

      <ul class="player-result__body">{result}</ul>
    </div>
  );
}

function PlayerResultObject(props) {
  let part =
    props.part === 0 ? "(0%)" : props.part > 0 ? "(" + props.part + "%)" : "";

  return (
    <li class="player-result__object">
      {props.name}
      {part}
    </li>
  );
}

function getResult(array) {
  // 1. Определяем первоначального победителя
  //{id: 1, name: "Первый объект", firstPlayerScore: 80, secondPlayerScore: 20, isDevidable: false}
  let initialWinner = 0;
  let tempFirst = [];
  let tempSecond = [];
  let winnerArray = [];
  let looserArray = [];
  let result = {
    firstPlayer: [],
    secondPlayer: [],
  };
  let firstWholeValue = 0;
  let secondWholeValue = 0;

  array.forEach((element) => {
    const firstPlayerScore = element.firstPlayerScore;
    const secondPlayerScore = element.secondPlayerScore;

    if (firstPlayerScore > secondPlayerScore) {
      tempFirst.push({
        id: element.id,
        value: firstPlayerScore,
        name: element.name,
      });
      firstWholeValue += firstPlayerScore;
    } else {
      tempSecond.push({
        id: element.id,
        value: secondPlayerScore,
        name: element.name,
      });
      secondWholeValue += secondPlayerScore;
    }

    if (firstWholeValue > secondWholeValue) {
      initialWinner = 0;
      winnerArray.data = tempFirst;
      winnerArray.points = firstWholeValue;
      winnerArray.player = "first";

      looserArray.data = tempSecond;
      looserArray.points = secondWholeValue;
    } else if (firstWholeValue < secondWholeValue) {
      initialWinner = 1;
      winnerArray.data = tempSecond;
      winnerArray.points = secondWholeValue;
      winnerArray.player = "second";

      looserArray.data = tempFirst;
      looserArray.points = firstWholeValue;
    } else {
      initialWinner = -1;
    }
  });

  // Если вышло равенство баллов - сразу вернем результат
  if (initialWinner === -1) {
    tempFirst.forEach((element) => {
      result.firstPlayer.push({
        id: element.id,
        name: element.name,
        part: 100,
      });
    });

    tempSecond.forEach((element) => {
      result.secondPlayer.push({
        id: element.id,
        name: element.name,
        part: 100,
      });
    });

    return result;
  }

  // 2. Определим соотношение баллов для объектов победителя
  // {id: 1,
  // name: "Первый объект",
  // firstPlayerScore: 20,
  // secondPlayerScore: 50,
  // isDevidable: false}

  //{id: 1, value: 22, name: "Зарплата"} === winner array
  winnerArray.data.forEach((winnerObject) => {
    array.forEach((initialArrayObject) => {
      if (winnerObject.id === initialArrayObject.id) {
        winnerObject.ratio =
          winnerObject.value > initialArrayObject.firstPlayerScore
            ? winnerObject.value / initialArrayObject.firstPlayerScore
            : winnerObject.value / initialArrayObject.firstPlayerScore;
      }
    });
  });

  // 3. Начнем передавать объекты от победителя к проигравшему, начиная с объекта с меньшим   соотношением баллов, совершая перерасчет баллов на каждой итерации. Если при передаче объекта стороны (победитель/проигравший) поменялись - передачу не производим, а объект назначаем делимым
  for (let i = 0; i < winnerArray.data.length; i++) {
    // Получим индекс минимального значения
    let lowestItemId = 0;
    for (let i = 1; i < winnerArray.data.length; i++) {
      if (winnerArray.data[i].ratio < winnerArray.data[lowestItemId].ratio)
        lowestItemId = i;
    }
    // Найдем профит лузера от передаваемого объекта
    let looserProfit = 0;
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      const sharedElementId = winnerArray.data[lowestItemId].id;
      if (element.id === sharedElementId) {
        element.firstPlayerScore < winnerArray.data[lowestItemId].value
          ? (looserProfit = element.firstPlayerScore)
          : (looserProfit = element.secondPlayerScore);
      }
    }
    // Проверим, не приведет ли передача данного объекта к изменению баланса
    if (
      winnerArray.points - winnerArray.data[lowestItemId].value >
      looserArray.points + looserProfit
    ) {
      winnerArray.points -= winnerArray.data[lowestItemId].value;
      looserArray.data.push(winnerArray.data[lowestItemId]);
      looserArray.points += looserProfit;
      winnerArray.data.splice(lowestItemId, 1);
    } else {
      // Разделим этот объект между двумя участниками
      // узнаем, какую часть объекта победитель отдаст проигравшему
      let denominator = 0;

      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        const sharedElementId = winnerArray.data[lowestItemId].id;
        if (element.id === sharedElementId) {
          denominator = element.firstPlayerScore + element.secondPlayerScore;
        }
      }
      const numerator = winnerArray.points - looserArray.points;
      const looserPart = parseFloat(
        ((numerator / denominator) * 100).toFixed(2)
      );
      const winnerPart = 100 - looserPart;
      // Передадим часть объекта лузеру и изменим остаток у винера

      winnerArray.data[lowestItemId].sharedPart = winnerPart;
      let clone = Object.assign({}, winnerArray.data[lowestItemId]);
      clone.sharedPart = looserPart;
      looserArray.data.push(clone);

      // Пересчитаем баллы у участников спора, они должны быть равны
      winnerArray.points -=
        (looserPart / 100) * winnerArray.data[lowestItemId].value;
      looserArray.points +=
        (looserPart / 100) *
        (denominator - winnerArray.data[lowestItemId].value);

      return {
        firstPlayer: tempFirst,
        secondPlayer: tempSecond,
        points: winnerArray.points.toFixed(2),
      };
    }
  }
}
