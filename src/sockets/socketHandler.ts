import User from "../db/schemas/user";
import Logger from "../logger/logger";
import { verifyAccessToken } from "../utils";
import { Server, Socket } from "socket.io";
import { IUser, Maybe } from "../types";
interface SocketProperties {
  userId: string;
  firebaseToken: Maybe<string>;
}
interface InitialSocket extends Partial<SocketProperties>, Socket {}

const socketHandler = (io: Server) => {
  io.use(async (socket: InitialSocket, next) => {
    const isAuthenticated = verifyAccessToken(socket.handshake.auth?.token);
    if (!isAuthenticated) return next(new Error("not authorized"));
    const userId = isAuthenticated.userId;
    if (isAuthenticated && userId) {
      const { firebaseToken = null } = socket.handshake.auth;
      socket["userId"] = userId;
      socket["firebaseToken"] = firebaseToken;
      return next();
    }
    next(new Error("not authorized"));
  });

  io.on("connection", async (socket: InitialSocket) => {
    try {
      const payload: Partial<IUser> = {
        isActive: true,
        socketId: socket.id,
      };
      if (socket.firebaseToken) {
        payload.firebaseToken = socket.firebaseToken;
      }

      await User.findOneAndUpdate({ _id: socket.userId }, payload);
      io.emit("socketConnected", { user: socket.userId });
    } catch ({ message }) {
      Logger.error(message);
    }

    socket.on("disconnect", async () => {
      try {
        const lastConnected = new Date();
        await User.findOneAndUpdate(
          { _id: socket.userId },
          { isActive: false, lastConnected }
        );
        io.emit("socketDisconnected", {
          user: socket.userId,
          lastConnected,
        });
      } catch ({ message }) {
        Logger.error(message);
      }
    });

    socket.on("leftChat", async ({ chatId }) => {
      if (!chatId) return; //TODO error response
      socket.leave(chatId);
    });

    // socket.on("joinedChat", async ({ chatId, participants }) => {
    //   if (!chatId) return; //TODO error response
    //   socket.join(chatId);
    //   await seen(chatId, socket, participants);
    // });

    // socket.on("seen", async ({ chatId, participants }) => {
    //   if (!chatId) return; //TODO error response
    //   await seen(chatId, socket, participants);
    // });
  });
};

// const seen = async (chatId, socket, participants) => {
//   try {
//     // await Message.updateMany(
//     //   { chatId },
//     //   { $addToSet: { seenBy: socket.userId } }
//     // );
//     socket.to(participants).emit("seen", { userId: socket.userId, chatId });
//   } catch (e) {
//     Logger.error(e);
//   }
// };

export default socketHandler;
