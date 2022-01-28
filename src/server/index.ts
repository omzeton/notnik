import mongoose from "mongoose";
import * as dotenv from "dotenv";

import app from "./initServer";

dotenv.config();

mongoose
    .connect(
        `mongodb+srv://${process.env["MONGO_USER"]}:${process.env["MONGO_PASSWORD"]}@cluster0-p7rod.mongodb.net/${process.env["MONGO_DATABASE"]}?retryWrites=true`,
        {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        const port = process.env["PORT"] || 2828;
        app.listen(port, () => console.log("\x1b[33m", `Listening on port ${port}`));
    })
    .catch(err => {
        console.log(err);
    });
