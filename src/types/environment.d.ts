declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;
            TOKEN_DEV: string;
            APP_ID: string;
            GUILD_DEV: string;
        }
    }
}

export {};
