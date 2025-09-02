import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    order_id: { type: String, ref: 'Order', required: true },
    product_id: { type: String, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, null: false}
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);
export default OrderItem;