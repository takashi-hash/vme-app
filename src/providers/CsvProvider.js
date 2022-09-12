import React, { createContext, useReducer } from "react";

// Map描画に使うContextの作成
export const mapDataContext = createContext({});
// CSV一覧描画に使うContextの作成
export const csvContext = createContext({});
// 検索結果で使用するContextの作成
export const searchResultContext = createContext({});

//Map描画に使うreducer関数
//第一引数のstateは現在の状態が入っている。
const MapreducerFunc = (state, action) => {
  let newState;
  let DirectionsList;
  switch (action.type) {
    case "mapDataInitSet":
      return action.value;
    case "ColorChange":
      // 検索結果のアイコンリストと選択した色の種類を受け取る
      let { list, choiceColor } = action.value;
      // 現在のアイコン一覧の色から患者IDが一致したものについて色を変更する
      newState = [...state];
      list.forEach((resultId) => {
        newState.forEach((mapIcon, index) => {
          mapIcon["patients"].forEach((patient) => {
            if (patient["患者ID"] === resultId) {
              newState[index]["iconColor"] = choiceColor;
            }
          });
        });
      });
      return newState;
    case "AddDirection":
      DirectionsList = action.value;
      // state更新の為、配列のコピー
      newState = state.slice();
      // アイコンの患者リストを参照し、受け取ったIDと一致するものについて、プロパティを更新する
      newState.forEach((mapIcon, index) => {
        // 一度すべてnullにする
        newState[index].routeIndex = null;
        // 更新処理
        mapIcon["patients"].forEach((patient) => {
          DirectionsList.forEach((directionId, dIndex) => {
            if (patient.患者ID === directionId) {
              newState[index].routeIndex = dIndex;
            }
          });
        });
      });
      return newState;
    case "ChangeDirection":
      DirectionsList = action.value;
      newState = state.slice();

      newState.forEach((mapIcon) => {
        mapIcon["routeIndex"] = null;
        DirectionsList.forEach((direction) => {
          if (mapIcon["ID"] === direction["id"]) {
            mapIcon.routeIndex = direction["index"];
          }
        });
      });
      return newState;
    default:
      return state;
  }
};
// 検索結果で一致する患者IDのglobalなデータリストを格納する
const SearchreducerFunc = (state, action) => {
  switch (action.type) {
    case "SeachResultSet":
      return action.value;
    default:
      return state;
  }
};

const CsvreducerFunc = (state, action) => {
  switch (action.type) {
    case "CsvDataInitSet":
      return action.value;
    case "CsvClear":
      const emplist = [];
      return emplist;
    default:
      return state;
  }
};

export default function CsvProvider({ children }) {
  //reducer 初期状態は空のオブジェクト配列
  //[管理するstate, stateを管理する関数] = useReducer(stateを管理する関数, 初期状態);
  //マップに描画するピンの情報
  const [mapData, mapDispatch] = useReducer(MapreducerFunc, []);
  const mapDataProps = { mapData, mapDispatch };

  // 検索結果の情報
  const [searchResultData, searchResultDispatch] = useReducer(
    SearchreducerFunc,
    []
  );
  const searchResultProps = { searchResultData, searchResultDispatch };

  //CSV一覧の情報
  const [csvData, csvDispatch] = useReducer(CsvreducerFunc, []);
  const csvdataProps = { csvData, csvDispatch };

  return (
    <mapDataContext.Provider value={mapDataProps}>
      <searchResultContext.Provider value={searchResultProps}>
        <csvContext.Provider value={csvdataProps}>
          {children}
        </csvContext.Provider>
      </searchResultContext.Provider>
    </mapDataContext.Provider>
  );
}
