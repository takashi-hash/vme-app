import React from "react";
import { Box, Button } from "@chakra-ui/react";

export default function PatientCard(props) {
  const id = props.id;
  const patientName = props.patientName;
  const doctorName = props.doctorName;
  const week = props.week;
  const weekday = props.weekday;
  const adress = props.adress;
  const pushed = props.pushed;
  const display = props.display;
  const AddRoutCount = props.countSet;
  const matchIndex = props.matchIndex;
  
  const setDirection = (key) => {
    AddRoutCount(key);
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      pushed={pushed}
      display={display}
    >
      <p>{patientName}</p>
      <dl>
        <></>{matchIndex !== null && <dt>経路{matchIndex + 1}番目</dt>}
        <dt>主治医</dt>
        <dd>{doctorName}</dd>
        <dt>訪問</dt>
        <dd>
          <span>第{week}週</span>
          <span>{weekday}</span>
        </dd>
        <dt>住所</dt>
        <dd>{adress}</dd>
      </dl>
      {matchIndex !== null ? (
        <Button onClick={() => setDirection(id)}>経路から削除</Button>
      ) : (
        <Button onClick={() => setDirection(id)}>経路を追加</Button>
      )}
    </Box>
  );
}
