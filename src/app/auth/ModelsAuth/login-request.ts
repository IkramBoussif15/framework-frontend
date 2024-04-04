export class LoginRequest 
{
    userName: string;
    password: string;
    secretCode:string;
    constructor(userName: string  ,  password: string,secretCode: string) {
        this.userName= userName;
        this.password = password;
        this.secretCode=secretCode;
    }
}
