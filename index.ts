import * as dotenv from "dotenv";
import server from "./app/server"
dotenv.config();

server.listen(process.env.PORT, () => {
  console.log(`⚡️[robo-application-server] -> running on port ${process.env.PORT}`);
});

