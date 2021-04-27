import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { router } from "./router";

const PORT = 8000
const server = express()

server.use(bodyParser.json())
server.use(cors())
server.use(router)

server.listen(PORT, () => {
  console.log("server listen port 8000")
})
