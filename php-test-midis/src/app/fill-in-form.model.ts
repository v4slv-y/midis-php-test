
export class Message{
    public name: string;
    public email: string;
    public web: string;
    public message: string;
    public date: number;
    public IP_adress;

    constructor(name_:string, email_:string, web_:string, 
        message_:string, IP:string){
        this.name=name_;
        this.email=email_;
        this.web=web_;
        this.message=message_;
        this.date=Date.now();
        this.IP_adress=IP;
    }
}