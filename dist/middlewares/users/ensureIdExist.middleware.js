"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../data-source");
const users_entity_1 = require("../../entities/users.entity");
const errors_1 = require("../../errors");
const ensureUserExistsMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.id) {
        const userRepository = data_source_1.AppDataSource.getRepository(users_entity_1.User);
        const findIdUser = yield userRepository.findOne({
            where: {
                id: parseInt(req.params.id),
            },
        });
        if (!findIdUser) {
            throw new errors_1.AppError("Usuário não encontrado", 404);
        }
        return next();
    }
    return next();
});
exports.default = ensureUserExistsMiddleware;
