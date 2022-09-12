import { Box, Button, Center, Flex, useToast } from "@chakra-ui/react";
import React, { useContext, useRef } from "react";
import {
  csvContext,
  mapDataContext,
  searchResultContext,
} from "../../providers/CsvProvider";
import PullDownList from "./PullDownList";
import { GetMasterMapData2 } from "../../databaseutil/FireStoreMasterMapControl";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export default function PullDownArea() {
  const { id } = useParams();
  const { csvData } = useContext(csvContext);
  const { mapData, mapDispatch } = useContext(mapDataContext);
  const { searchResultDispatch } = useContext(searchResultContext);
  const toast = useToast();
  const firstChoice = "条件なし";
  let selectDoctor = useRef(firstChoice);
  let selectWeekday = useRef(firstChoice);
  let selectWeek = useRef(firstChoice);
  /* 主治医プルダウン */
  let doctorList = new Set();
  /* 訪問曜日プルダウン */
  let weekdayList = new Set();
  /* 訪問予定週プルダウン */
  let weekList = new Set();
  /* プルダウンの作成 */
  if (id === undefined) {
    csvData.forEach((item, index) => {
      item["主治医"] && doctorList.add(item["主治医"]);
      item["weekday"] && weekdayList.add(item["weekday"]);
      if (item["week"] && item["week"].length !== 0) {
        item["week"].forEach((weekItem) => {
          weekList.add(weekItem);
        });
      }
    });
  } else {
    mapData.forEach((iconData) => {
      iconData["patients"].forEach((patient) => {
        patient["主治医"] && doctorList.add(patient["主治医"]);
        patient["weekday"] && weekdayList.add(patient["weekday"]);
        if (patient["week"] && patient["week"].length !== 0) {
          patient["week"].forEach((weekItem) => {
            weekList.add(weekItem);
          });
        }
      });
    });
  }

  const SerchConditions = () => {
    let result = GetMasterMapData2(
      selectDoctor.current.value,
      selectWeekday.current.value,
      selectWeek.current.value
    );
    result.then((list) => {
      if (list.length === 0) {
        toast({
          position: "bottom",
          status: "success",
          isClosable: true,
          render: () => (
            <Alert status="error">
              <AlertIcon />
              検索結果が0件です
            </Alert>
          ),
        });
        return;
      }
      toast({
        position: "bottom",
        status: "success",
        isClosable: true,
        render: () => (
          <Alert status="info">
            <AlertIcon />
            検索結果は{list.length}件です
          </Alert>
        ),
      });
      searchResultDispatch({ type: "SeachResultSet", value: list });
      mapDispatch({ type: "MapVisibleSet", value: list });
    });
  };

  return (
    <div>
      <Flex maxWidth="80%">
        <Box flex="1">
          <PullDownList
            propRef={selectDoctor}
            List={doctorList}
            label={"主治医"}
            firstChoice={firstChoice}
          ></PullDownList>
          <PullDownList
            propRef={selectWeekday}
            List={weekdayList}
            label={"訪問曜日"}
            firstChoice={firstChoice}
          ></PullDownList>
          <PullDownList
            propRef={selectWeek}
            List={weekList}
            label={"訪問予定週"}
            firstChoice={firstChoice}
          ></PullDownList>
        </Box>
      </Flex>
      <Center>
        <Button
          colorScheme="teal"
          variant="solid"
          my={5}
          onClick={() => {
            SerchConditions();
          }}
        >
          検索
        </Button>
      </Center>
    </div>
  );
}
