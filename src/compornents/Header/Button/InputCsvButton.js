import React, { useContext } from "react";
import ReactFileReader from "react-file-reader";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  AddElement,
  AddTokuninashi,
  DeepCopyJson,
  DeleteElement,
  FilterID,
  MakeInitMapData,
  WeekDaySet,
} from "../../../jsonutill/JsonUtilFunction";
import { csvContext, mapDataContext } from "../../../providers/CsvProvider";
import {
  UpdateMasterCSVData,
  UpdateMasterHistory,
  UpdateMasterMapIconData,
} from "../../../databaseutil/FireStoreMasterMapControl";

export default function CvsInput(props) {
  const { mapDispatch } = useContext(mapDataContext);
  const { csvData, csvDispatch } = useContext(csvContext);
  const toast = useToast();
  const { registerUser } = props;

  // ReactFileReader のファイル選択完了イベントで発火する
  const handleFiles = (files) => {
    var reader = new FileReader();
    reader.onload = (e) => {
      const Encoding = require("encoding-japanese");
      // SJISをUNICODEにエンコード
      const text = Encoding.convert(reader.result, {
        from: "SJIS",
        to: "UNICODE",
        type: "string",
      });
      // CSVをJSON形式に変換する
      var CSV = require("comma-separated-values");
      var original = new CSV(text, { header: true }).parse();

      let listdata = DeepCopyJson(original);
      //ID重複排除
      listdata = FilterID(listdata, "患者ID");
      //weekを配列化する
      DeleteElement(listdata, ["week"]);
      WeekDaySet(listdata, original);
      // 一覧表示様のデータ属性を追加
      AddElement(listdata);
      // 訪問希望・不可日時に設定が無い場合、「指定なし」とする
      AddTokuninashi(listdata);
      csvDispatch({ type: "CsvDataInitSet", value: listdata });

      var mapData = DeepCopyJson(listdata);
      // Map表示に余分な情報は削除する
      DeleteElement(mapData, [
        "患者ID",
        "患者名",
        "week",
        "weekday",
        "主治医",
        "住所",
        "年齢",
        "性別",
        "患者名カナ",
        "薬局",
        "訪問先住所",
        "訪問希望・不可日時",
        "診療ステータス",
      ]);
      // 緯度経度が一意な一覧を作成する
      let mapList = FilterID(mapData, "latitude");
      mapList = FilterID(mapList, "longitude");
      MakeInitMapData(mapList, listdata);

      // 緯度経度一覧に患者情報・初期アイコン色・初期経路順の情報をセットする
      mapDispatch({ type: "mapDataInitSet", value: mapList });
      UpdateMasterHistory(registerUser);
      UpdateMasterMapIconData("MapListdata", mapList, registerUser);
      UpdateMasterCSVData("MapListdata", listdata);
    };
    //onLoadでバイナリデータとしてファイルを読み込む
    reader.readAsBinaryString(files[0]);
    
    // 登録完了メッセージを表示する
    toast({
      position: "bottom",
      status: "success",
      isClosable: true,
      render: () => (
        <Alert status="success">
          <AlertIcon />
          登録が完了しました
        </Alert>
      ),
    });
  };

  return (
    <VStack>
      <p>CSVデータをDBに登録します</p>
      <ReactFileReader fileTypes={[".csv"]} handleFiles={handleFiles}>
        {csvData.length ? (
          <VStack>
            <Button
              isDisabled={true}
              fontSize={["sm", "md", "lg", "xl"]}
              colorScheme="teal"
              variant="outline"
            >
              CSVをインプット
            </Button>
            <Alert
              status="warning"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
            >
              <AlertIcon />
              <AlertTitle fontSize={["xs", "sm", "md", "lg", "xl"]}>
                地図データは登録済みです。
              </AlertTitle>
              <AlertDescription fontSize={["xs", "sm", "md", "lg", "xl"]}>
                更新は削除を行ってから実施してください。
              </AlertDescription>
            </Alert>
          </VStack>
        ) : (
          <Button
            fontSize={["xs", "sm", "md", "lg", "xl"]}
            colorScheme="teal"
            variant="outline"
          >
            CSVをインプット
          </Button>
        )}
      </ReactFileReader>
    </VStack>
  );
}
