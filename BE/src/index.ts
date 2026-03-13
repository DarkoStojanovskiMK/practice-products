import express from "express";
// import products from "./products.js";
import dotenv from "dotenv";
import { connectDB } from "./DB/helpers.js";
import cors from "cors";
import routes from "./routes.js";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : "https://practice-products.onrender.com", // or '*' for testing
    credentials: true,
  }),
);

app.use(express.json());
// app.use(cors(corsOptions));

app.use("/", routes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});

export default app;
