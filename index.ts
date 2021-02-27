import * as dotenv from "dotenv";
import server from "./app/server"
import {applicationsRouter} from "./app/routes/application"
import {homeRouter} from "./app/routes/home"

dotenv.config();

server.use("/", homeRouter);
server.use("/applications", applicationsRouter);

server.listen(process.env.PORT, () => {
  console.log(`⚡️[robo-application-server] -> running on port ${process.env.PORT}`);
});

