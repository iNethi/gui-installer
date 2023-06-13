import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const InstallModal = ({
    show,
    alertMessage,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleInstallConfirm,
    handleInstallCancel,
    isFetching,
    handleUsernameChange,
    handleServerPasswordChange,
    canInstall,
    showPasswordInputs,
    handlePrice30MinChange,
    handlePrice60MinChange,
    handlePrice24hrChange,
    handlePrice1GbChange,
    isUserManagement,
}) => {
  const [exitButtonVisible, setExitButtonVisible] = useState(false);
  const handleExit = () => {
    setExitButtonVisible(false);
    handleInstallCancel();
    window.location.reload();
  };

  const [installing, setInstalling] = useState(false);

  const renderButton = () => {
    if (alertMessage.toLowerCase().startsWith('error') || exitButtonVisible) {
      return (
        <Button variant="primary" onClick={handleExit}>
          Exit
        </Button>
      );
    }

    return (
      <Button
        variant="primary"
        disabled={!canInstall || isFetching || installing}
        onClick={() => {
          setInstalling(true);
          handleInstallConfirm().finally(() => {
            setInstalling(false);
            setExitButtonVisible(true);
          });
        }}
      >
        {installing ? 'Installing...' : 'Install'}
      </Button>
    );
  };

  return (
    <Modal show={show} onHide={handleExit}>
      <Modal.Header closeButton>
        <Modal.Title>Install Application</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {showPasswordInputs && (
          <>
            <div className="mb-3">
              <label htmlFor="password-input" className="form-label">
                iNethi Service Password (the password used for this service)
              </label>
              <input
                type="password"
                className="form-control"
                id="password-input"
                onChange={handlePasswordChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirm-password-input" className="form-label">
                Confirm iNethi Service Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirm-password-input"
                onChange={handleConfirmPasswordChange}
              />
            </div>
          </>
        )}

        <div className="mb-3">
          <label htmlFor="username-input" className="form-label">
            Server Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username-input"
            onChange={handleUsernameChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="server-password-input" className="form-label">
            Server Password
          </label>
          <input
            type="password"
            className="form-control"
            id="server-password-input"
            onChange={handleServerPasswordChange}
          />
        </div>


        {
  isUserManagement && (
    <>
      <div className="mb-3">
        <label htmlFor="price1-input" className="form-label">
          How much will 30 minutes of data cost?
        </label>
        <input
          type="number"
          className="form-control"
          id="price1-input"
          onChange={handlePrice30MinChange}
        />
      </div>
    <div className="mb-3">
          <label htmlFor="price2-input" className="form-label">
            How much will 60 minutes of data cost?
          </label>
          <input
            type="number"
            className="form-control"
            id="price2-input"
            onChange={handlePrice60MinChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price3-input" className="form-label">
            How much will 1 day of data cost?
          </label>
          <input
            type="number"
            className="form-control"
            id="price3-input"
            onChange={handlePrice24hrChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price4-input" className="form-label">
            How much will 1 gigabyte of data cost?
          </label>
          <input
            type="number"
            className="form-control"
            id="price4-input"
            onChange={handlePrice1GbChange}
          />
        </div>
    </>
  )

}
{alertMessage && (
          <div className={`alert ${alertMessage.toLowerCase().startsWith('error') ? 'alert-danger' : 'alert-warning'}`} role="alert">

            {alertMessage}
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        {!canInstall && (
          <div className="alert alert-warning" role="alert">
            Please fill in all fields before installing.
          </div>
        )}

        {renderButton()}
      </Modal.Footer>
    </Modal>
  );
};

export default InstallModal;