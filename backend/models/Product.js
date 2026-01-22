import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: [{
        type: String, // Will store GridFS file IDs or URLs
        required: true
    }],
    category: {
        type: String,
        required: true,
        enum: ['Men', 'Women', 'Kids']
    },
    subCategory: {
        type: String,
        required: true,
        enum: ['Topwear', 'Bottomwear', 'Winterwear']
    },
    sizes: [{
        type: String,
        enum: ['S', 'M', 'L', 'XL', 'XXL']
    }],
    date: {
        type: Number,
        default: Date.now
    },
    bestseller: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    _id: false // We're using custom _id
});

// Index for faster queries
productSchema.index({ category: 1, subCategory: 1 });
productSchema.index({ bestseller: 1 });
productSchema.index({ date: -1 });

const Product = mongoose.model('Product', productSchema);

export default Product;
