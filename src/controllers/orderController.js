import Order from '../models/Orders.js';
import Cart from '../models/Carts.js';
import CartItem from '../models/CartItems.js';


// convert cart to order
export const checkoutOrder = async (req, res) => {
    try {
        // Fetch user's cart
        const user_id = req.user._id;
        
        const cart = await Cart.findOne({user_id});
        if (!cart) throw new Error('Cart not found for this user');

        // Fetch cart items
        const cartItems = await CartItem.find({ cart_id: cart._id }).populate('product_id');
        if (cartItems.length === 0) throw new Error('Cart is empty');
    
        // Calculate total amount
        const total_amount = cartItems.reduce((sum, item) => {
            const price = item.product_id.price || 0;
            return sum + item.quantity * price;
        }, 0);


        // Create a new order (included order_id)
       const newOrder = new Order({
            user_id,
            total_amount,
            status: 'pending'
       });
       await newOrder.save();
       
       res.status(201).json({
        message: 'Order created successfully',
        order_id: newOrder._id
        });

    } catch (err) {
       res.status(400).json({ error: err.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const {order_id} = req.params;
        const {status} = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            order_id,
            {status: status},
            {new: true}
        );

        if (!updatedOrder) {
            res.status(404).json({message: 'Order not found'});
        }

        res.status(200).json({
            message: 'Order status updated',
            order: updatedOrder
        });

    } catch (error) {
        console.log('Error updating order status:', error);
        res.status(400).json({error: error.message});
    }
};