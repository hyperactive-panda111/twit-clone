import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import {v4 as uuidv4} from 'uuid';

const dev = process.env.NODE_ENV !== "production";

// Parse command line arguments that Firebase Studio passes
const args = process.argv.slice(2);
let hostname = "0.0.0.0";
let port = process.env.PORT || 3000;

// Parse --port and --hostname arguments
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--port' && args[i + 1]) {
    port = parseInt(args[i + 1]);
  }
  if (args[i] === '--hostname' && args[i + 1]) {
    hostname = args[i + 1];
  }
}

console.log(`Configured to run on ${hostname}:${port}`);

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let onlineUsers = [];

const addUser = (username, socketId) => {
  const isExist = onlineUsers.find((user) => user.socketId === socketId);
  if (!isExist) {
    onlineUsers.push({ username, socketId });
    console.log(username + ' added!');
  };
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
  console.log('user removed!');
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
}

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.on('newUser', (username) => {
      addUser(username, socket);
    });

    socket.on('sendNotification', ({ receiverUsername, data}) => {
      const receiver = getUser(receiverUsername);
      if (receiver) {
        console.log('receiver found')
        io.to(receiver.socketId).emit('getNotification', 
          {
            id: uuidv4(),
            ...data,
          });

      }
    })

    socket.on('disconnect', () => {
      removeUser(socket.id);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, hostname, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});