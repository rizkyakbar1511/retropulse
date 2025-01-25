"use server";

import { DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import getS3Client from "./s3Client";

export default async function getFileList() {
  const s3 = getS3Client();
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.S3_BUCKET_NAME,
    });
    const response = await s3.send(command);
    if (response.Contents) {
      console.log("Files in bucket:");
      response.Contents.forEach((file) => {
        console.log(file.Key); // Print the path (key) of each file
      });
    } else {
      console.log("No files found in the bucket.");
    }
  } catch (error) {
    console.log("🚀 ~ getFileList ~ error:", error);
  }
}

export async function deleteS3File(key: string) {
  const s3 = getS3Client();
  const params = {
    Bucket: process.env.S3_BUCKET_NAME, // The name of the bucket
    Key: key, // The file key (CID as the filename)
  };

  try {
    // Create the DeleteObjectCommand and execute it
    const command = new DeleteObjectCommand(params);
    const res = await s3.send(command);
    console.log("🚀 ~ deleteS3File ~ res:", res);
    console.log(`File has been deleted successfully.`);
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}
