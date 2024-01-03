import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db, store } from "./firebase";

import imageCompression from "browser-image-compression";

async function compressImage(file: File) {
  const options = {
    maxSizeMB: 1, // 최대 파일 크기(MB)
    maxWidthOrHeight: 1000, // 최대 너비 또는 높이
    useWebWorker: true, // 성능 향상을 위해 Web Worker 사용
    fileType: "image/webp", // 파일 형식
  };

  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error("Error during image compression:", error);
    throw error;
  }
}
export async function uploadImage(file: File): Promise<string> {
  const storage = store;
  const compressedImage = await compressImage(file);
  const date = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const fileRef = ref(
    storage,
    `${date}/${compressedImage.name.split(".")[0]}.webp`
  );
  try {
    const snapshot = await uploadBytes(fileRef, compressedImage);
    const metadata = await getDownloadURL(snapshot.ref);
    return metadata;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
