const multer = require('multer');
const path = require('path');

function pick(object, properties) {
    const result = {};
    for (const prop of properties) {
        if (object[prop] != undefined) {
            result[prop] = object[prop];
        }
    }
    return result;
}

function pickAllExcept(object, properties) {
    const result = {};
    for (const prop in object) {
        if (!properties.includes(prop)) {
            result[prop] = object[prop];
        }
    }
    return result;
}

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

//Multer Image Filter for image upload
const multerImageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

module.exports = { pick, pickAllExcept, multerStorage, multerImageFilter };
