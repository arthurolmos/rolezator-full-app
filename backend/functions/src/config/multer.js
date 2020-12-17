const path = require("path");
const multer = require("multer");
const functions = require("firebase-functions");

module.exports = {
  //   storage: multer.diskStorage({
  //     destination: function (req, file, cb) {
  //       functions.logger.log("MULTER");

  //       cb(null, path.resolve(__dirname, "..", "uploads"));
  //     },
  //     filename: function (req, file, cb) {
  //       functions.logger.log("MULTER FN");

  //       cb(null, file.fieldname + "-" + Date.now());
  //     },
  //   }),
  storage: multer.memoryStorage(),
  //   fileFiler: (req, file, cb) => {
  //     if (file.mimetype !== ".csv") cb(null, false);

  //     // To accept the file pass `true`, like so:
  //     cb(null, true);

  //     // You can always pass an error if something goes wrong:
  //     cb(new Error("I don't have a clue!"));
  //   },
};
