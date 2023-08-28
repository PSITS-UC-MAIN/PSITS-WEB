export class AuthenticationToken{
    constructor({AuthToken, ExpirationDate, issuer}){
        this.AuthToken = AuthToken;
        this.ExpirationDate = ExpirationDate;
        this.issuer = issuer;
    }
}