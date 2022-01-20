import { ValidationError } from "express-validator";

export interface APIError extends Error {
    data?: ValidationError[];
    status?: number;
    statusCode?: number;
    code?: number;
    msg?: string;
    response?: {
        headers: { [key: string]: string };
        body: string;
        data?: { message: string };
    };
}

export type multerCallback = (error: Error | null, result: boolean) => void;

export interface Entry {
    body: string;
    date: number;
    _id?: number;
}

export interface User {
    email: string;
    password: string;
    entries: Array<Entry>;
}
