import React, { useState, useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import {Routes, Route} from "react-router-dom";
function MainApp() {
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    setKeycloakInitialized(true);
  }, []);

  if (!keycloakInitialized || !initialized) {
    return <div>Loading...</div>;
  }

  if (!keycloak.authenticated) {
    return <LoginPage />;
  }

  return (
      <Routes>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
  );
}

export default MainApp;