import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { errorResponse } from '../utils/responseHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the dishImages directory exists
const uploadDir = path.join(__dirname, '..', 'dishImages');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log(`Created directory: ${uploadDir}`);
}

// Multer setup to handle image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define the destination folder for uploaded files (dishImages folder)
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Define how the uploaded file should be named
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = uniqueSuffix + path.basename(file.originalname);
        cb(null, filename);
        req.fileRelativePath = `dishImages/${filename}`;
    }
});

// File filter to ensure only image files are uploaded
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept file
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
    }
};
    
// Set up multer upload middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Max file size (5 MB in this case)
    fileFilter: fileFilter
});

export default upload;