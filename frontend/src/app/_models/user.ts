
export class User {
    private name : String;
    private username : String;
    private phone : number;
    private email : String;
    private password : String;

    constructor(name : String, username : String, phone : number, email : String, password : String){
        this.name = name;
        this.username = username;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }
}