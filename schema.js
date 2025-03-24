const mongoose = require('mongoose');
const { type } = require('os');

const schema = mongoose.Schema({
    title:{type:String,required:true,trim:true},
    price:{type:Number,required:true,min:0},
})  

const model = mongoose.model("products",schema);

module.exports = model;
