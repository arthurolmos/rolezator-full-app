const Busboy = require("busboy");
const os = require("os");
const fs = require("fs");
const path = require("path");
const functions = require("firebase-functions");

module.exports = (req, res, next) => {
  const busboy = new Busboy({
    headers: req.headers,
  });

  const fields = {};
  const files = [];
  const fileWrites = [];
  //   // Note: os.tmpdir() points to an in-memory file system on GCF
  //   // Thus, any files in it must fit in the instance's memory.
  const tmpdir = os.tmpdir();

  functions.logger.log("IM HERE");

  //   busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
  //     functions.logger.log("FILE", filename);
  //     next();
  //   });

  busboy.on("finish", async () => {
    functions.logger.log("FILE", filename);
    await next();
  });

  //   busboy.on("finish", () => {
  //     try {
  //       next();
  //     } catch (error) {
  //       functions.logger.log("ERROR", error);

  //       next();
  //     }
  //   });

  //   busboy.end(req.rawBody);

  //   busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
  //     const filepath = path.join(tmpdir, filename);

  //     functions.logger.log(
  //       `Handling file upload field ${fieldname}: ${filename} (${filepath})`
  //     );
  //   });

  //   busboy.on("finish", () => next());
  //     const writeStream = fs.createWriteStream(filepath);
  //     file.pipe(writeStream);

  //     fileWrites.push(
  //       new Promise((resolve, reject) => {
  //         file.on("end", () => writeStream.end());
  //         writeStream.on("finish", () => {
  //           fs.readFile(filepath, (err, buffer) => {
  //             const size = Buffer.byteLength(buffer);
  //             console.log(`${filename} is ${size} bytes`);
  //             if (err) {
  //               return reject(err);
  //             }

  //             files.push({
  //               fieldname,
  //               originalname: filename,
  //               encoding,
  //               mimetype,
  //               buffer,
  //               size,
  //             });

  //             try {
  //               fs.unlinkSync(filepath);
  //             } catch (error) {
  //               return reject(error);
  //             }

  //             resolve();
  //           });
  //         });
  //         writeStream.on("error", reject);
  //       })
  //     );
  //   });

  //   busboy.on("finish", () => {
  //     Promise.all(fileWrites)
  //       .then(() => {
  //         req.body = fields;
  //         req.files = files;
  //         next();
  //       })
  //       .catch(next);
  //   });

  //   busboy.on("finish", () => {
  //     req.body = fields;
  //     req.files = files;
  //     next();
  //   });

  // busboy.end(req.rawBody);
};
