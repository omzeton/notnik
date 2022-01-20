import { APIError } from "../../server/types";

export interface Note {
    _id: string;
    body: string;
    date: number;
}
export interface NotesModuleState {
    activeNoteId: string;
    notes: Array<Note>;
}

export interface UIModuleState {
    loginForm: boolean;
    isLoading: boolean;
    loadingMessage: string;
    settingsModal: boolean;
    markdownMode: boolean;
    notificationIsVisible: boolean;
}

export interface AuthModuleState {
    isAuthenticated: boolean;
    serverError: string;
}

export interface Store {
    notes: NotesModuleState;
    ui: UIModuleState;
    auth: AuthModuleState;
}

export type ServerError = APIError;

export interface Validation {
    email: string;
    password: string;
    repeatPassword: string;
}
