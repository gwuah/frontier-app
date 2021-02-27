import express from 'express';
import cors from "cors";
import {applicationsRouter} from "../app/routes/application"
import {homeRouter} from "../app/routes/home"

const app = express();
app.use(function(_, res, next){
    res.setTimeout(60000, function(){
        res.set("timeout-response-sent", "true")
        res.status(500).json({
            status: false,
            message: "server timed out."
        })
    });
    next();
});
app.use(express.json());
app.use(cors());

app.use("/", homeRouter);
app.use("/applications", applicationsRouter);

export default app