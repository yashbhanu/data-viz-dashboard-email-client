import { Schema, model } from 'mongoose';

const FeatureDataSchema = new Schema({
    Day: {
        type: Date,
        required: true,
    },
    Age: {
        type: String,
        required: true,
    },
    Gender : {
        type: String,
        required: true,
    },
    A: {
        type: Number,
        required: true,
    },
    B: {
        type: Number,
        required: true,
    },
    C: {
        type: Number,
        required: true,
    },
    D: {
        type: Number,
        required: true,
    },
    E: {
        type: Number,
        required: true,
    },
    F: {
        type: Number,
        require: true,
    }
},
    {timestamps: true}
);

export default model("Feature", FeatureDataSchema);