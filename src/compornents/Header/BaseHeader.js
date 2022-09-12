import React from "react";
import { Flex, Heading, Spacer, Center } from "@chakra-ui/react";
import HeaderMenu from "./MenuList/HeaderMenu";
import { Link } from "react-router-dom";

const BaseHeader = () => {
  return (
    <>
      <Center as="nav" bg="teal.500" color="gray.50" height="8vh">
        <Flex align="center" maxWidth="80%" w="80vw" justify="space-between">
          <Heading as="h1" fontSize={{ base: "md", md: "xl" }}>
            <Link to="/">訪問診療支援</Link>
          </Heading>
          <Spacer />
        </Flex>
        <HeaderMenu></HeaderMenu>
      </Center>
    </>
  );
};

export default BaseHeader;
