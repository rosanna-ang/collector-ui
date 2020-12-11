import React, {Component, useEffect, useState} from 'react';
import Principal from '../auth/Principal';
import {AuthContext, useAuthContext} from '../auth/AuthContext';
import {Redirect} from 'react-router-dom';


function AuthComponent(props) {
    const [principal, setPrincipal] = useState();    
    const path = window.location.pathname;

    let pr = principal;
    
    useEffect(async() => {
        if (pr == null) {
            
            pr = new Principal();
            pr.initFromStorage()
                .then(() => {
                    setPrincipal(pr);
                });
        }
    });

    if (pr != null) {

        if (path == "/" && principal.authenticated) {
            window.location = "/secured/main";
        } else if (path.startsWith("/secured") && !principal.authenticated) {
            window.location = "/";
        } else {
            return (
                <AuthContext.Provider value={{principal, setPrincipal}} {...props} />
            );
        }
    }

    return null;
}

export default AuthComponent;