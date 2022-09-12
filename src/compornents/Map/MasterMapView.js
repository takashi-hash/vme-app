import { useContext, useEffect } from "react";
import {
  csvContext,
  mapDataContext,
  searchResultContext,
} from "../../providers/CsvProvider";
import GoogleMapReact from "./GoogleMapReact";
import { db } from "../../service/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Container, SimpleGrid } from "@chakra-ui/react";
import PatientSearchModal from "../Modal/PatientSearchModal";
import ColorChoiceModal from "../Modal/ColorChoiceModal";
import RegisterMapModal from "../Modal/RegisterMapModal";
import RouteChangeModal from "../Modal/RouteChangeModal";

export default function MasterMapView() {
  const { mapDispatch } = useContext(mapDataContext);
  const { csvDispatch } = useContext(csvContext);
  const { searchResultDispatch } = useContext(searchResultContext);

  const GetMarkerData = async () => {
    const ref = collection(db, "/MapListdata/Mapdata/IconDatas");
    const querySnapshot = await getDocs(ref);
    let IconDatas = [];
    querySnapshot.forEach((doc) => {
      IconDatas.push(doc.data());
    });
    mapDispatch({ type: "mapDataInitSet", value: IconDatas });
  };
  const GetMasterData = async () => {
    const ref = collection(db, "MapListdata");
    const querySnapshot = await getDocs(ref);
    let Datas = [];
    let idlist = [];
    querySnapshot.forEach((doc) => {
      Datas.push(doc.data());
      if (doc.data().患者ID !== undefined) {
        idlist.push(doc.data().患者ID);
      }
    });
    searchResultDispatch({ type: "SeachResultSet", value: idlist });
    csvDispatch({ type: "CsvDataInitSet", value: Datas });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const InitMarkerDisplaly = async () => {
    GetMarkerData();
    GetMasterData();
  };
  useEffect(
    InitMarkerDisplaly,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Container maxW="100%">
      <SimpleGrid
        columns={{
          base: 2,
          md: 4,
        }}
        height={"7vh"}
        my={1}
        spacing={1}
      >
        <PatientSearchModal />
        <ColorChoiceModal />
        <RegisterMapModal />
        <RouteChangeModal />
      </SimpleGrid>
      <GoogleMapReact></GoogleMapReact>
    </Container>
  );
}
