import React from "react";
import { Box, Text } from "@chakra-ui/react";

const PatientCard = (props) => {
  const index = props.index;
  const patientName = props.patientName;
  const doctorName = props.doctorName;
  const week = props.week;
  const weekday = props.weekday;
  const adress = props.adress;
  const pushed = props.pushed;
  const display = props.display;

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      key={index}
      pushed={pushed}
      display={display}
    >
      <p className="patientName">{patientName}</p>
      <dl>
        <dt>
          <Text fontSize={["xs", "sm", "md", "lg", "xl"]}>主治医</Text>
        </dt>
        <dd>{doctorName}</dd>
        <dt>
          <Text fontSize={["xs", "sm", "md", "lg", "xl"]}>訪問</Text>
        </dt>
        <dd>
          <span>
            <Text fontSize={["xs", "sm", "md", "lg", "xl"]}>第{week}週</Text>
          </span>
          <span>
            <Text fontSize={["xs", "sm", "md", "lg", "xl"]}>{weekday}</Text>
          </span>
        </dd>
        <dt>
          <Text fontSize={["xs", "sm", "md", "lg", "xl"]}>住所</Text>
        </dt>
        <dd>
          <Text fontSize={["xs", "sm", "md", "lg", "xl"]}>{adress}</Text>
        </dd>
      </dl>
    </Box>
  );
};

export default PatientCard;
