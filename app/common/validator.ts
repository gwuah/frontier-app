import Joi from "joi"
import { JobApplication } from "./shared-interfaces";

const jobApplicationSchema = Joi.object<JobApplication>({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    phone: Joi.string().required(),
    location: Joi.string().required(),
    linkedin: Joi.string().required(),
    resume: Joi.string().required(),    
});

export function validateJobApplication(data:object):Joi.ValidationResult {
    return jobApplicationSchema.validate(data)
}