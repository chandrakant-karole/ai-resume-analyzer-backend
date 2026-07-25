import { Schema, model, Types } from "mongoose";

const analysisSchema = new Schema(
    {
        resume: {
            type: Schema.Types.ObjectId,
            ref: "Resume",
            required: true,
        },

        overallScore: {
            type: Number,
            required: true,
        },

        scores: {
            content: {
                type: Number,
                required: true,
            },

            skills: {
                type: Number,
                required: true,
            },

            experience: {
                type: Number,
                required: true,
            },

            formatting: {
                type: Number,
                required: true,
            },

            atsCompatibility: {
                type: Number,
                required: true,
            },
        },

        strengths: [
            {
                type: String,
            },
        ],

        weaknesses: [
            {
                type: String,
            },
        ],

        suggestions: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const Analysis = model("Analysis", analysisSchema);