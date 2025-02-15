import axios, { type AxiosProgressEvent } from "axios";

async function presignS3Url(fileName: string, fileType: string) {
    const response = await fetch("/api/upload/presigned-url", {
      method: "POST",
      body: JSON.stringify({ fileName, fileType }),
    });
    const data = await response.json();
    return data;
}

export async function uploadToS3(
  file: File,
  fileName: string,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) {
  try {
    const { signedUrl } = await presignS3Url(fileName, file.type);
    const response = await axios.put(signedUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
      onUploadProgress,
    });
    return response;
  } catch (error) {
    console.log("🚀 ~ uploadToS3 ~ error:", error);
    throw error;
  }
}
