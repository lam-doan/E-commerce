import Cart from '../models/Carts.js';
import CartItem from '../models/CartItems.js'

export const addItemToCart = async (req, res) => {
  try {
    const {product_id, quantity} = req.body;
    const user_id = req.user._id;
    if (!user_id || !product_id || typeof quantity !== 'number') {
      return res.status(400).json({message: 'Missing or invalid fields'});
    }

    // Find or create the cart
    let cart = await Cart.findOne({user_id});
    if (!cart) {
      cart = await Cart.create({user_id});
    }

    // Add or update cart item
    await CartItem.findOneAndUpdate(
      {cart_id: cart._id, product_id},
      {
        $inc: {quantity},
        $setOnInsert: { cart_id: cart._id, product_id }
      },
      {upsert: true, new: true}
    );
    
    console.log('Incoming cart add:', { user_id, product_id, quantity });
    const updatedCart = await CartItem.find({cart_id: cart._id}).populate('product_id', 'name price image');
    res.status(200).json({ message: 'Item added', cart: updatedCart});
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({message: error.message});
  }
};

export const deleteItemFromCart = async (req, res) => {
  try {
    const {product_id} = req.params;
    const user_id = req.user._id;

    // Find the user's cart first
    const cart = await Cart.findOne({user_id});
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    // Find the item and delete it
    const deletedItem = await CartItem.findOneAndDelete({
      cart_id: cart._id,
      product_id
    });

    if (!deletedItem) {
      return res.status(404).json({message: 'Item not found in cart'});
    }

    res.status(200).json({message: 'Item removed from cart'});
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.user._id });
    if (!cart) {
      return res.json({items: []});
    }

    const cartItems = await CartItem.find({cart_id: cart._id})
      .populate('product_id', 'name price image');

    res.json({ items: cartItems });
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ message: 'Failed to load cart' });
  }
};
