import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {doRequest, errors} = useRequest({
        url:'/api/users/signin',
        method: 'post',
        body: {
            email, password
        },
        onSuccess: () => Router.push('/')
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        await doRequest();
    }

    const getErrorByField = (field) => {
        return field === '' ? errors: errors.filter(e => e.field === field)
    }

    return <form role="form" onSubmit={onSubmit}>
        <h1>Sign In</h1>
        {getErrorByField('').length > 0 && <div className="alert alert-danger">
            <strong>Oops!</strong> {getErrorByField('').map(e => e.message)}
        </div>}
        <div className="form-group">
            <label>Email Address</label>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)}
                className="form-control" placeholder="Email" />
        </div>
        {getErrorByField('email').length > 0 && <div className="alert alert-danger">
            <strong>Oops!</strong> {getErrorByField('email').map(e => e.message)}
        </div>}
        <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="form-control" placeholder="Password" />
        </div>
        {getErrorByField('password').length > 0 && <div className="alert alert-danger">
            <strong>Oops!</strong> {getErrorByField('password').map(e => e.message)}
        </div>}
        <button type="submit" className="btn btn-primary">Sign In</button>
    </form>

}