import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://keycloak.inethilocal.net/auth',
  realm: 'Master',
  clientId: 'maintainer',
  redirectUri: window.location.origin,
});


export default keycloak;
