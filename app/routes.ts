import express, { Request, Response } from "express";
import {validateJobApplication} from "./common/validator";
import {submitApplication} from "./services";

export const applicationRouter = express.Router();

applicationRouter.post("/", async (req: Request, res: Response) => {
    const validationResult = validateJobApplication(req.body)
    if (validationResult.error) {
        return res.status(400).json({
            status: false,
            message: "validation failed, refer to docs"
        })
    }

    const serviceResult = await submitApplication(validationResult.value)
    if (serviceResult.error) {
        return res.status(serviceResult.code).json({
            status: false,
            message: "request failed"
        })
    }

    res.status(serviceResult.code).json({
        status: true,
        message: "application submitted sucessfully"
    })
});