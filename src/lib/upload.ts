export async function presignS3Url(fileName: string, fileType: string) {
  try {
    const response = await fetch("/api/upload/presigned-url", {
      method: "POST",
      body: JSON.stringify({ fileName, fileType }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function uploadToS3(file: File, fileName: string) {
  try {
    const { signedUrl } = await presignS3Url(fileName, file.type);
    const response = await fetch(signedUrl, {
      headers: {
        "Content-Type": file.type,
      },
      method: "PUT",
      body: file,
    });
    return response;
  } catch (error) {
    console.log("🚀 ~ uploadToS3 ~ error:", error);
    throw error;
  }
}
