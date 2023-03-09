/**
 * Theme: Dastyle - Responsive Bootstrap 4 Admin Dashboard
 * Author: Mannatthemes
 * Timeout Js
 */


$.sessionTimeout({
  message: 'Your session will be locked in 30 seconds.',
  keepAliveUrl: 'pages-starter.html',
  logoutButton:'Logout',
  logoutUrl: 'auth-login.html',
  redirUrl: 'auth-lock-screen.html',
  warnAfter: 3000,
  redirAfter: 30000,
  countdownBar: true
});
