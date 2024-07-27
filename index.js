const express=require('express');
const app=express();
app.use(express.json())
const dotenv=require('dotenv')
dotenv.config()
const cors=require('cors')
const corsOptions = {
    origin: "http://localhost:3000", // Allow requests from any origin (replace with your frontend URL during production)
    credentials: true, // Enable credentials (cookies, authorization headers) in CORS requests
    optionsSuccessStatus: 200, // Set the success status code for OPTIONS requests
    allowedHeaders: ['Content-Type', 'auth'], // Allow these headers in CORS requests
  };
  
  app.use(cors(corsOptions));

//connecting to database
const {connectMongoose}=require('./connectDB')
connectMongoose();

//swagger setup
const swaggerUi=require('swagger-ui-express')
const swaggerSpecs=require('./swaggerConfig')
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpecs))


//api routes
const authRoutes=require('./routes/authRoutes');
const adminRoutes=require('./routes/adminRoutes')
const instructorRoutes=require('./routes/instructorRoute')
const lectureRoutes=require('./routes/lectureRoute')
const courseRoutes=require('./routes/courseRoute')
const sectionRoutes=require('./routes/sectionRoutes')
const ticketRoutes=require('./routes/ticketRoutes')
const reviewRoutes=require('./routes/reviewRoute')
const enrollmentRoutes=require('./routes/buyCourse')
app.use('/api/auth',authRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/instructor',instructorRoutes)
app.use('/api/lecture',lectureRoutes)
app.use('/api/section',sectionRoutes)
app.use('/api/course',courseRoutes)
app.use('/api/ticket',ticketRoutes)
app.use('/api/review',reviewRoutes)
app.use('/api/enrollment',enrollmentRoutes)
//error middleware
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler)

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log("App started on", PORT);
})