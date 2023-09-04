const express = require("express");//This is function, which upon calling will
//add bunch of methods to our app variable
const morgan = require("morgan");

const tourRouter = require("./routes/tour-routes");
const userRouter = require("./routes/user-routes");

const app = express();
//This is how we send different responces to different http methods in the request
// app.get('/', (req,res)=>{
//     res.status(404).json({message:"Hello from the server side!", app:"Natours"});
// })
// app.post('/', (req,res)=>{
//     res.send("You can post to this endpoint")
// })

//Middleware
//middleware is a function that can modify incoming request data
//It stands between request and response
if(process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());

app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
});
app.use(express.static(`${__dirname}/public`));

//Routehandlers


//Routes
//app.get('/api/v1/tours', getAllTours);
//app.get('/api/v1/tours/:id', getTour);
//app.post('/api/v1/tours', createTour);
//app.patch('/api/v1/tours/:id', updateTour);
//app.delete('/api/v1/tours/:id', deleteTour);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;