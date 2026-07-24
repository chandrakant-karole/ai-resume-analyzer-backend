import { Schema, model, Types } from "mongoose";

export interface IResume {
    user: Types.ObjectId;
    originalFileName: string;
    storedFileName: string;
    filePath: string;
    extractedText: string;
}

const resumeSchema = new Schema<IResume>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        originalFileName: {
            type: String,
            required: true,
            trim: true,
        },

        storedFileName: {
            type: String,
            required: true,
        },

        filePath: {
            type: String,
            required: true,
        },

        extractedText: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Resume = model<IResume>("Resume", resumeSchema);