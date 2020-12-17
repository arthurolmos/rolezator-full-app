const admin = require("firebase-admin");

const serviceAccount = require("../keys/admin-sdk-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rolezator-app.firebaseio.com",
});
