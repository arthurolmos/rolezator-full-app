const user = require("./user");
const suggestion = require("./suggestion");
const userSuggestion = require("./user-suggestion");
const userBlacklist = require("./user-blacklist");
const upload = require("./upload");
const auth = require("./auth");

module.exports = (app) => {
  app.use(user, suggestion, userSuggestion, userBlacklist, upload, auth);
};
