import { NextFunction, Request, Response } from "express";

import { APIError } from "@server/types";

const NODE_ENVIRONMENT = process.env["NODE_ENV"] || "development";

const errorHandlerMiddleware = (error: APIError, request: Request, response: Response, next: NextFunction) => {
    const errorMessage = getErrorMessage(error);
    logErrorMessage(errorMessage);

    if (response.headersSent) {
        return next(error);
    }

    const errorResponse = {
        statusCode: getHttpStatusCode({ error, response }),
        body: NODE_ENVIRONMENT === "production" ? undefined : errorMessage,
    };

    response.status(errorResponse.statusCode);
    response.format({
        "application/json"() {
            response.json({ message: errorResponse.body });
        },
        default() {
            response.type("text/plain").send(errorResponse.body);
        },
    });

    next();
};

function getErrorMessage(error: APIError) {
    if (error.stack) {
        return error.stack;
    }

    if (typeof error.toString === "function") {
        return error.toString();
    }

    return "";
}

function logErrorMessage(error: string) {
    console.error(error);
}

function isErrorStatusCode(statusCode: number) {
    return statusCode >= 400 && statusCode < 600;
}

function getHttpStatusCode({ error, response }: { error: APIError; response: Response }): number {
    if (!error.status || !error.statusCode) {
        return 500;
    }

    const statusCodeFromError = error.status || error.statusCode;
    if (isErrorStatusCode(statusCodeFromError)) {
        return statusCodeFromError;
    }

    const statusCodeFromResponse = response.statusCode;
    if (isErrorStatusCode(statusCodeFromResponse)) {
        return statusCodeFromResponse;
    }

    return 500;
}

export default errorHandlerMiddleware;
