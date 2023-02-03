const util = require("util");
const multer = require("multer");
const { extname } = require("path");
const maxSize = 2 * 1024 * 1024;
console.log(__basedir);

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/../resources/static/assets/uploads/");
    },
    filename: (req, file, cb) => {
        const fileExtension = extname(file.originalname);
        const fileName = file.originalname.split(fileExtension)[0];
        cb(null, `${fileName}${Date.now()}${fileExtension}`);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;