import Joi from "joi"
import { AsyncJobApplication, JobApplication } from "./shared-interfaces";

const baseSchema = {
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),    
    location: Joi.string().required(),
    linkedin: Joi.string().required(),
    resume: Joi.string().required(),
}

const syncJobApplicationSchema = Joi.object<JobApplication>(baseSchema);

const asyncJobApplicationSchema = Joi.object<AsyncJobApplication>({
    ...baseSchema,
    callback_url: Joi.string().required(),
})

export function validateJobApplication(data:object, async:boolean):Joi.ValidationResult {
    if (async) return asyncJobApplicationSchema.validate(data)
    return syncJobApplicationSchema.validate(data)
}