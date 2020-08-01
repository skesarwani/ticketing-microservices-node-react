import Link from 'next/link';
import * as Msal from "msal";
import { msalConfig, loginRequest } from '../configs/authConfig';
import { passTokenToApi } from '../configs/authProvider';
import { myMSALObj } from '../configs/authProvider';
import { useState } from 'react';

export default ({ currentUser, onAuthChange }) => {
    const [user, setUser] = useState(currentUser);
    let signIn = () => {};
    let signOut = () => {};
    let signUp = () => {};
    if(myMSALObj){
        signIn = () => {
            myMSALObj.loginPopup(loginRequest)
            .then(loginResponse => {
                const extractedUser = myMSALObj.getAccount();
                if (myMSALObj.getAccount()) {
                    setUser(extractedUser);
                    onAuthChange(extractedUser);
                }
                
            }).catch(error => {
              console.log(error);
            });
        };

        signOut = () => {
            myMSALObj.logout();
        }

        signUp = () => {
            myMSALObj.openPopup()
        }
    }

    const links = [
        !user && { label: 'Sign Up', click: signUp.bind(this) },
        !user && { label: 'Sign In', click: signIn.bind(this) },
        user && { label: 'Sign Out', click: signOut.bind(this) }
    ]
        .filter(linkConfig => linkConfig)
        .map(({ label, click }) => {
            return <li key={label} className="nav-item">
                    <a className="nav-link" onClick={click}>{label}</a>
            </li>
        });

    return <nav className="navbar navbar-light bg-light navbar-fixed-top">
        <Link href="/"><a className="navbar-brand">GitTix</a></Link>
        {user && user.name}
        <div className="d-flex justify-content-end">
            <ul className="nav d-flex align-items-center">
                {links}
            </ul>
        </div>
    </nav>

}