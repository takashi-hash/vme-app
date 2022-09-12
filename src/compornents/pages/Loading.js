import React from "react";
import { Flex, Heading, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Flex bg="gray.100" align="center" justify="center" height="100vh">
      <Flex
        direction="column"
        bg="white"
        w="80vw"
        height="40vh"
        borderRadius="md"
        align="center"
        justify="center"
        shadow="md"
      >
        <Heading color="teal.500" as="h1" size="lg" textAlign="center">
          Loading...
        </Heading>
        <Spinner />
      </Flex>
    </Flex>
  );
};

export default Loading;
