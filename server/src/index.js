import express from "express";
import featureRouter from "./routes/featureRouter.js";
import dotenv from "dotenv";
import cors from "cors"
import { connectToMongo } from "./dbConn.js";
import userRouter from "./routes/userRouter.js";
import { authorize } from "./middleware/authenticate.js";
const app = express();
const port = 4000;

dotenv.config();

const allowedOrigins = ["http://localhost:3000", "https://data-viz-dashboard-roc8.vercel.app"];
const options = {
  origin: allowedOrigins,
};

connectToMongo()
  .then(() => {
    app.use(cors(options));
    app.use(express.json());
    app.use("/api/feature", authorize, featureRouter);
    app.use("/api/auth", userRouter);
    app.get("/", (req, res) => {
      res.send("Welcome to Data Viz Dashboard!");
    });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
