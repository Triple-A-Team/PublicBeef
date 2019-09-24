const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const path = require('path');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

var storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'public-beef', // The name of the folder in cloudinary
    allowedFormats: ['jpg', 'png'],
    filename: function(req, file, cb) {
        cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
    }
});

const uploadCloud = multer({ storage: storage });

/** 
 * Uploads an avatar file
 * 
 */
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) return cb(new Error('Please upload an image'))
        cb(undefined, true)
    }
})

class Resize {
    constructor(folder) {
        this.folder = folder;
    }

    async save(buffer) {
        const filename = Resize.filename();
        const filepath = this.filepath(filename);

        await sharp(buffer)
            .resize(300, 300, {
                fit: sharp.fit.inside,
                withoutEnlargement: true
            })
            .toFile(filepath);
        return filename;
    }

    static filename() {
        return `${uuidv4()}.png`;
    }

    filepath(filename) {
        return path.resolve(`${this.folder}/${filename}`)
    }
}

module.exports = { upload, Resize, uploadCloud };