import express from "express";
import FeatureData from "../models/FeatureData.js";

const featureRouter = express.Router();

featureRouter.route("/").post(async (req, res) => {
  try {
    const { startDate, endDate, gender, age } = req.body;
    console.log(req.body)
    if (!startDate || !endDate) {
      throw new Error("Please add Start date and End Date");
    }
    const endUpdatedDate = new Date(endDate)
    const filter = {
      Day: { $gte: new Date(startDate), $lt: endUpdatedDate.setDate(endUpdatedDate.getDate() + 1)},
      ...(age && { Age: age }),
      ...(gender && { Gender: gender }),
    };
    const results = await FeatureData.find(filter);
    res.status(200).json(results)
  } catch (error) {
    res.status(500).json({
      message: error.message || "Bad Request. Please Try Again",
    });
  }
});

export default featureRouter;
