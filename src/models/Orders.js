import mongoose from 'mongoose';

const orderScheme = new mongoose.Schema({
    user_id : {type: String, ref: 'User', required: true},
    total_amount: {type: Number, required: true, null: false},
    status: {
        type: String,
        required: true,
        enum: ['pending', 'shipped', 'delivered', 'cancelled']
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderScheme);
export default Order;