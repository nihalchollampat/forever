import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({}).sort({ date: -1 });
        res.json({
            success: true,
            products
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching products'
        });
    }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            product
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching product'
        });
    }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
    try {
        const products = await Product.find({
            category: req.params.category
        }).sort({ date: -1 });

        res.json({
            success: true,
            products
        });
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching products'
        });
    }
});

// Get bestseller products
router.get('/filter/bestsellers', async (req, res) => {
    try {
        const products = await Product.find({
            bestseller: true
        }).sort({ date: -1 });

        res.json({
            success: true,
            products
        });
    } catch (error) {
        console.error('Error fetching bestsellers:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching bestsellers'
        });
    }
});

export default router;
