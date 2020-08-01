import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header'
import { myMSALObj } from '../configs/authProvider';
import { tokenRequest } from '../configs/authConfig';

const AppComponent = ({ Component, pageProps, currentUser }) => {
    return <div>
        {/* <Header currentUser={currentUser}></Header> */}
        <Component {...pageProps} />
    </div>
}

AppComponent.getInitialProps = async (appContext) => {
    let res = {}
    if(myMSALObj){
        res = await myMSALObj.acquireTokenSilent(request);
    }
    // const res = await buildClient(appContext.ctx).get('/api/users/currentuser');
    let pageProps = {};
    if (appContext?.Component?.getInitialProps) {
        pageProps = await appContext?.Component?.getInitialProps(appContext.ctx)
    }

    return {
        pageProps,
        // currentUser: res?.data.currentUser
        currentUser: res || {}
    };
};

export default AppComponent;
