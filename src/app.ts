import helmet from "helmet";
import express from "express";
import routes from "./routes";
import connectToDb from "./db/connection";
import loggerMiddleWare from "./logger/morgan";
import http from "http";
import socketHandler from "./sockets/socketHandler";
import { notFound } from "./middelwares";
import { Server } from "socket.io";

// const { admin } = require("./src/utils/firebase.util");
connectToDb();
const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.json());
app.use(helmet());

app.use(loggerMiddleWare);
app.use("/api", routes);
socketHandler(io);
app.set("socketio", io);
app.use(notFound);
export default server;
