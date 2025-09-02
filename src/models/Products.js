import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description : {type: String},
    features: {type: [String]},
    warranty: {type: String},
    price: { type: Number, required: true}
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;