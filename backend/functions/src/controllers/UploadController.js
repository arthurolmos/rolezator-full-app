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
          rows.push(row);
        })
        .on("end", (rowCount) => {
          functions.logger.log(`Parsed ${rowCount} rows`);

          fs.unlinkSync(upload);

          insertIntoFirebase(rows);

          res.status(200).json({ rows: rowCount });
        });
    });

    busboy.end(req.rawBody);
  },
};

function insertIntoFirebase(rows) {
  functions.logger.log("ROWS", rows);
  functions.logger.log("ROWS LENGTH", rows.length);

  rows.forEach((row) => {
    const categories = row.categories.replace(" ", "").split(",");
    const name = row.name;
    const places = row.places;
    const hasURL = places ? true : false;

    functions.logger.log(categories, name, places, hasURL);

    const data = {
      hasURL,
      name,
      categories,
      places,
    };

    db.collection("suggestions")
      .where("name", "==", name)
      .get()
      .then((snapshot) => {
        functions.logger.log(`HERE`, snapshot.docs.length);

        if (snapshot.docs.length === 0) {
          db.collection("suggestions")
            .add(data)
            .then(() => functions.logger.log("DATA INSERTED!", data))
            .catch((err) => functions.logger.log("ERROR INSERTING!", err));
        }
      });
  });
}
