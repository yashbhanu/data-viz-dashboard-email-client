import mongoose from "mongoose";
import { connectToMongo } from "./dbConn";
import fs from 'fs';
import csv from 'csv-parser';
import FeatureData from "./models/FeatureData";
import path from "path";

(async () => {
    try {
        //connect to DB
        await connectToMongo();
        const filePath = path.resolve(process.cwd(), 'AssignmentDataSheet.csv');
        const records = [];

        // load the csv data
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (row) => {
            // transform the data
            const [day, month, year] = row["Day"].split('/');
            const date = new Date(year, month - 1, day);
            const data = {
              ...row,
              Day : date,
              A: +row["A"],
              B: +row["B"],
              C: +row["C"],
              D: +row["D"],
              E: +row["E"],
              F: +row["F"],
            }
            records.push(data);
          })
          .on('end', async () => {
            //insert data into the DB
            if (records.length > 0) {
              await FeatureData.insertMany(records); 
              console.log(`${records.length} records were inserted into Db collection.`);
            } else {
              console.log("No records found in CSV.");
            }
            await mongoose.disconnect();
          });
    } catch (error) {
        console.log('error', error); 
    }
})()