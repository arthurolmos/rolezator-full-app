const { functions } = require("./src/config/initialize-firebase");
const app = require("./src/config/app");
const { addDeleteListener } = require("./src/functions");

const listeners = addDeleteListener(["/suggestions", "/users"]);

exports.api = functions.https.onRequest(app);
exports.listener = listeners;
