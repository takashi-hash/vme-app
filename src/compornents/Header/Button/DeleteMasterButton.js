import React, { useContext } from "react";
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
  deleteCollection,
  UpdateMasterHistory,
} from "../../../databaseutil/FireStoreMasterMapControl";
import { csvContext } from "../../../providers/CsvProvider";

export default function DeleteMasterButton(props) {
  const { registerUser } = props;
  const { csvData, csvDispatch } = useContext(csvContext);
  const toast = useToast();

  const DeleteMasterDatas = () => {
    UpdateMasterHistory(registerUser);
    deleteCollection("MapListdata/Mapdata/IconDatas", 500);
    deleteCollection("MapListdata", 500);
    csvDispatch({ type: "CsvClear" });
    // 削除完了メッセージを表示する
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
  };

  return (
    <VStack>
      <p>DBに登録したデータを削除します</p>
      {csvData.length ? (
        <Button
          fontSize={["xs", "sm", "md", "lg", "xl"]}
          colorScheme="teal"
          variant="outline"
          onClick={() => DeleteMasterDatas()}
        >
          マスタデータ削除
        </Button>
      ) : (
        <VStack>
          <Button
            isDisabled={true}
            fontSize={["xs", "sm", "md", "lg", "xl"]}
            colorScheme="teal"
            variant="outline"
            onClick={() => DeleteMasterDatas()}
          >
            マスタデータ削除
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
              地図データが登録されていません。
            </AlertTitle>
            <AlertDescription fontSize={["xs", "sm", "md", "lg", "xl"]}>
              削除は登録を行ってから実施してください。
            </AlertDescription>
          </Alert>
        </VStack>
      )}
    </VStack>
  );
}
