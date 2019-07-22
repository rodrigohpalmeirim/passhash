// Client ID and API key from the Developer Console
var CLIENT_ID = '163875560065-compute@developer.gserviceaccount.com';
var API_KEY = 'AIzaSyDv7txJDeY6LChnhAYaPICbcEnhzQQjEc8';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
  *  On load, called to load the auth2 library and API client library.
  */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
  *  Initializes the API client library and sets up sign-in state
  *  listeners.
  */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    addRow();
  });
}

/**
  *  Called when the signed in status changes, to update the UI
  *  appropriately. After a sign-in, the API is called.
  */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    addRow();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
  *  Sign in the user upon button click.
  */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
  *  Sign out the user upon button click.
  */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

function addRow() {
  gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: "1YLLoA_W4fX9oRY58EoiZQqtvzGfOLQ8KKXCK_YyYycM",
    range: "A:E",
    valueInputOption: "RAW",
    resource: {
      values: [
        [
          browser_data.device,
          browser_data.os,
          browser_data.browser,
          browser_data.screen_resolution,
          browser_data.ip,
        ],
      ]
    }
  }).then((response) => {});
}