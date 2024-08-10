/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_FIREBASE_API_KEY: string;
    readonly VITE_FIREBASE_AUTH_DOMAIN: string;
    readonly VITE_FIREBASE_PROJECT_ID: string;
    readonly VITE_FIREBASE_STORAGE_BUCKET: string;
    readonly VITE_FIREBASE_MESSAING_SENDER_ID: string;
    readonly VITE_FIREBASE_APP_ID: string;
    readonly VITE_WEBSOCKET_IO: string;
    readonly VITE_H_CAPTCHA_SITE_KEY: string;
    readonly VITE_H_CAPTCHA_SECRET_KEY: string;
    readonly VITE_NODE_ENV: string;
    readonly VITE_DOMAIN_ORIGIN: string;
    readonly VITE_LOCAL_DOMAIN: string;
}