import Config from '../Config';
import InvalidTokenException from '../exceptions/InvalidTokenException';
const axios = require('axios');

class Principal {
    static LOCAL_STORAGE_KEY = "token";
    static ROLE_ADMIN = "ADMIN";
    static ROLE_ANALYST = "ANALYST";
    static ROLE_COLLECTOR = "COLLECTOR";

    constructor() {
        this.token = null;
        this.profile = null;
        this.authenticated = false;
        this.roleMap = null;
    }

    initFromStorage = async() => {
        let storedToken = localStorage.getItem(Principal.LOCAL_STORAGE_KEY);

        if (storedToken) {
            try {
                await this.reloadProfileWithNewToken(storedToken);
            } catch (e) {
                this.reset();
            }
        }
    }

    reloadProfile = async() => {
        if (!this.token) {
            throw new InvalidTokenException();
        }

        try {
            const resp = await axios.get(Config.backend+"/auth/whoami", {headers: {"Authorization": "Bearer "+this.token}});
            this.profile = resp.data.entity;
            this.authenticated = true;
            this.roleMap = {};
            for (let i=0;i<this.profile.roles;i++) {
                var r = this.profile.roles[i];
                this.roleMap[r.name] = r;
            }

            localStorage.setItem(Principal.LOCAL_STORAGE_KEY, this.token);
        } catch (e) {
            this.reset();
            throw new InvalidTokenException();
        }
    }

    reloadProfileWithNewToken = async(newToken) => {
        this.reset();
        this.token = newToken;
        await this.reloadProfile();
    }

    isAdmin() {
        return (this.authenticated && this.roleMap && this.ROLE_ADMIN in this.roleMap);
    }

    isAnalyst() {
        return (this.authenticated && this.roleMap && this.ROLE_ANALYST in this.roleMap);
    }

    isCollector() {
        return (this.authenticated && this.roleMap && this.ROLE_COLLECTOR in this.roleMap);
    }

    reset() {
        localStorage.clear();
        this.token = null;
        this.profile = null;
        this.authenticated = false;
        this.roleMap = null;
    }
}

export default Principal;