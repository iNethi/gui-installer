import React from "react";
import { useKeycloak } from "@react-keycloak/web";

function LoginPage() {
  const { keycloak } = useKeycloak();

  const handleSubmit = (event) => {
    event.preventDefault();
    keycloak.login();
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleSubmit}>Login with Keycloak</button>
    </div>
  );
}

export default LoginPage;