import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db, store } from "./firebase";
export async function uploadImage(file: File): Promise<string> {
  const storage = store;
  const fileRef = ref(storage, `images/${file.name}`);
  try {
    const snapshot = await uploadBytes(fileRef, file);
    const metadata = await getDownloadURL(snapshot.ref);
    return metadata;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
