import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function RouteForApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" component={HomePage} />
    </Routes>
    </BrowserRouter>
  );
}

export default RouteForApp;