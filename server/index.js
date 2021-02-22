require("dotenv").config()
const session = require("express-session")
const express = require("express")
const massive = require("massive")
const authCtrl = require("./Controllers/authController")
// const profCtrl = require("./Controllers/profileController")
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env


const app = express()
app.use(express.json())

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("db connected");
  app.listen(SERVER_PORT, () => console.log(`running on port ${SERVER_PORT}`));
})

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
  })
)

// AUTHENTICATION ENDPOINTS

app.post('/api/register', authCtrl.register)
app.post('/api/login', authCtrl.login)
app.get('/api/logout', authCtrl.logout)

// OTHER ENDPOINTS


