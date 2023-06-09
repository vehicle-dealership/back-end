"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adverts_schemas_1 = require("../schemas/adverts.schemas");
const adverts_controllers_1 = require("../controllers/adverts.controllers");
const ensureAdvertExists_middleware_1 = __importDefault(require("../middlewares/adverts/ensureAdvertExists.middleware"));
const ensureTokenIsValid_middleware_1 = __importDefault(require("../middlewares/jwt/ensureTokenIsValid.middleware"));
const ensureDataIsValid_middleware_1 = __importDefault(require("../middlewares/jwt/ensureDataIsValid.middleware"));
const checkAdvertOwnership_middleware_1 = __importDefault(require("../middlewares/adverts/checkAdvertOwnership.middleware"));
const advertsRoutes = (0, express_1.Router)();
advertsRoutes.get("", adverts_controllers_1.readAdvertsController);
advertsRoutes.get("/:id", adverts_controllers_1.readAdvertByIdController);
advertsRoutes.get("/user/:id", adverts_controllers_1.readAdvertByIdUserController);
advertsRoutes.use(ensureTokenIsValid_middleware_1.default);
advertsRoutes.post("", ensureTokenIsValid_middleware_1.default, (0, ensureDataIsValid_middleware_1.default)(adverts_schemas_1.advertSchemaRequest), adverts_controllers_1.createAdvertController);
advertsRoutes.patch("/:id", (0, ensureDataIsValid_middleware_1.default)(adverts_schemas_1.advertSchemaUpdate), ensureAdvertExists_middleware_1.default, checkAdvertOwnership_middleware_1.default, adverts_controllers_1.updateAdvertController);
advertsRoutes.delete("/:id", ensureAdvertExists_middleware_1.default, checkAdvertOwnership_middleware_1.default, adverts_controllers_1.deleteAdvertController);
exports.default = advertsRoutes;
