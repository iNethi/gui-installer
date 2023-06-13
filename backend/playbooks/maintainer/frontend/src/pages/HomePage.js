import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import InstallModal from "../InstallModal";
import "../App.css";
import Navigation from "../Components/Navigation/Navigation";

function HomePage() {
  const { keycloak } = useKeycloak();
  const [services, setServices] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [otherContainers, setOtherContainers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ipAddress, setIpAddress] = useState("");
  const [username, setUsername] = useState("");
  const [serverPassword, setServerPassword] = useState("");
  const [passwordProtected, setPasswordProtected] = useState(false);
  const [exitModal, setExitModal] = useState(false);
  const [price30Min, setPrice30Min] = useState("");
  const [price60Min, setPrice60Min] = useState("");
  const [price1Day, setPrice1Day] = useState("");
  const [price1Gb, setPrice1Gb] = useState("");
  const servicesToExclude = ['Wordpress Database', 'Wordpress Database UI', 'Keycloak Database',
      'iNethi Radio Database Cache', 'PeerTube Database', 'Wordpress Database', 'Nextcloud Database',
  'Keycloak Database', 'User Management Database', 'Radiusdesk Database'];
  const passwordProtectedServices = ['Nextcloud', 'Wordpress', 'PeerTube', 'Keycloak']
  useEffect(() => {
    fetch("http://127.0.0.1:5000/containers")
      .then((res) => res.json())
      .then((data) => {
        setServices(data.running_services);
        setOtherContainers(data.other_containers);

        const filteredAvailableServices = data.available_services.filter(
          (service) => !servicesToExclude.includes(service)
        );
        setAvailableServices(filteredAvailableServices);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleInstallService = (serviceName) => {
    console.log(`Installing service: ${serviceName}`);
    setServiceName(serviceName);
    const isPasswordProtected = passwordProtectedServices.includes(serviceName);

    setPasswordProtected(isPasswordProtected);
    setShowModal(true);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleServerPasswordChange = (event) => {
    setServerPassword(event.target.value);
  };

  const isUserManagement = serviceName === "User Management";
  const canInstall = setPasswordProtected
    ? username && serverPassword
    : isUserManagement
    ? price30Min && price60Min && price1Day && price1Day && username && serverPassword
    : password && confirmPassword && username && serverPassword;

  const handleInstallConfirm = () => {
  if (!canInstall) {
    setShowModal(true);
    setMessage("Please fill in all fields");
    return Promise.reject(new Error("Please fill in all fields"));
  } else if (password !== confirmPassword) {
    setShowModal(true);
    setMessage("Passwords do not match");
    return Promise.reject(new Error("Passwords do not match"));
  } else {
    return fetch("http://127.0.0.1:5000/install-service", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        application_name: serviceName,
        password: password,
        username: username,
        server_password: serverPassword,
        price30Min: price30Min,
        price60Min: price60Min,
        price1Day: price1Day,
        price1Gb: price1Gb,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          setMessage(`Successfully installed ${serviceName}`);
        } else if (res.status === 500) {
          return res.json().then((data) => {
            setMessage(`Error: Failed to install ${serviceName}.`);
            throw new Error(`Error: Failed to install ${serviceName}`);
          });
        } else if (res.status === 400) {
          return res.json().then((data) => {
            setMessage(`${data.Error}`);
            throw new Error(`Error: ${data.Error}`);
          });
        }
        else {
          throw new Error("Unknown error occurred");
        }
        setExitModal(true);
        setShowModal(true);
        //
      })
      .catch((error) => {
        console.error(error);
      });
  }
};


  const handleInstallCancel = () => {
    setShowModal(false);
  };

  const handleExitConfirm = () => {
    window.location.reload();
  };

  return (
    <div className="homepage-container">
      <div>
        <Navigation />
      </div>
      <div className="homepage-content">
        <h1>Welcome, {keycloak.authenticated && keycloak.tokenParsed.preferred_username}!</h1>
        <p>You are now logged in to the app</p>

        <div style={{ backgroundColor: "#4285f4", color: "white", padding: "1rem" }}>
          <h1>Running Services:</h1>
          <ul>
            {services.map((container) => (
              <li key={container}>{container}</li>
            ))}
          </ul>

          <h1>Available Services:</h1>
          <ul className="service-list">
            {availableServices.map((container) => (
              <li key={container}>
                {container}
                <button
                  onClick={() => handleInstallService(container)}
                  type="button"
                  className="btn btn-primary ms-2" // Add padding to the left of the button
                  style={{ paddingRight: "20px" }} // Add padding to the right of the button
                >
                  Install
                </button>
              </li>
            ))}
          </ul>

          <h1>Non-running Containers:</h1>
          <ul>
            {otherContainers.map((container) => (
              <li key={container}>{container}</li>
            ))}
          </ul>

          <InstallModal
            show={showModal}
            alertMessage={message}
            handlePasswordChange={handlePasswordChange}
            handleConfirmPasswordChange={handleConfirmPasswordChange}
            handleInstallConfirm={handleInstallConfirm}
            handleInstallCancel={handleInstallCancel}
            handleUsernameChange={handleUsernameChange}
            handleServerPasswordChange={handleServerPasswordChange}
            exitButtonVisible={exitModal}
            handleExit={handleExitConfirm}
            canInstall={canInstall}
            showPasswordInputs={passwordProtected}
            isUserManagement={isUserManagement}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

