import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import session from "express-session";
// import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import rootRouter from "./routers/rootRouter";

const app = express();

app.use(helmet());
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "Hello", //나중에는 정말 secret으로 아무도 모르는 문자열을 넣을 것이다.
    resave: true,
    saveUninitialized: true,
  })
);
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
