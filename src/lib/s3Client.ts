import { S3Client } from "@aws-sdk/client-s3";

function s3ClientSingleton(): S3Client {
  return new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true,
  });
}

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
declare const globalThis: {
  s3ClientGlobal: ReturnType<typeof s3ClientSingleton>;
} & typeof global;

const s3Client = globalThis.s3ClientGlobal ?? s3ClientSingleton();

export default s3Client;
