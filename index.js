const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv').config();
const router = require('../router');

const app = express();

app.use(express.json());
app.use("/products",router);

app.listen(9090, async() => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
});

app.get("/", (request,response)=>{
    return response.send({msg:"Hello World"});
});
