import { useContext, useEffect } from "react";
import {
  csvContext,
  mapDataContext,
  searchResultContext,
} from "../../providers/CsvProvider";
import GoogleMapReact from "./GoogleMapReact";
import { db } from "../../service/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Container, SimpleGrid } from "@chakra-ui/react";
import PatientSearchModal from "../Modal/PatientSearchModal";
import ColorChoiceModal from "../Modal/ColorChoiceModal";
import RouteChangeModal from "../Modal/RouteChangeModal";
import UpDateRegisterMap from "../Button/UpDateRegisterMap";

export default function RegisterMapView() {
  const { id } = useParams();
  const { csvDispatch } = useContext(csvContext);
  const { mapData, mapDispatch } = useContext(mapDataContext);
  const { searchResultDispatch } = useContext(searchResultContext);

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
  const GetMarkerData = () => {
    let refStr = String(`CreateMapDatas/${id}/IconDatas`);
    const ref = collection(db, refStr);
    const querySnapshot = getDocs(ref);

    querySnapshot
      .then((resDocuments) => {
        let IconDatas = [];
        resDocuments.forEach((doc) => {
          IconDatas.push(doc.data());
        });

        mapDispatch({ type: "mapDataInitSet", value: IconDatas });

        return IconDatas;
      })
      .then((IconDatas) => {
        let idlist = [];
        IconDatas.forEach((icon) => {
          icon["patients"].forEach((patient) => {
            idlist.push(patient["患者ID"]);
          });
        });

        searchResultDispatch({ type: "SeachResultSet", value: idlist });
      });
  };

  useEffect(() => {
    GetMasterData();
    GetMarkerData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {mapData.length ? (
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
            <UpDateRegisterMap></UpDateRegisterMap>
            <RouteChangeModal />
          </SimpleGrid>
          <GoogleMapReact></GoogleMapReact>
        </Container>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}
