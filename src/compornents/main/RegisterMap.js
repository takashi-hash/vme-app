import { Button, Center, useToast } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { RegisterMapIconData } from "../../databaseutil/FireStoreMasterMapControl";
import { mapDataContext } from "../../providers/CsvProvider";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { AuthContext } from "../../providers/Auth.Provider";

export default function RegisterMap(props) {
  const [mapName, setMapName] = useState("");
  const toast = useToast();
  const { mapData } = useContext(mapDataContext);
  const { currentUser } = useContext(AuthContext);
  const registerUser = currentUser.reloadUserInfo.displayName;
  const onClose = props.closeFlunction;

  const changeName = (e) => {
    // stateに名前を登録
    if (e !== undefined) {
      const name = e.target.value;
      setMapName(name);
    }
  };
  const Register = () => {
    if (mapName === undefined) {
      return;
    } else {
      RegisterMapIconData("CreateMapDatas", mapData, mapName, registerUser);
    }
  };

  useEffect(() => {
    changeName();
  }, [mapName]);
  return (
    <>
      <Input
        placeholder="登録する地図の名前を入力"
        onChange={(e) => changeName(e)}
      />
      <Center>
        {mapName === "" ? (
          <Button colorScheme="teal" variant="solid" my={5} isDisabled={true}>
            保存
          </Button>
        ) : (
          <Button
            colorScheme="teal"
            variant="solid"
            my={5}
            onClick={() => {
              Register();
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
              onClose();
            }}
          >
            保存
          </Button>
        )}
      </Center>
    </>
  );
}
