import buildClient from "../api/build-client";
import { myMSALObj } from '../configs/authProvider';
import { tokenRequest, loginRequest } from '../configs/authConfig';
import Header from '../components/header'
import { useState } from 'react';
const LandingPage = ({ currentUser }) => {
    const [user, setUser] = useState(currentUser);
    const getToken = () => {
        // currentUser = {};
        if (typeof window !== 'undefined'){
            if(myMSALObj){
                // myMSALObj.handleRedirectCallback((err, res) => {
                //     debugger;
                // });
                myMSALObj.acquireTokenSilent(tokenRequest).then(tokenResponse => {
                    console.log("access_token acquired at: " + new Date().toString() + 'on index.js');
                    try {
                    setUser(tokenResponse);
                    return;
                    } catch(err) {
                      console.log(err);
                    }
                }, (err) => {
                });
            }
        }
    }
    // let isLoading = true;
    if(!currentUser){
        getToken();
    }

    const authChanged = (headerUser) => {
        setUser(headerUser);
    }
    return <div>
        <Header currentUser={user} onAuthChange={authChanged}></Header>
        {user ? <h1>You're signed in</h1> : <h1>You're not signed in</h1>};
    </div>
};

LandingPage.getInitialProps = async (context) => {
    // const res = await buildClient(context).get('/api/users/currentuser');
    let user = {};
    if (typeof window !== 'undefined'){
        console.log('on browser');
        if(myMSALObj){
            const tokenResponse = await myMSALObj.acquireTokenSilent(request);
            user = tokenResponse;
            // .then(tokenResponse => {
            //     console.log("access_token acquired at: " + new Date().toString() + 'on index.js');
            //     try {
            //       logMessage("Request made to Web API:");
            //       user = tokenResponse;
            //     //   callApiWithAccessToken(apiConfig.webApi, tokenResponse.accessToken);
            //     } catch(err) {
            //       console.log(err);
            //     }
            // });
        }
    }
    return user;
};

export default LandingPage;