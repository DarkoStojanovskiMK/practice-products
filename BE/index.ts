import express from "express";
// import products from "./products.js";
import dotenv from "dotenv";
import connectDB from "./DB/index.ts";
import cors from "cors";
import Product from "./DB/models/products.ts";
import routes from "./routes.ts";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

// const corsOptions = {
//   origin: "http://localhost:5173",
//   credentials: true,
// };
app.use(cors({ origin: "*" }));
app.use(express.json());
// app.use(cors(corsOptions));

app.use("/", routes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});

export default app;
