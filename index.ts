require("dotenv").config()
import server from "./app/server"
import {applicationsRouter} from "./app/routes"

server.use("/applications", applicationsRouter);
server.listen(process.env.PORT, () => {
  console.log(`⚡️[robo-server] -> running on port ${process.env.PORT}`);
});