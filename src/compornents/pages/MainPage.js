import React from "react";
import { BrowserRouter } from "react-router-dom";
import CsvProvider from "../../providers/CsvProvider";
import { Router } from "../../router/Router";
import ViewHeader from "../Header/BaseHeader";

const MainPage = () => {
  return (
    <CsvProvider>
      <BrowserRouter>
        <ViewHeader />
        <Router></Router>
      </BrowserRouter>
    </CsvProvider>
  );
};

export default MainPage;
