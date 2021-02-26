require("dotenv").config()
import server from "./app/server"
import {applicationRouter} from "./app/routes"

server.use("/applications", applicationRouter);
server.listen(process.env.PORT, () => {
  console.log(`⚡️[robo-server] -> running on port ${process.env.PORT}`);
});