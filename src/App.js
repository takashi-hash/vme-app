import React from "react";
import "./App.css";
import ViewPage from "./compornents/Page";
import { AuthProvider } from "./providers/Auth.Provider";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
      <AuthProvider>
        <ChakraProvider>
          <ViewPage />
        </ChakraProvider>
      </AuthProvider>
  );
}

export default App;
