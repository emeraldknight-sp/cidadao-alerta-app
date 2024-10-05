import * as Sharing from "expo-sharing";
import { Alert } from "react-native";

export const sharePDF = async (fileUri: string) => {
  await Sharing.shareAsync(fileUri, {
    UTI: ".pdf",
    mimeType: "application/pdf",
  }).catch((error) => {
    Alert.alert("Erro", "Não foi possível compartilhar o PDF.");
  });
};
