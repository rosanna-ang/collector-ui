import React, {useEffect, useState} from 'react';
import Config from '../Config';
import {useAuthContext} from '../auth/AuthContext';
const axios = require('axios');

function LoginComponent() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [validationError, setValidationError] = useState();

    const {principal, setPrincipal} = useAuthContext();

    async function doLogin(event) {
        event.preventDefault();
        setValidationError(null);
        try {
            const loginResponse = await axios.post(Config.backend+"/auth/login", {username: username, password: password});    
            const token = loginResponse.data.token;
            await principal.reloadProfileWithNewToken(token);
            setPrincipal(principal);
    
            window.location = "/secured/main";
        } catch (e) {
            setValidationError("Username and password do not match");
        }

    }

    return  (
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <div class="mt-3 mb-3">
                    <h1 class="display-6">Sign In</h1>
                </div>
                {validationError ? <div class="alert alert-danger">{validationError}</div> : null}
                <form onSubmit={doLogin}>
                    <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input type="text" class="form-control form-control-lg" value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control form-control-lg" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button class="btn btn-primary" type="submit">Login</button>
                </form>
            </div>
            <div class="col-3"></div>
        </div>
    );
}

export default LoginComponent;