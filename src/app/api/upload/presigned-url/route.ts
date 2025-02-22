import s3Client from "@/lib/s3Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function POST(request: Request) {
  const { fileName, fileType } = await request.json();
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    ContentType: fileType,
  });

  try {
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return Response.json({ success: true, signedUrl }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false, error }, { status: 500 });
  }
}
