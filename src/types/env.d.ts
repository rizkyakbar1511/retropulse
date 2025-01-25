declare namespace NodeJS {
  interface ProcessEnv {
    WEBSITE_URL: string;
    NODE_ENV: "development" | "production" | "test"; // Node environment
    AUTH_SECRET: string;
    S3_ENDPOINT: string;
    S3_BUCKET_NAME: string;
    S3_SECRET_ACCESS_KEY: string;
    S3_ACCESS_KEY_ID: string;
    S3_REGION: string;
    S3_API_VERSION: string;
  }
}
