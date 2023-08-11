const crypto = require('crypto');

class AuthToken{
    constructor(issuer = undefined, expireMins = 120){
        this.AuthToken = crypto.randomUUID(); 
        this.ExpirationDate = new Date();
        this.ExpirationDate = this.ExpirationDate.setMinutes(this.ExpirationDate.getMinutes() + expireMins);
        this.issuer = issuer;
    }

    toString(){
        const data = {AuthToken:this.AuthToken, ExpirationDate:this.ExpirationDate}
        return JSON.stringify(data);
    }
}

module.exports = AuthToken;
