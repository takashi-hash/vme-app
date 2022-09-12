const jismesh = require("jismesh-js");
// 描画用のプロパティを追加する
export function AddElement(array) {
  array.forEach((item) => {
    // アイコンの初期カラー
    item["iconColor"] = "緑";
    // 初期経路の順番
    item["routeIndex"] = null;
  });
}
export function AddTokuninashi(array) {
  array.forEach((item) => {
    if (item["訪問希望・不可日時"] === 0) {
      // アイコンの初期カラー
      item["訪問希望・不可日時"] = "指定なし";
    }
  });
}
// マップ描画に不要なプロパティを削除する
export function DeleteElement(array, elementArray) {
  array.forEach((item) => {
    elementArray.forEach((elementName) => {
      delete item[elementName];
    });
  });
}
// プロパティが一致するJsonデータをフィルタする
export function FilterID(array, elementName) {
  return array.filter(
    (element, index, self) =>
      self.findIndex((e) => e[elementName] === element[elementName]) === index
  );
}

// 患者IDが一致するWeekを追加する
export function WeekDaySet(mapList, refList) {
  mapList.forEach((mapData) => {
    mapData["week"] = [];

    refList.forEach((patientData) => {
      if (mapData["患者ID"] === patientData["患者ID"]) {
        let week = patientData["week"];
        mapData["week"].push(week);
      }
    });
  });
}
// CSV読み込み時の初期表示用地図データを作成する
export function MakeInitMapData(mapList, refList) {
  // その地点の患者データを設定する
  mapList.forEach((mapData, index) => {
    if (mapData.latitude === 0) {
      mapData["ID"] = "latitude_0";
    } else if (mapData.longitude === 0) {
      mapData["ID"] = "latitude_1";
    } else {
      mapData["ID"] = jismesh.toMeshCode(
        mapData.latitude,
        mapData.longitude,
        6
      );

      mapData["ID"] = mapData["ID"].concat(String(index));
    }

    mapData["patients"] = [];
    // 患者IDの一覧から緯度経度が一致する場合、患者IDと患者名をマーカー情報にセットする
    refList.forEach((patientData) => {
      if (
        mapData.latitude === patientData.latitude &&
        mapData.longitude === patientData.longitude
      ) {
        let insetData = {};
        insetData["患者ID"] = patientData["患者ID"];
        insetData["患者名"] = patientData["患者名"];
        insetData["主治医"] = patientData["主治医"];
        insetData["week"] = patientData["week"];
        insetData["weekday"] = patientData["weekday"];
        insetData["診療ステータス"] = patientData["診療ステータス"];
        insetData["年齢"] = patientData["年齢"];
        insetData["性別"] = patientData["性別"];
        insetData["薬局"] = patientData["薬局"];
        insetData["住所"] = patientData["住所"];
        insetData["訪問先住所"] = patientData["訪問先住所"];
        insetData["訪問希望・不可日時"] = patientData["訪問希望・不可日時"];
        mapData.patients.push(insetData);
      }
    });
  });
}

// オブジェクトが空か判定する
export function EmptyCheck(obj) {
  return Object.keys(obj).length;
}

// Jsonデータの深いコピー
export function DeepCopyJson(json) {
  //返却用の配列
  let returnArray = [];
  //オブジェクトを新しく作成
  json.forEach((item) => {
    let copyObj = Object.assign({}, item);
    //配列に追加
    returnArray.push(copyObj);
  });
  //返却
  return returnArray;
}
