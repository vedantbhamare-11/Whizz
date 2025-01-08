// controllers/cryptoController.js
import {decrypt} from '../helper/apiHelper.js'; 
import dotenv from "dotenv";
import { Vendor, Dish } from '../models/vendor.models.js';
import FormData from 'form-data';
import axios from 'axios';

dotenv.config();

const SECRET_KEY = Buffer.from([
    0xba, 0x8b, 0x2c, 0x68, 0xf5, 0x25, 0x81, 0x9b,
    0xde, 0xa4, 0xed, 0x6b, 0x7d, 0x0a, 0x8e, 0x0c,
    0x35, 0x25, 0x84, 0xe7, 0x9c, 0x06, 0x12, 0x11,
    0x0c, 0x13, 0x75, 0x92, 0x68, 0x12, 0x61, 0x05
  ]);


const submitOrder = async (req, res) => {
    try {
      // Extract the form data from the request
      const { restaurant_name, order_items , encryptedOrderId} = req.body;
      const decryptedOrderId = decrypt(encryptedOrderId,SECRET_KEY)
  
      // Prepare form data to forward
      const formData = new FormData();
      formData.append('incoming_number', decryptedOrderId);
      formData.append('restaurant_name', restaurant_name);
      formData.append('order_items', order_items);
  
      // Send the form data to the external server
      const response = await axios.post('http://localhost:7839/handleOrders', {
        incoming_number : decryptedOrderId,
        restaurant_name,
        order_items,
      });
  
      // Forward the response from the external server to the client
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error forwarding order data:', error.message);
      res.status(500).json({ error: 'Failed to process order' });
    }
  };

// Function to handle the decryption of vendor ID and order ID
function decryptVendorAndOrder(req, res) {
    const { encryptedVendorId, encryptedOrderId } = req.body;
    if (!encryptedVendorId || !encryptedOrderId) {
        return res.status(400).json({ error: 'Encrypted values are required' });
    }

    

    try {
        const decryptedVendorId = decrypt(encryptedVendorId,SECRET_KEY);
        const decryptedOrderId = decrypt(encryptedOrderId,SECRET_KEY);
        fetchVendorDishes(decryptedVendorId,res);
    } catch (error) {
        console.error('Decryption failed:', error);
        return res.status(500).json({ error: 'Decryption failed' });
    }
}

async function fetchVendorDishes(vendorId,res) {

    try {
        const result = await getVendorWithDishes(vendorId);

        if (!result.vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        res.status(200).json({
            vendor: result.vendor,
            dishes: result.dishes,
        });
    } catch (error) {
        console.error('Error fetching vendor dishes:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getVendorWithDishes(vendorId) {
    try {
        // Fetch vendor by ID
        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return { vendor: null, dishes: [] };
        }

        // Fetch dishes for the vendor
        const dishes = await Dish.find({ vendorId }).lean();

        return { vendor, dishes };
    } catch (error) {
        console.error('Error in vendorModule:', error.message);
        throw error;
    }
}

export {
    decryptVendorAndOrder,submitOrder
};