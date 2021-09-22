import "regenerator-runtime";
import "dotenv/config";
import app from "./server";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";

const PORT = process.env.PORT || 4000;
//test
const handleListening = () =>
  console.log(` ✅ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
