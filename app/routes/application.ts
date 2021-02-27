import express, { Request, Response } from "express";
import {validateJobApplication} from "../common/validator";
import {submitApplication} from "../services";
import queue from "../queue"

const queueInstance = queue()
export const applicationsRouter = express.Router();

function timeoutResponseSent(res: Response):boolean {
    return res.get("timeout-response-sent") == "true"
}

applicationsRouter.post("/sync", async (req: Request, res: Response) => {
    const validationResult = validateJobApplication(req.body, false)
    if (validationResult.error) {
        return res.status(400).json({
            status: false,
            message: "validation failed, refer to docs"
        })
    }

    try {
        const serviceResult = await submitApplication({
            data: validationResult.value,
            slowMo: 20,
            headless: false,
        })
        if (serviceResult.error && !timeoutResponseSent(res)) {
            return res.status(serviceResult.code).json({
                status: false,
                message: "request failed"
            })
        }

        if (!timeoutResponseSent(res)) {
            res.status(serviceResult.code).json({
                status: true,
                message: "application submitted sucessfully"
            })
        }
    
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "requested failed"
        })
    }
});

applicationsRouter.post("/async", async (req: Request, res: Response) => {
    const validationResult = validateJobApplication(req.body, true)
    if (validationResult.error) {
        return res.status(400).json({
            status: false,
            message: "validation failed, refer to docs"
        })
    }
    
    queueInstance.getApplicationQueue().createJob(req.body).save()

    if (!timeoutResponseSent(res)) {
        res.status(200).json({
            status: true,
            message: "application queued"
        })
    }
});
