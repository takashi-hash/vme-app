import React, { useContext } from "react";
import { EmptyCheck } from "../../jsonutill/JsonUtilFunction";
import {
  csvContext,
  mapDataContext,
  searchResultContext,
} from "../../providers/CsvProvider";
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import PatientCard from "../Card/PatientCard";

export default function CsvPreview(props) {
  const { csvData } = useContext(csvContext);
  const { mapData, mapDispatch } = useContext(mapDataContext);
  const { searchResultData } = useContext(searchResultContext);
  let DirectionsList = props.DirectionsList;
  let setDirectionsList = props.setDirectionsList;

  const AddRoutCount = (id) => {
    let pushFlg = true;
    let newDirectionsList = DirectionsList.slice();

    newDirectionsList.forEach((patientId, index) => {
      // 押下した患者カードのIDと一致する場合は経路リストから削除する
      if (patientId === id) {
        // numbers.splice(削除する要素のインデックス, 削除する要素の数)
        newDirectionsList.splice(index, 1);
        // 配列に追加しない
        pushFlg = false;
      }
    });

    // 患者の経路順を計算後、nullであれば、更新フラグをfalseにする
    let pushed = searchRouteIndex(id);
    if (pushed) {
      pushFlg = false;
    }

    // 経路を追加する
    if (pushFlg) {
      newDirectionsList.push(id);
    }
    // stateを更新
    setDirectionsList(newDirectionsList);
    mapDispatch({ type: "AddDirection", value: newDirectionsList });
  };

  // 患者ごとの経路順を求める
  function searchRouteIndex(r_id) {
    let matchIndex = null;
    mapData.forEach((icon) => {
      icon["patients"].forEach((patient) => {
        if (r_id === patient["患者ID"]) {
          matchIndex = icon["routeIndex"];
        }
      });
    });
    return matchIndex;
  }

  const ViewPatientCardArea = (data) => {
    let list = [];
    data.forEach((item) => {
      let matchIndex = searchRouteIndex(item.患者ID);
      searchResultData.forEach((resultId) => {
        if (item.患者ID === resultId) {
          list.push(
            <PatientCard
              key={item.患者ID}
              id={item.患者ID}
              patientName={item.患者名}
              doctorName={item.主治医}
              week={item.week}
              weekday={item.weekday}
              adress={item.住所}
              countSet={AddRoutCount}
              matchIndex={matchIndex}
            ></PatientCard>
          );
        }
      });
    });

    return list;
  };

  return (
    <div>
      {EmptyCheck(csvData) ? (
        ViewPatientCardArea(csvData)
      ) : (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>検索結果が0件です</AlertTitle>
        </Alert>
      )}
    </div>
  );
}
