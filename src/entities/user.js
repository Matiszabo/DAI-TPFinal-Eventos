export default class User{
    id;
    first_name;
    last_name;
    username;
    password;

    constructor(fn, ln, us, ps){
        this.id = undefined;
        this.first_name = fn;
        this.last_name = ln;
        this.username = us;
        this.password = ps;
    }
}