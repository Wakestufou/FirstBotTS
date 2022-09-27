declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;
            APP_ID: string;
        }
    }
}

export {};
