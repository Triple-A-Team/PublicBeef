const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const path = require('path');
const multer = require('multer')

/** 
 * Uploads an avatar file
 */
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        console.log('file filterrrrrr')
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

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

module.exports = { upload, Resize };