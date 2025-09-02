import Product from './Products.js';

async function createProduct() {
    try {
        const newProduct = new Product({
            name:  'Sony WH-1000XM4',
            description: 'Wireless Noise Cancelling Headphones',
            feature: ['Noise Cancellation', '30-hour Battery Life', 'Touch Sensor Controls'],
            warranty: '2 years',
            price: 349.99
        });
        await newProduct.save();
        console.log('Product created successfully:', newProduct);
    }
    catch (error) {
        console.error('Error creating product:', error);
    }
}
createProduct();



