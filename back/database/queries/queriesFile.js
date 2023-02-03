const uploadFile = require("../../middlewares/upload");
const path=require("path");


//Todo Isa
const upload = async (req, res) => {
  try {
    await uploadFile(req, res);
  } catch (err) {
    throw err;
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/../../resources/static/assets/uploads/";
  const fs = require("fs");

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      throw err;
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        // url: baseUrl + file,
      });
    });
    return fileInfos;
  });
};

const download = (nombre, res) => {
  const fileName =nombre;
  console.log(fileName);
  const directoryPath = __basedir + "../../resources/static/assets/uploads/";
  console.log(directoryPath);
  const file = path.resolve(directoryPath, fileName);
  console.log(file);
  console.log(res.download(file));
};

module.exports = {
  upload,
  getListFiles,
  download,
};