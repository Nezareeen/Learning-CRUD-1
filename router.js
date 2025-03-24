const express = require('express');
const router = express.Router();
const model = require('./schema');

router.post("/create",async(request,response)=>{
    try {
    const {title,price} = request.body;
    if(!title || !price){
        return response.status(400).send({msg:"All fields are required"});
    }
    const newProduct = new model({title,price});
    await newProduct.save();
    return response.status(201).send({msg:"Product created successfully",product:newProduct});
    } catch (error) {
        console.log("error in creating product",error);
        return response.status(500).send({msg:"Internal Server Error"});
    }
});

router.put("/update/:id",async(request,response)=>{
    try {
        const {id} = request.params;
        console.log(id);
        if(!id){
            return response.status(400).send({msg:"Product ID is required"});
        }
        const {title,price} = request.body;
        if(!title || !price){
            return response.status(400).send({msg:"All fields are required"});
        }
        const updateProduct = await model.findByIdAndUpdate(id,{title,price});
        return response.status(200).send({msg:"Product updated successfully",product:updateProduct});

    } catch (error) {
        console.log("error in updating product",error);
        return response.status(500).send({msg:"Internal Server Error"});
    }
});

router.patch("/update/:id",async(request,response)=>{
    try {
        const {id} = request.params;
        if(!id){
            return response.status(400).send({msg:"Product ID is required"});
        }
        const updates = request.body;
        const updatedProduct = await model.findByIdAndUpdate(id, updates, {new: true});
        if(!updatedProduct){
            return response.status(404).send({msg:"Product not found"});
        }
        return response.status(200).send({msg:"Product updated successfully", product:updatedProduct});
    } catch (error) {
        console.log("error in updating product",error);
        return response.status(500).send({msg:"Internal Server Error"});
    }
});

router.delete("/delete/:id",async(request,response)=>{
    try {
        const {id} = request.params;
        if(!id){
            return response.status(400).send({msg:"Product ID is required"});
        }
        const deletedProduct = await model.findByIdAndDelete(id);
        if(!deletedProduct){
            return response.status(404).send({msg:"Product not found"});
        }
        return response.status(200).send({msg:"Product deleted successfully",product:deletedProduct});
    } catch (error) {
        console.log("error in deleting product",error);
        return response.status(500).send({msg:"Internal Server Error"});
    }
});

module.exports = router;
