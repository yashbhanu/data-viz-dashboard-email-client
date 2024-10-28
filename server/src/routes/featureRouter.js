import express from "express";

const featureRouter = express.Router();

featureRouter.route('/').get(async (req, res) => {
    try {
        console.log("This is feature route");
    } catch (error) {
        res.status(500).json({
            message: error || "Bad Request. Please Try Again",
        });
    }
})


export default featureRouter;