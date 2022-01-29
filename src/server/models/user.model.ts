import { Schema, model } from "mongoose";
import { Entry, User } from "@server/types";

const entrySchema = new Schema<Entry>({
    body: {
        type: String,
        required: true,
    },
    date: {
        type: Number,
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
