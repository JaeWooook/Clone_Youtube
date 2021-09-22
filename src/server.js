import express from "express";
import morgan from "morgan";
// import helmet from "helmet";
// import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
// import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import rootRouter from "./routers/rootRouter";
import { localsMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true })); //이렇게 해주면 string을 받앗을때 다시 js의 것으로 바꿔준다.
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);
app.use(flash()); //이 flash가 session에 연결해서 사용자에게 메시지를 남긴다.
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads/"));
app.use(
  "/static",
  express.static("assets"),
  express.static("node_modules/@ffmpeg/core/dist")
);
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);

export default app;
