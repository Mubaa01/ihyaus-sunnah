import app from "./app.js";
import connectDB from "./db.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 4000;

try {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.error("Server startup failed:", error.message);
  process.exit(1);
}

export default app;
