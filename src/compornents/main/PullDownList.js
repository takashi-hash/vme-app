import React from "react";
import { Select } from "@chakra-ui/react";

export default function PullDownList(props) {
  const { List, label, firstChoice, propRef } = props;
  const list = Array.from(List);
  list.sort();
  // 先頭に「すべて選択」追加
  list.unshift(firstChoice);
  let optionList = [];
  // プルダウンの中を作成
  list.forEach((item) => {
    optionList.push(
      <option key={item} value={item}>
        {item}
      </option>
    );
  });
  // プルダウンの選択の処理
  const handleChange = (e) => {};
  return (
    <>
      <label>{label}:</label>
      <Select ref={propRef} name="choice" onChange={(e) => handleChange(e)}>
        {optionList}
      </Select>
    </>
  );
}
