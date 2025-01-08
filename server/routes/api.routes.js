import express from "express";
import {decryptVendorAndOrder,submitOrder} from '../controllers/api.controller.js'; 
import multer from 'multer';

const router = express.Router();

const app = express();
const upload = multer();

// POST route to decrypt vendor ID and order ID
router.post('/decrypt', decryptVendorAndOrder);
router.post('/submit', upload.none(), submitOrder);

export default router;