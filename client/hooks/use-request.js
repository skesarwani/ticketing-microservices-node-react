import { useState } from 'react';
import axios from 'axios';

export default ({ url, method, body }) => {
    const [errors, setErrors] = useState([]);
    const doRequest = async () => {
        try {
            setErrors([]);
            const response = await axios[method](url, body);
            return response.data;
        } catch (err) {
            setErrors(err.response.data.errors);
        }
    };
    return { doRequest, errors };
}