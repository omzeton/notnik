declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
            TOKEN_SECRET: string;
            MONGO_USER: string;
            MONGO_PASSWORD: string;
            MONGO_DATABASE: string;
            NODE_ENV: string;
        }
    }
}

export {};
