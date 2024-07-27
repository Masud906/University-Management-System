import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.prot, () => {
      console.log(`Example app listening on port ${config.prot}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
