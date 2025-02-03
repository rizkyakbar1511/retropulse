"use server";

import { DeleteObjectCommand, HeadObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import s3Client from "@/lib/s3Client";

export default async function getS3ObjectByCID(cid: string) {
  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: process.env.S3_BUCKET_NAME,
    });
    const listResponse = await s3Client.send(listCommand);
    if (listResponse.Contents) {
      const matchingObject = listResponse.Contents.map(async (obj) => {
        const headParams = {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: obj.Key,
        };
        const headCommand = new HeadObjectCommand(headParams);
        const headResponse = await s3Client.send(headCommand);
        const match = headResponse.Metadata?.cid.includes(cid);
        return match ? obj : null;
      });

      //NOTE: it's important to implement promise.all method because we map over s3 Contents Objects and turn map callback into promise and filter out the null values
      const result = (await Promise.all(matchingObject)).filter(Boolean);
      return result[0]?.Key;
    } else {
      console.log("No files found in the bucket.");
    }
  } catch (error) {
    console.log("🚀 ~ getFileList ~ error:", error);
    throw error;
  }
}

export async function deleteS3File(cid: string) {
  try {
    const Key = await getS3ObjectByCID(cid);
    const params = {
      Bucket: process.env.S3_BUCKET_NAME, // The name of the bucket
      Key, // The file key (CID as the filename)
    };
    const command = new DeleteObjectCommand(params);
    const res = await s3Client.send(command);
    console.log("🚀 ~ deleteS3File ~ res:", res);
    console.log(`File has been deleted successfully.`);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
}
