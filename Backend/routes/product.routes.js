const express=require("express")
const { addProduct, getProduct } = require("../controllers/product.controllers")

const productRouter=express.Router()

productRouter.post("/",addProduct)
productRouter.get("/",getProduct)



module.exports=productRouter