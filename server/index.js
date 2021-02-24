require("dotenv").config();
const session = require("express-session");
const express = require("express");
const massive = require("massive");
const profCtrl = require("./Controllers/profileController");
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
  app.listen(SERVER_PORT, () => console.log(`running on port ${SERVER_PORT}`));
});

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
  })
);

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