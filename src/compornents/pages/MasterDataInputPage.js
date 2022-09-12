import { Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import DeleteMasterButton from "../Header/Button/DeleteMasterButton";
import CvsInput from "../Header/Button/InputCsvButton";
import { AuthContext } from "../../providers/Auth.Provider";
import { collection, getDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../service/firebase";
import { csvContext } from "../../providers/CsvProvider";

export const MasterDataInputPage = () => {
  const [lastRegisterUser, SetLastRegisterUser] = useState("");
  const [lastRegisterDate, SetLastRegisterDate] = useState("");
  const { currentUser } = useContext(AuthContext);
  const registerUser = currentUser.reloadUserInfo.displayName;
  const { csvDispatch } = useContext(csvContext);

  const DateFormat = (date) => {
    const yyyy = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    return yyyy + "/" + month + "/" + day + " " + hours + ":" + minutes;
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
    csvDispatch({ type: "CsvDataInitSet", value: Datas });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUpdateInfo = async () => {
    const resultDoc = await getDoc(
      doc(collection(db, "MasterUpdateHistory"), "data")
    );
    if (resultDoc) {
      // 保留中(serverTimeStamp が null)の時は見積もり時刻を返してくれる。
      const { registerUser, timestamp } = resultDoc.data({
        serverTimestamps: "estimate",
      });

      SetLastRegisterUser(registerUser);
      SetLastRegisterDate(DateFormat(timestamp.toDate()));
    }
  };

  useEffect(() => {
    getUpdateInfo();
    GetMasterData();
  }, []);

  return (
    <VStack m={10} spacing={10}>
      <CvsInput registerUser={registerUser} />
      <DeleteMasterButton registerUser={registerUser} />
      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        <GridItem>
          <Heading as="h2" size="sm">
            最終更新者
          </Heading>
        </GridItem>
        <GridItem>{lastRegisterUser}</GridItem>
        <GridItem>
          <Heading as="h2" size="sm">
            最終更新日時
          </Heading>
        </GridItem>
        <GridItem>{lastRegisterDate}</GridItem>
      </Grid>
    </VStack>
  );
};
