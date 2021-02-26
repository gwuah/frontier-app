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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationRouter = void 0;
const express_1 = __importDefault(require("express"));
const validator_1 = require("./validator");
const services_1 = require("./services");
exports.applicationRouter = express_1.default.Router();
exports.applicationRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validationResult = validator_1.validateJobApplication(req.body);
    if (validationResult.error) {
        return res.status(400).json({
            status: false,
            message: "validation failed, refer to docs"
        });
    }
    const serviceResult = services_1.submitApplication(validationResult.value);
    if (serviceResult.error) {
        return res.status(serviceResult.code).json({
            status: false,
            message: "request failed"
        });
    }
    res.status(serviceResult.code).json({
        status: true,
        message: "application submitted sucessfully"
    });
}));
