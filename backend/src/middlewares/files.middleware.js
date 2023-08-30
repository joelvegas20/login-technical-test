// Third Party Imports.
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

// Base directory for profilePictures.
const DIR = './src/profileTemps';

/**
 * @function storage
 * @description Storage for profilePictures.
 * @param {Object} req - Request object.
 * @param {Object} file - File object.
 * @param {Function} cb - Callback function.
 * @returns {Function} Callback function.
 */
const storage = multer.diskStorage({
    // Set destination.
    destination: (req, file, cb) => {
        // Create username folder if it doesn't exist.
        const fs = require('fs');
        // Get username from email. 
        const username = req.body.email.split('@')[0];
        // Create path.
        const path = DIR + '/' + username;
        // If the folder doesn't exist, create it.
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
        cb(null, path);
    },
    // Set filename.
    filename: (req, file, cb) => {
        // Create filename.
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

/**
 * @function upload
 * @description Upload profilePictures.
 * @param {Object} storage - Storage object.
 * @param {Object} fileFilter - File filter object.
 * @returns {Function} Multer function.
 */
const upload = multer({
    // Set storage.
    storage: storage,
    // Set file filter.
    fileFilter: (req, file, cb) => {
        // Check if file is an image.
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } // If file is not an image, return error.
        else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// Exports.
module.exports = upload;
