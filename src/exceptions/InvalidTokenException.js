class InvalidTokenException extends Error {
    constructor() {
        super("Invalid Token");
        this.code = 403;
    }
}

export default InvalidTokenException;