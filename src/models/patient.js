class Patient{
    constructor(username,password,email,fullName,ICPassport){
        this.username = username;
        setPassword(password);
        this.email = email;
        this.fullName = fullName;
        this.ICPassport = ICPassport;
    }

    setPassword(password){
        var newPassword = password;
        //TODO
        this.password = newPassword;
    }
    
}