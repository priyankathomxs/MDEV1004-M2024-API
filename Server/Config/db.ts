import dotenv from "dotenv";
dotenv.config();

let remoteUri = process.env.MONGO_URI as string;
let secret = process.env.APP_SECRET as string;

export default {
  remoteUri: remoteUri,
  secret: secret,
};
