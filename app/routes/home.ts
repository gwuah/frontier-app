import express , { Request, Response }from "express";
export const homeRouter = express.Router();

homeRouter.post("/callback", (req: Request, res: Response) => {
    console.log(req.body)
    res.status(200).json({
        status: true,
        message: "recieved"
    })
});