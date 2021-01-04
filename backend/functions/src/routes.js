const routes = require("express").Router();
const upload = require("./middleware/upload");

const AuthController = require("./controllers/AuthController");
const SuggestionController = require("./controllers/SuggestionController");
const UserSuggestionController = require("./controllers/UserSuggestionController");
const BlacklistController = require("./controllers/BlacklistController");
const CategoryController = require("./controllers/CategoryController");
const UploadController = require("./controllers/UploadController");

routes.get("/auth", AuthController.addAdminStatus);
routes.post("/auth/:uid", AuthController.removeAdminStatus);

routes.get("/categories", CategoryController.index);

routes.get("/suggestions", SuggestionController.index);
routes.get("/suggestions/:_id", SuggestionController.findById);
routes.post("/suggestions", SuggestionController.create);
routes.post("/suggestions/deleteMany", SuggestionController.destroyMany);
routes.put("/suggestions/:_id", SuggestionController.update);
routes.delete("/suggestions/all", SuggestionController.destroyAll);
routes.delete("/suggestions/:_id", SuggestionController.destroy);

routes.post(
  "/suggestions/upload",
  // upload,
  UploadController.createSuggestionsFromCsv
);

routes.get("/users/:uid/suggestions", UserSuggestionController.index);
routes.post("/users/:uid/suggestions", UserSuggestionController.create);
routes.put("/users/:uid/suggestions/:_id", UserSuggestionController.update);
routes.delete(
  "/users/:uid/suggestions/all",
  UserSuggestionController.destroyAll
);
routes.delete("/users/:uid/suggestions/:_id", UserSuggestionController.destroy);

routes.get("/users/:uid/blacklist", BlacklistController.index);
routes.post("/users/:uid/blacklist", BlacklistController.create);
routes.put("/users/:uid/blacklist/:_id", BlacklistController.update);
routes.delete("/users/:uid/blacklist/all", BlacklistController.destroyAll);
routes.delete("/users/:uid/blacklist/:_id", BlacklistController.destroy);

module.exports = routes;
