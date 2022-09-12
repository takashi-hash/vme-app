import React, { useContext, useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  mapDataContext,
  searchResultContext,
} from "../../providers/CsvProvider";
import { EmptyCheck } from "../../jsonutill/JsonUtilFunction";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import { Box, Text, useDisclosure } from "@chakra-ui/react";
import PatientModal from "../Modal/PatientModal";

export default function PatientMerker() {
  const { id } = useParams();
  const { mapData } = useContext(mapDataContext);
  const { searchResultData } = useContext(searchResultContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState(undefined);
  const [selected, setSelected] = useState({});
  const [selectPatientId, setSelectPatientId] = useState(null);
  const [DirectionsList, setDirectionsList] = useState([]);

  const infoWindowOptions = {
    pixelOffset: size,
  };
  const createOffsetSize = () => {
    return setSize(new window.google.maps.Size(0, -45));
  };

  const onSelect = (item) => {
    setSelected(item);
  };
  // マーカを描画する関数
  const ViewMakersFunction = (datas) => {
    const viewIconList = [];
    datas.forEach((item, index) => {
      let isComp = false;
      item["patients"].forEach((patient) => {
        searchResultData.forEach((resultId) => {
          if (isComp !== true && patient["患者ID"] === resultId) {
            let paintColor = item["iconColor"];
            let image;
            switch (paintColor) {
              case "緑":
                image = "green.png";
                break;
              case "赤":
                image = "red.png";
                break;
              case "青":
                image = "blue.png";
                break;
              case "水色":
                image = "sky.png";
                break;
              case "黄色":
                image = "Yellow.png";
                break;
              case "オレンジ":
                image = "orange.png";
                break;
              case "白":
                image = "white.png";
                break;
              case "紫":
                image = "purple.png";
                break;
              default:
                image = "green.png";
                break;
            }
            // routeパス以外のアクセスだと画像ファイルの参照位置が変わる為、以下の処理を行う。
            if (id !== undefined) {
              image = "../".concat(image);
            }
            viewIconList.push(
              <Marker
                key={index}
                position={{
                  lat: parseFloat(item.latitude),
                  lng: parseFloat(item.longitude),
                }}
                zIndex={999}
                icon={{ url: image }}
                onClick={() => onSelect(item)}
              />
            );
            isComp = true;
          }
        });
      });
    });
    return viewIconList;
  };
  // infowindowを描画する関数
  const ViewInfowindowFunction = (selected) => {
    return (
      <>
        <InfoWindow
          onLoad={() => createOffsetSize()}
          position={{ lat: selected.latitude, lng: selected.longitude }}
          options={infoWindowOptions}
          clickable={true}
          onCloseClick={() => setSelected({})}
        >
          <>
            {selected.patients.map((patient) => {
              return (
                <Box
                  pb={1}
                  pl={1}
                  textAlign={"left"}
                  fontSize={["xs", "sm", "md", "lg", "xl"]}
                  key={patient["患者ID"]}
                  onClick={() => {
                    onOpen();
                    setSelectPatientId(patient["患者ID"]);
                  }}
                >
                  {patient["患者名"]}
                  <PlusSquareIcon />
                </Box>
              );
            })}
          </>
        </InfoWindow>
      </>
    );
  };

  return (
    <>
      {EmptyCheck(mapData) && ViewMakersFunction(mapData)}
      {EmptyCheck(selected) && ViewInfowindowFunction(selected)}
      <PatientModal
        open={isOpen}
        closeFlunction={onClose}
        patientId={selectPatientId}
        DirectionsList={DirectionsList}
        setDirectionsList={setDirectionsList}
      />
    </>
  );
}
