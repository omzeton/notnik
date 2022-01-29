import { Schema, model } from "mongoose";
import { RefreshToken } from "@server/types";

const refreshTokenSchema = new Schema<RefreshToken>({
    tokenID: {
        type: String,
        required: true,
    },
    userID: {
        type: Schema.Types.ObjectId,
        required: true,
    },
});

export default model<RefreshToken>("RefreshToken", refreshTokenSchema);
