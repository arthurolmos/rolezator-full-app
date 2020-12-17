const fs = require("fs");
const csv = require("fast-csv");
const functions = require("firebase-functions");

module.exports = {
  // createSuggestionsFromCsv: async (req, res) => {
  //   console.log("FILE", req.file);

  //   const rows = [];

  //   fs.createReadStream(req.file.path)
  //     .pipe(csv.parse({ headers: true, delimiter: ";" }))
  //     .on("error", (error) => {
  //       return res.status(400).json({ error: error });
  //     })
  //     .on("data", (row) => {
  //       console.log(row);
  //       rows.push(row);
  //     })
  //     .on("end", (rowCount) => {
  //       console.log(`Parsed ${rowCount} rows`);
  //       console.log("ROWS", rows);

  //       return res.status(200).json({ rows: rows });
  //     });
  // },

  createSuggestionsFromCsv: (req, res) => {
    functions.logger.log("Hello from info. Here's an object:", req.body);
    functions.logger.log("Hello from info. Here's an object:", req.file);

    if (!req.file) return res.status(400).json({ result: false });

    return res.status(200).json({ result: req.file });
  },
};
