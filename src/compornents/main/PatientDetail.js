import {
  Box,
  Button,
  Center,
  Divider,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { csvContext, mapDataContext } from "../../providers/CsvProvider";

export default function PatientDetail(props) {
  const { id } = useParams();
  const { csvData } = useContext(csvContext);
  const { mapData, mapDispatch } = useContext(mapDataContext);
  const onClose = props.closeFlunction;
  let DirectionsList = props.DirectionsList;
  let setDirectionsList = props.setDirectionsList;
  const pid = props.id;
  let resultPatient;
  if (id === undefined) {
    resultPatient = csvData.find((patient) => patient["患者ID"] === pid);
  } else {
    for (var i = 0; i < mapData.length; i++) {
      for (var j = 0; j < mapData[i]["patients"].length; j++) {
        if (mapData[i]["patients"][j].患者ID === pid) {
          resultPatient = mapData[i]["patients"][j];
          break;
        }
      }
    }
  }

  const setDirection = (key) => {
    AddRoutCount(key);
  };

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

  return (
    <Box fontSize={["sm", "md", "lg", "xl"]}>
      <Heading as="h1">
        <Text fontWeight="bold">{resultPatient.患者名}</Text>
      </Heading>
      <Divider my={4} />
      <Grid templateColumns="repeat(2, 1fr)" gap={2} fontSize={["xs", "sm", "md", "lg", "xl"]}>
        <GridItem>
          <Heading as="h2" size="sm">
            診療ステータス
          </Heading>
        </GridItem>
        <GridItem>{resultPatient.診療ステータス}</GridItem>
        <GridItem>
          <Heading as="h2" size="sm">
            患者ID
          </Heading>
        </GridItem>
        <GridItem>{resultPatient.患者ID}</GridItem>
        <GridItem>
          <Heading as="h2" size="sm">
            主治医
          </Heading>
        </GridItem>
        <GridItem>{resultPatient.主治医}</GridItem>
        <GridItem>
          <Heading as="h2" size="sm">
            年齢
          </Heading>
        </GridItem>
        <GridItem>{resultPatient.年齢}</GridItem>
        <GridItem>
          <Heading as="h2" size="sm">
            性別
          </Heading>
        </GridItem>
        <GridItem>{resultPatient.性別}</GridItem>
        <GridItem>
          <Heading as="h2" size="sm">
            薬局
          </Heading>
        </GridItem>
        <GridItem>{resultPatient.薬局}</GridItem>
        <GridItem>
          <Heading as="h2" size="sm">
            住所
          </Heading>
        </GridItem>
        <GridItem>{resultPatient.住所}</GridItem>
        <GridItem>
          <Heading as="h2" size="sm">
            訪問先住所
          </Heading>
        </GridItem>
        <GridItem>{resultPatient.訪問先住所}</GridItem>
        <GridItem>
          <Heading as="h2" size="sm">
            訪問希望・不可日時
          </Heading>
        </GridItem>
        <GridItem>{resultPatient["訪問希望・不可日時"]}</GridItem>
      </Grid>
      <Center>
        <Button
          colorScheme="teal"
          variant="solid"
          mt={6}
          onClick={() => {
            setDirection(pid);
            onClose();
          }}
        >
          {searchRouteIndex(pid) === null ? "経路を追加" : "経路を削除"}
        </Button>
      </Center>
    </Box>
  );
}
