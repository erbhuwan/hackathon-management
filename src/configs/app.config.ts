export const AppConfig = {
  APP_NAME: "Ethoshack",
  APP_SHORT_NAME: "Ethoshack",
  APP_LOGO: "/logo.png",
  APP_LOGO_MIN: "/logo.png",
  APP_SUPPORT_EMAIL: "v1acharya34@gmail.com",
  APP_URL: import.meta.env.DEV ? "" : "https://ethoshack.vercel.app",
} as const;
