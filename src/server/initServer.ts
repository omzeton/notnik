import path from "path";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import express, { Response, NextFunction, Request } from "express";

import router from "./routes";
import errorHandlerMiddleware from "./middleware/errorHandler";

const app = express();

const distPath = path.resolve(__dirname, "../../dist");

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(express.static(distPath));
app.use((req, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, Authorization");
    next();
});
app.use("/api", router);
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.json({
        key: "get result of /test endpoint",
    });
    next();
});
app.use(errorHandlerMiddleware);

export default app;
