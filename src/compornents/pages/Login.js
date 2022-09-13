import React from "react";
import { Divider, Flex, Heading, Button, Center, Input } from "@chakra-ui/react";
import {
  signInWithGoogle,
  signInEmailAndPassword,
  createUser,
} from "../../service/firebase";
import { LockIcon } from "@chakra-ui/icons";
import { useRef } from "react";

const Login = () => {
  const tourokuMail = useRef(null);
  const tourokuPass = useRef(null);
  const loginMail = useRef(null);
  const loginuPass = useRef(null);
  

  const portfolioLogin = () => {
    if (loginMail.current.value === "" || loginuPass.current.value === "") {
      alert("メールアドレスとパスワードの両方が必須です。");
      return;
    }
    signInEmailAndPassword(loginMail.current.value, loginuPass.current.value);
  };
  const portfolioCreateUser = () => {
    if (tourokuMail.current.value === "" || tourokuPass.current.value === "") {
      alert("メールアドレスとパスワードの両方が必須です。");
      return;
    }
    createUser(tourokuMail.current.value, tourokuPass.current.value);
  };

  return (
    <Flex
      bg="gray.100"
      justifyContent="space-around"
      align="center"
      justify="center"
      height="100vh"
    >
      <Flex
        direction="column"
        bg="white"
        w="40vw"
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
      <Flex
        direction="column"
        bg="white"
        w="40vw"
        height="80vh"
        borderRadius="md"
        align="center"
        justify="center"
        shadow="md"
      >
        {" "}
        <Heading color="teal.500" as="h1" size="lg" textAlign="center" mb="1rem">
          portfolio会員登録
        </Heading>
        <Input ref={tourokuMail} type="email" placeholder="email" w="80%" mb="1rem" />
        <Input ref={tourokuPass} type="password" placeholder="password" w="80%" mb="1rem" />
        <Button
          my={4}
          py={6}
          maxWidth="400px"
          w="80%"
          bg="tomato"
          color="white"
          onClick={portfolioCreateUser}
        >
          登録
        </Button>
        <Divider my={8} w="80%" />
        <Heading color="teal.500" as="h1" size="lg" textAlign="center"mb="1rem">
          portfolio認証
        </Heading>
        <Input ref={loginMail} type="email" placeholder="email" w="80%" mb="1rem" />
        <Input ref={loginuPass} type="password" placeholder="password" w="80%" mb="1rem" />
        <Button
          my={4}
          py={6}
          maxWidth="400px"
          w="80%"
          bg="tomato"
          color="white"
          onClick={portfolioLogin}
        >
          ログイン
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;
