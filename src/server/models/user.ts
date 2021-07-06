import { Schema, model } from "mongoose";
import { Entry, User } from "../types";

const entrySchema = new Schema<Entry>({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
});

const userSchema = new Schema<User>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    entries: [entrySchema],
});

export default model<User>("User", userSchema);
