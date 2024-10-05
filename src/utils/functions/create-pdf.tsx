import * as Print from "expo-print";
import { Alert } from "react-native";
import { ReportProps } from "@/src/@types";
import { createHTML } from "./create-html";
import { getImageBase64 } from "./get-image-base64";
import { savePDF } from "./save-pdf";
import { sharePDF } from "./share-pdf";

export const createPDF = async (report: ReportProps) => {
  try {
    const imageBase64 = await getImageBase64(report.image);
    const html = createHTML(report, imageBase64);
    const { uri } = await Print.printToFileAsync({ html, base64: false });

    const fileUri = await savePDF(uri, report.defect);
    await sharePDF(fileUri);

    Alert.alert("PDF salvo com sucesso!", `Localização: ${fileUri}`);
  } catch (error) {
    Alert.alert("Erro", "Ocorreu um erro ao criar o PDF.");
  }
};