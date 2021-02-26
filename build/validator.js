"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJobApplication = void 0;
const joi_1 = __importDefault(require("joi"));
const jobApplicationSchema = joi_1.default.object({
    firstname: joi_1.default.string().required(),
    lastname: joi_1.default.string().required(),
    phone: joi_1.default.string().required(),
    location: joi_1.default.string().required(),
    linkedin: joi_1.default.string().required(),
    resume: joi_1.default.string().required(),
});
function validateJobApplication(data) {
    return jobApplicationSchema.validate(data);
}
exports.validateJobApplication = validateJobApplication;
