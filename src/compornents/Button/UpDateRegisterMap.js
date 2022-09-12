import { Alert, AlertIcon, Button, Center, useToast } from "@chakra-ui/react";
import { useContext } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { UpdateRegisterMapIconData } from "../../databaseutil/FireStoreMasterMapControl";
import { mapDataContext } from "../../providers/CsvProvider";

export default function UpDateRegisterMap() {
  const { id } = useParams();
  const { mapData } = useContext(mapDataContext);
  const toast = useToast();
  const mapId = String(`${id}`);

  const Register = (mapId, mapData) => {
    UpdateRegisterMapIconData("CreateMapDatas", mapId, mapData);
  };

  return (
    <>
      <Button
        size={["xs", "sm", "md", "lg", "xl"]}
        fontSize={["xs", "sm", "md", "lg", "xl"]}
        colorScheme="teal"
        variant='outline'
        onClick={() => {
          Register(mapId, mapData);
          toast({
            position: "bottom",
            status: "success",
            isClosable: true,
            render: () => (
              <Alert status="success">
                <AlertIcon />
                更新が完了しました。
              </Alert>
            ),
          });
        }}
      >
        保存
      </Button>
    </>
  );
}
