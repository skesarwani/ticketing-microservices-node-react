import { msalConfig } from './authConfig';
import { apiConfig } from './apiConfig';
import * as Msal from "msal";

export const myMSALObj = typeof window === 'undefined' ? null : new Msal.UserAgentApplication(msalConfig);

export const getTokenPopup = (request) => {
    return myMSALObj.acquireTokenSilent(request)
      .catch(error => {
        console.log("Silent token acquisition fails. Acquiring token using popup");
        console.log(error);
        // fallback to interaction when silent call fails
        return myMSALObj.acquireTokenPopup(request)
          .then(tokenResponse => {
            console.log("access_token acquired at: " + new Date().toString());
            return tokenResponse;
          }).catch(error => {
            console.log(error);
          });
      });
  }
  
  // Acquires and access token and then passes it to the API call
  export const passTokenToApi = () => {
    getTokenPopup(tokenRequest)
      .then(tokenResponse => {
          console.log("access_token acquired at: " + new Date().toString());
          try {
            logMessage("Request made to Web API:");
            callApiWithAccessToken(apiConfig.webApi, tokenResponse.accessToken);
          } catch(err) {
            console.log(err);
          }
      });
  }

  // helper function to access the resource with the token
function callApiWithAccessToken(endpoint, token) {
    const headers = new Headers();
    const bearer = `Bearer ${token}`;
  
    headers.append("Authorization", bearer);
  
    const options = {
        method: "GET",
        headers: headers
      };
  
    fetch(endpoint, options)
      .then(response => response.json())
      .then(response => {
        logMessage("Web API returned:\n" + JSON.stringify(response));
      }).catch(error => {
        logMessage("Error calling the Web api:\n" + error);
      });
  }