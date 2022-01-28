import { APIError } from "@server/types";

/* MODELS */
export interface Note {
    _id: string;
    body: string;
    date: number;
}
export interface ActiveNote {
    _id: string;
    body: string;
}
export interface User {
    _id: string;
    email: string;
}
export type ServerError = APIError;
export interface ErrorValidation {
    errors: Array<string>;
    errorTimeout: ReturnType<typeof setTimeout> | null;
}
export interface RegistrationPayload {
    email: string;
    password: string;
    repeatPassword: string;
}

/* STORE MODULES */
export interface NotesModuleState {
    activeNote: ActiveNote;
    userNotes: Array<Note>;
}
export interface UIModuleState {
    loginForm: boolean;
    isLoading: boolean;
    deletionModalIsActive: boolean;
}
export interface AuthModuleState {
    isLoggedIn: boolean;
    serverError: string;
    user: User;
}
export interface Store {
    notes: NotesModuleState;
    ui: UIModuleState;
    auth: AuthModuleState;
}
