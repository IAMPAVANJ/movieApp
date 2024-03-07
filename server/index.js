const express = require('express');
const app = express();
const cors = require('cors');
const UserRoutes = require('./Routes/userRoutes');
const connect = require('./dbConnection/Connection');
const port = 8080;
const dotenv = require('dotenv');
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

connect();

app.use("/user",UserRoutes);



app.listen(port,()=>{
    console.log(`Server is up at ${port}`)
})

