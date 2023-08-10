const crypto = require('crypto');
const User = require('../classes/User');

async function SHA512 (str) {
    return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
        return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
    });;
}

async function GetSHA512(str){
    return await SHA512(str)
}


function EncapulateUser(user){
    return new User(user);
}

module.exports = {
    SHA512: GetSHA512,
    EncapulateUser
}