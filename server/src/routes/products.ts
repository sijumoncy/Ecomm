import express from 'express'
import Product, {ProductInterface} from '../models/Product'

const router = express.Router()
const apiBaseUrl = process.env.API_URL

// add products
router.post("/", async (req, res) => {
    try{
        const product = new Product({
            name: req.body.name,
            image: req.body.image,
            count:req.body.count,
        })
        const createdProduct = await product.save()
        res.status(201).json(createdProduct)
    } catch(err) {
        res.status(500).json({
            error: err,
            success:false
        })
    }
})

// get all products
router.get("/", async (req, res) => {
    try {
        const productList = await Product.find();
        res.status(200).json(productList)
    } catch(err) {
        res.status(500).json({
            error:err,
            success:false
        })
    }
})

export default router;
