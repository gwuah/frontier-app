import express from 'express';
import cors from "cors";

const app = express();
app.use(function(_, res, next){
    res.setTimeout(40000, function(){
        res.status(500).json({
            status: false,
            message: "server timed out."
        })
    });
    next();
});
app.use(express.json());
app.use(cors());

export default app