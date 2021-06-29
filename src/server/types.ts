import { Request } from "express";
import { ValidationError } from "express-validator";
import mongoose from "mongoose";

export interface APIError extends Error {
    data?: ValidationError[];
    status?: number;
    statusCode?: number;
    code?: number;
    msg?: string;
    response?: {
        headers: { [key: string]: string };
        body: string;
    };
}

export type multerCallback = (error: Error | null, result: boolean) => void;

export interface EntryData {
    title: string;
    body: string;
    date: string;
    imgUrl: string;
    uId: mongoose.Schema;
}

export interface WithUserIDRequest extends Request {
    userId: string;
}
