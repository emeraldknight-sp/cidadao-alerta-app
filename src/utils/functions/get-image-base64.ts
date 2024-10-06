import * as FileSystem from "expo-file-system";

export const getImageBase64 = async (imageUri: string) => {
  return await FileSystem.readAsStringAsync(imageUri, {
    encoding: FileSystem.EncodingType.Base64,
  });
};
