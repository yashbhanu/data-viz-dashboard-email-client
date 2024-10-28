import express from "express";

const userRouter = express.Router();

userRouter.route("/signup").post(async (req, res) => {
  try {
    console.log("signup");
  } catch (error) {
    res.status(500).json({
      message: error.message || "Bad Request. Please Try Again",
    });
  }
});

userRouter.route("/signin").post(async (req, res) => {
  try {
    console.log("signin");
  } catch (error) {
    res.status(500).json({
      message: error.message || "Bad Request. Please Try Again",
    });
  }
});

export default userRouter;
