import React from "react";
import { Divider, Flex, Heading, Button, Center } from "@chakra-ui/react";
import { signInWithGoogle } from "../../service/firebase";
import { LockIcon } from "@chakra-ui/icons";

const Login = () => {
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
          Google認証画面
        </Heading>
        <Divider my={8} w="80%" />
        <Center>
          <LockIcon fontSize="xl" />
        </Center>
        <Button
          my={4}
          py={6}
          maxWidth="400px"
          w="80%"
          bg="tomato"
          color="white"
          onClick={signInWithGoogle}
        >
          ログイン
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;
