const functions = require("firebase-functions");
const admin = require("firebase-admin");

const serviceAccount = require("./keys/admin-sdk-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rolezator-app.firebaseio.com",
});

const app = require("express")();
const cors = require("cors");
const routes = require("./src/routes");

app.use(cors({ origin: true }));
app.use(routes);

exports.api = functions.https.onRequest(app);
