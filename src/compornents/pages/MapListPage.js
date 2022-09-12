import { db } from "../../service/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import {
  Box,
  Button,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { deleteCollection } from "../../databaseutil/FireStoreMasterMapControl";

export const MapListPage = () => {
  const [mapList, setMapList] = useState([]);
  const toast = useToast();
  const DeleteRegisterMap = (id) => {
    deleteCollection(`/CreateMapDatas/${id}/IconDatas`, 500);
    const deleteMap = async () => {
      await deleteDoc(doc(db, "/CreateMapDatas", id));
    };
    deleteMap()
      .then(() => {
        fetchData();
      });
  };

  const RegisterMapView = () => {
    const data = [];
    mapList.forEach((mapData, index) => {
      let outputDay = DateFormat(mapData.data.timestamp.toDate());
      data.push(
        <Box
          key={index}
          p={5}
          w={"80%"}
          maxW="xl"
          borderWidth="1px"
          borderRadius="lg"
          borderColor="gray.200"
        >
          <VStack>
            <Text fontSize="1.5rem">{mapData.data.mapName}</Text>
            <Box pb={5}>
              <Text fontSize="0.8rem">登録日：{outputDay}</Text>
              <Text fontSize="0.8rem">登録者：{mapData.data.registerUser}</Text>
            </Box>
          </VStack>
          <SimpleGrid columns={2} spacing={2}>
            <Link to={"/maps/" + mapData.id}>
              <Button colorScheme="teal" w={"100%"}>
                表示
              </Button>
            </Link>
            <Button
              onClick={() => {
                DeleteRegisterMap(mapData.id);
                toast({
                  position: "bottom",
                  status: "success",
                  isClosable: true,
                  render: () => (
                    <Alert status="success">
                      <AlertIcon />
                      削除が完了しました
                    </Alert>
                  ),
                  
                });
              }}
              colorScheme="teal"
            >
              削除
            </Button>
          </SimpleGrid>
        </Box>
      );
    });

    return data;
  };

  const DateFormat = (date) => {
    const yyyy = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    return yyyy + "/" + month + "/" + day + " " + hours + ":" + minutes;
  };

  async function fetchData() {
    const usersCollectionRef = collection(db, "CreateMapDatas");
    const q = query(usersCollectionRef, orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    let newList = [];
    querySnapshot.docs.forEach((doc) => {
      newList.push({ data: doc.data(), id: doc.id });
    });
    setMapList(newList);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <VStack>
      <Text m={5} fontSize={"1.5rem"} color="teal" fontWeight={"bold"}>
        登録地図一覧
      </Text>
      {RegisterMapView()}
    </VStack>
  );
};
