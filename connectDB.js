const mongoose=require('mongoose')
const mongoUrl=process.env.db_url
const connectMongoose=()=>{
    mongoose.connect(mongoUrl)
    const db = mongoose.connection
    db.on("error", console.error.bind(console, "connection error"))
    db.once("open", () => {
        console.log('Database connected')
    })
}
module.exports={
    connectMongoose
}