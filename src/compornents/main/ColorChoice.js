import { Button, Center, Select } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import {
  mapDataContext,
  searchResultContext,
} from "../../providers/CsvProvider";

export default function ColorChoice(props) {
  const [color, SetColor] = useState("緑");
  const { mapDispatch } = useContext(mapDataContext);
  const { searchResultData } = useContext(searchResultContext);
  const colorList = ["緑", "赤", "青", "水色", "黄色", "オレンジ", "白", "紫"];
  const onClose = props.closeFlunction;

  let colorOptions = colorList.map((item) => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    );
  });

  const handleChange = (e) => {
    SetColor(e.target.value);
  };

  const changeColor = () => {
    const changeTarget = {
      list: searchResultData,
      choiceColor: color,
    };
    mapDispatch({ type: "ColorChange", value: changeTarget });
  };

  return (
    <>
      <label>色の選択：</label>
      <Select name="choice" onChange={(e) => handleChange(e)}>
        {colorOptions}
      </Select>
      <Center>
        <Button
          colorScheme="teal"
          variant="solid"
          my={5}
          onClick={() => {
            changeColor();
            onClose();
          }}
        >
          変更
        </Button>
      </Center>
    </>
  );
}
