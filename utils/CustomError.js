class CustomError extends Error{
    constructor(message,code){
        super(message);
        console.log(message,code)
        this.name=this.constructor.name;
        this.code=code;
        Error.captureStackTrace(this,this.constructor)
    }
}
module.exports=CustomError