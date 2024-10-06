import * as FileSystem from "expo-file-system";

export const savePDF = async (uri: string, defect: string) => {
  const formatDefect = () => defect.toLowerCase().replaceAll(" ", "_");
  const fileUri = `${FileSystem.documentDirectory}alerta_${formatDefect()}_${Date.now()}.pdf`;

  const downloadsDir = `${FileSystem.documentDirectory}Downloads/`;
  await FileSystem.makeDirectoryAsync(downloadsDir, { intermediates: true });

  const downloadUri = `${downloadsDir}alerta_${formatDefect()}_${Date.now()}.pdf`;

  await FileSystem.moveAsync({
    from: uri,
    to: downloadUri,
  });

  return downloadUri;
};
