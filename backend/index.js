const express = require('express')
const app = express()
const port = 8000;
const cookieParser = require('cookie-parser');
const cors = require('cors')

app.use(cors())


app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cookieParser());

const mongoose =require('mongoose');
const router = require('./router/user_route');

mongoose.connect('mongodb+srv://asodariyashyam555:7Gy4HOdaqydt22QM@cluster0.609d2sg.mongodb.net/SahandEstate',{
    useNewUrlParser : true

})
.then((res)=>{
    console.log("connected to the database")
})
.catch((err)=>{
    console.log(err)
})

app.use("/api/user", require('./router/user_route'));
app.use("/api/listing", require("./router/listing_route"))

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))