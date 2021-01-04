const Busboy = require("busboy");
const os = require("os");
const fs = require("fs");
const path = require("path");
const functions = require("firebase-functions");
const csv = require("fast-csv");
const admin = require("firebase-admin");

const db = admin.firestore();

module.exports = {
  createSuggestionsFromCsv: async (req, res) => {
    const busboy = new Busboy({ headers: req.headers });

    let upload;

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      functions.logger.log(
        `File [${fieldname}] filename: ${filename}, encoding: ${encoding}, mimetype: ${mimetype}`
      );
      const filepath = path.join(os.tmpdir(), fieldname);

      upload = filepath;

      file.pipe(fs.createWriteStream(filepath));
    });

    // This callback will be invoked after all uploaded files are saved.
    busboy.on("finish", () => {
      const rows = [];

      const readStream = fs.createReadStream(upload);

      readStream
        .pipe(csv.parse({ headers: true, delimiter: ";" }))
        .on("error", (error) => {
          res.write(error);
          res.end();
        })
        .on("data", (row) => {
          functions.logger.log(row);

          const data = {
            id: row.name,
            ...row,
          };

          rows.push(data);
        })
        .on("end", (rowCount) => {
          functions.logger.log(`Parsed ${rowCount} rows`);
          functions.logger.log("ROWS", rows);

          let batch = db.batch();

          fs.unlinkSync(upload);

          res.status(200).json({ rows: rows });
        });
    });

    busboy.end(req.rawBody);
  },
};
