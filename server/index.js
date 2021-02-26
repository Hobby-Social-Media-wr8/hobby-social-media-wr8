require("dotenv").config();
const session = require("express-session");
const express = require("express");
const massive = require("massive");
const profCtrl = require("./Controllers/profileController");
const socket = require('socket.io');
const authCtrl = require("./Controllers/authController"),
  ec= require('./controllers/eventsController')
  pc = require("./Controllers/postController");
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();
app.use(express.json());

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("db connected");
});

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
  })
);

//Listen for changes and connect to sockets
const io = socket(
  app.listen(SERVER_PORT, () => console.log(`running on port ${SERVER_PORT}`))
  
)

// AUTHENTICATION ENDPOINTS

app.post("/api/register", authCtrl.register);
app.post("/api/login", authCtrl.login);
app.get("/api/logout", authCtrl.logout);

// OTHER ENDPOINTS

app.get("/api/profile/:id", profCtrl.getUserProfile);
app.put("/api/profile/:id", profCtrl.editInfo);
// POST/BLOG ENDPOINTS
app.post("/api/post", pc.createPost);
app.delete('/api/post/:user_id', pc.deletePost)
app.get('/api/post/:user_id', pc.readPost);
app.get('/api/posts', pc.readPosts);

//Events Controllers
app.get('/api/events', ec.getCalEvents)
app.post('/api/event/:id', ec.addEvents)

//Sockets

io.on('connection', function (socket){
  socket.on('startChat', async function(data){
    console.log('start hit', data);
    const {chatRoomId, viewedUserId, id} = data;
    const db = app.get('db')
    let room = await db.chat.check_room({id: chatRoomId});
    room = room[0];
    if (!room) {
      db.chat.create_room({
        id: chatRoomId,
        user1: id,
        user2: viewedUserId
      });
      socket.join
    } else {
      const {room_id} = room;
      let messages = await db.chat.get_all_messages({room_id: room_id});
      socket.join(chatRoomId);
      io.to(chatRoomId).emit('startChat', messages);
    }
  });
  socket.on('sendMsg', async function (data){
    console.log(data);
    const {user1, message, room } = data;
    const db= app.get('db');
    let messages = await db.chat.create_message({
      room_id: room,
      message,
      sender_id: user1
    });
    console.log(messages);
    io.to(data.room).emit('sendMsg', messages);
  });
});