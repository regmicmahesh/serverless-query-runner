import "dotenv/config";
import app from "./app";
import { getEnv } from "./utils";

const port = getEnv("PORT");

app.listen(port, () => {
  console.log(`🚀 on ${port}.`);
});
