import express from "express";
import dotenv from "dotenv";
dotenv.config(); 
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import cookieParser from "cookie-parser";
import connectDB from "./confing/conn.js"; 
import userRoute from "./routes/user.routes.js";
import courseRoute from "./routes/course.routes.js";
import courseProgressRoute from "./routes/courseProgress.routes.js";

import "./confing/passport.js"; // passport config


// DB Connection
connectDB();

const app = express();

/* MIDDLEWARES */

app.use(express.json());
app.use(cookieParser());

 // CORS CONFIG
app.use(
  cors({
    origin: "http://localhost:5173", //frontend URL
    credentials: true
  })
);

/* SESSION CONFIG */

app.use(
  session({
    name: "lms-session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.URL
    }),
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);

/* PASSPORT MIDDLEWARE */

app.use(passport.initialize());
app.use(passport.session());

/* ROUTES */

/* app.get("/", (req, res) => {
  res.send("Server & Database connected successfully 🚀");
}); */

app.use("/api/v1/users", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/progress", courseProgressRoute);


/* SERVER LISTENING */

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
