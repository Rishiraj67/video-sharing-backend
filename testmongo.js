import mongoose from "mongoose";

const uri =
  "mongodb+srv://raj67rishi_db_user:Rishiraj123@cluster-backend.xw48k4r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-backend";

try {
  const conn = await mongoose.connect(uri);
  console.log("CONNECTED!");
  console.log(conn.connection.host);
} catch (err) {
  console.error("ERROR:");
  console.error(err);
}