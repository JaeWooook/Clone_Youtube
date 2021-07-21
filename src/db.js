import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/YourTube", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false, //이런식으로 false로 설정을 추가해주면된다.
});

const db = mongoose.connection;

const handleOpen = () => console.log(" ✅ Connected to DB");
const handleError = () => console.log(" ❌ DB Error", error);
db.on("error", handleError);
db.once("open", handleOpen);
