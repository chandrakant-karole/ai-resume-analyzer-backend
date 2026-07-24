import bcrypt from "bcrypt";
import { HydratedDocument, Model, Schema, model } from "mongoose";
import { IUser } from "../../types/user.types";

export interface IUserMethods {
    comparePassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;


const userSchema = new Schema<IUser, UserModel, IUserMethods>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
            select: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre(
    "save",
    async function (this: HydratedDocument<IUser, IUserMethods>) {
        if (!this.isModified("password")) {
            return;
        }

        this.password = await bcrypt.hash(this.password, 10);
    }
);

userSchema.method(
    "comparePassword",
    async function (
        this: HydratedDocument<IUser, IUserMethods>,
        password: string
    ) {
        return bcrypt.compare(password, this.password);
    }
);

export const User = model<IUser, UserModel>("User", userSchema);