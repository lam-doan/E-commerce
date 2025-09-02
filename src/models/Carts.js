import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    user_id: {type: String, ref: 'User', required: true}
}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;