import { Box, Button, IconButton, Spacer, VStack } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { mapDataContext } from "../../providers/CsvProvider";
import { List, ListItem, Flex } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";

export default function RouteChange() {
  const { mapData, mapDispatch } = useContext(mapDataContext);
  const [directions, setDirections] = useState([]);

  const ViewRoute = () => {
    return (
      <>
        {directions.length === 0 ? (
          <p>経路が設定されていません。</p>
        ) : (
          <List w={"100%"} spacing={3}>
            {directions.map((route) => {
              return (
                <ListItem
                  fontSize={["sm", "md", "lg", "xl"]}
                  border={"1px"}
                  key={route.index}
                >
                  <Flex p={2}>
                    <Box
                      color="teal"
                      border={1}
                      borderColor="gray.200"
                      borderRadius="md"
                      mr={3}
                    >
                      {route.index + 1}番目
                    </Box>
                    <p style={{ whiteSpace: "pre-line" }}>
                      {route["patients"].reduce(
                        (previousValue, currentValue) => {
                          if (previousValue.hasOwnProperty("患者名")) {
                            return previousValue + "\n" + currentValue;
                          } else {
                            return previousValue + "\n" + currentValue;
                          }
                        }
                      )}
                    </p>
                    <Spacer />
                    {route.index === 0 ? (
                      <IconButton
                        colorScheme="teal"
                        variant="outline"
                        icon={<ChevronDownIcon />}
                        onClick={() => routeChange(route.index, 1)}
                      />
                    ) : route.index < directions.length - 1 ? (
                      <>
                        <IconButton
                          colorScheme="teal"
                          variant="outline"
                          icon={<ChevronUpIcon />}
                          onClick={() => routeChange(route.index, 0)}
                        />
                        <IconButton
                          colorScheme="teal"
                          variant="outline"
                          icon={<ChevronDownIcon />}
                          onClick={() => routeChange(route.index, 1)}
                        />
                      </>
                    ) : (
                      <>
                        <IconButton
                          colorScheme="teal"
                          variant="outline"
                          icon={<ChevronUpIcon />}
                          onClick={() => routeChange(route.index, 0)}
                        />
                      </>
                    )}
                  </Flex>
                </ListItem>
              );
            })}
          </List>
        )}
      </>
    );
  };

  useEffect(() => {
    let route = GetRouteList(mapData);
    route.sort(compare);
    setDirections(route);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Contextから経路リストを取得する関数
  const GetRouteList = (data) => {
    let routeList = [];
    data.forEach((icon) => {
      if (icon["routeIndex"] !== null) {
        let patients = icon["patients"].map((patient) => {
          return patient["患者名"];
        });
        routeList.push({
          id: icon["ID"],
          index: icon["routeIndex"],
          lat: parseFloat(icon.latitude),
          lng: parseFloat(icon.longitude),
          patients: patients,
        });
      }
    });
    return routeList;
  };

  // 経路のindex順で配列をソートする関数
  const compare = (a, b) => {
    var r = 0;
    if (a.index < b.index) {
      r = -1;
    } else if (a.index > b.index) {
      r = 1;
    }

    return r;
  };

  // 経路の変更↑↓ボタン押下時の関数
  const routeChange = (routeIndex, mode) => {
    // ↑が押された場合、mode は 0
    // ↓が押された場合、mode は 1
    let sample = [...directions];
    let tmp;
    if (mode === 0) {
      tmp = sample[routeIndex - 1].index;
      sample[routeIndex - 1].index = sample[routeIndex].index;
      sample[routeIndex].index = tmp;
    } else {
      tmp = sample[routeIndex + 1].index;
      sample[routeIndex + 1].index = sample[routeIndex].index;
      sample[routeIndex].index = tmp;
    }
    sample.sort(compare);

    setDirections(sample);
  };
  // 経路の変更↑↓ボタン押下時の関数
  const UpdateContext = () => {
    mapDispatch({ type: "ChangeDirection", value: directions });
  };

  return (
    <VStack>
      {ViewRoute()}
      {directions.length === 0 ? (
        <Button colorScheme="teal" variant="solid" my={5} disabled={true}>
          変更
        </Button>
      ) : (
        <Button
          colorScheme="teal"
          variant="solid"
          my={5}
          onClick={() => UpdateContext()}
        >
          変更
        </Button>
      )}
    </VStack>
  );
}
