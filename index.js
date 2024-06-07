const express=require('express');
const app=express();
app.use(express.json())
const dotenv=require('dotenv')
dotenv.config()
const cors=require('cors')

app.use(cors())

//connecting to database
const {connectMongoose}=require('./connectDB')
connectMongoose();


//api routes
const authRoutes=require('./routes/authRoutes');
const adminRoutes=require('./routes/adminRoutes')
const instructorRoutes=require('./routes/instructorRoute')
const lectureRoutes=require('./routes/lectureRoute')
const courseRoutes=require('./routes/courseRoute')
const sectionRoutes=require('./routes/sectionRoutes')
const ticketRoutes=require('./routes/ticketRoutes')
const reviewRoutes=require('./routes/reviewRoute')
app.use('/api/auth',authRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/instructor',instructorRoutes)
app.use('/api/lecture',lectureRoutes)
app.use('/api/section',sectionRoutes)
app.use('/api/course',courseRoutes)
app.use('/api/ticket',ticketRoutes)
app.use('/api/review',reviewRoutes)
//error middleware
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler)

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log("App started on", PORT);
})