import express from "express";
import FeatureData from "../models/FeatureData.js";

const featureRouter = express.Router();

featureRouter.route("/").post(async (req, res) => {
  try {
    const { startDate, endDate, gender, age } = req.body;
    if (!startDate || !endDate) {
      throw new Error("Please add Start date and End Date");
    }
    const startUpdatedDate = new Date(startDate)
    const endUpdatedDate = new Date(endDate)
    const filter = {
      Day: { $gte: startUpdatedDate.setDate(startUpdatedDate.getDate() + 1), $lt: endUpdatedDate.setDate(endUpdatedDate.getDate() + 2)},
      ...(age && { Age: age }),
      ...(gender && { Gender: gender }),
    };
    const results = await FeatureData.find(filter).sort({Day : 1});
    res.status(200).json(results)
  } catch (error) {
    res.status(500).json({
      message: error.message || "Bad Request. Please Try Again",
    });
  }
});

export default featureRouter;
