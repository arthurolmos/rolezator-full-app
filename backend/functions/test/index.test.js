const test = require("firebase-functions-test")(
  {
    databaseURL: "https://rolezator-app.firebaseio.com",
    storageBucket: "my-project.appspot.com",
    projectId: "rolezator-app",
  },
  "../keys/admin-sdk-key.json"
);

const myFunctions = require("../index");
