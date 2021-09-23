const crypto = require('crypto');

class Patient{
    constructor(username,password,email,fullName,ICPassport){
        this.username = username;
        this.email = email;
        this.fullName = fullName;
        this.ICPassport = ICPassport;
        this.setPassword(password);
    }
    constructor(username, password){
        this.username = username;
        this.password = password;
        
    }

    setPassword(password){
        var newPassword;
        var hash = crypto.createHash('sha256');
        data = hash.update(password);
        newPassword= data.digest('hex');
        this.password = newPassword;
    }

    
    
}