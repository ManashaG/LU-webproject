const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app=express();
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/nutrients",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("connected")
})

const foodSchema=new mongoose.Schema({
    name:String,
    calories:Number,
    protein:Number,
    carbs:Number,
    fats:Number,
    fibre:Number,
    weight:Number,
})

const foodModel=new mongoose.model("foods",foodSchema)

app.get("/foods", async(req,res)=>{
    let foods=await foodModel.find()
    res.send({foods})
})

app.post("/foods/create",(req,res)=>{
    const food=req.body;
    let foodObj=new foodModel(food)
    foodObj.save().then(()=>{
        res.send({message:"food created"})
    })
})
app.listen(8000)