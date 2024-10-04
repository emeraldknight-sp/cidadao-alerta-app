import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Button } from "@/src/components/button";
import { DEFECTS } from "@/src/utils/data/options-list";
import { Header } from "@/src/components/header";
import { INPUTS } from "@/src/utils/data/inputs";
import { Input } from "@/src/components/input";
import { ReportProps } from "@/src/@types";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { ReportsContext } from "@/src/context/ReportsContext";

const schema = z.object({
  name: z.string({ required_error: "Campo obrigatório" }),
  email: z
    .string({ required_error: "Campo obrigatório" })
    .email("Seu e-mail deve ser válido"),
  phone: z
    .string({ required_error: "Campo obrigatório" })
    .min(10, "Seu telefone deve ter um número válido"),
  defect: z.string({ required_error: "Campo obrigatório" }),
  address: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, "Endereço muito curto"),
  reference: z.string(),
});

export default function Report() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const { id } = useLocalSearchParams();
  const [image, setImage] = useState<string>("");
  const { addReport } = useContext(ReportsContext);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const getImageBase64 = async (imageUri: string) => {
    return await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
  };

  const createHTMLContent = (report: ReportProps, imageBase64: string) => {
    return `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        </head>
        <body
          style="
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 20px;
            background-color: #f9f9f9;
            border: 1px solid #ccc;
            border-radius: 8px;
          "
        >
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td colspan="4" style="text-align: center; font-size: 24px; color: #dc2626; font-weight: 700; border: 1px solid #171717; padding: 12px">
                Denúncia
              </td>
            </tr>
            <tr>
              <td colspan="1" style="background-color: #262626; color: white; padding: 10px; border: 1px solid black;">
                <strong>Nome:</strong>
              </td>
              <td colspan="3" style="background-color: white; color: black; padding: 10px; border: 1px solid black;">
                ${report.name}
              </td>
            </tr>
            <tr>
              <td style="background-color: #262626; color: white; padding: 10px; border: 1px solid black;">
                <strong>Email:</strong>
              </td>
              <td style="background-color: white; color: black; padding: 10px; border: 1px solid black;">
                ${report.email}
              </td>
              <td style="background-color: #262626; color: white; padding: 10px; border: 1px solid black; border: 1px solid black;">
                <strong>Telefone:</strong>
              </td>
              <td style="background-color: white; color: black; padding: 10px; border: 1px solid black;">
                ${report.phone}
              </td>
            </tr>
            <tr>
              <td style="background-color: #262626; color: white; padding: 10px; border: 1px solid black;">
                <strong>Defeito:</strong>
              </td>
              <td style="background-color: white; color: black; padding: 10px; border: 1px solid black;">
                ${report.defect}
              </td>
              <td style="background-color: #262626; color: white; padding: 10px; border: 1px solid black;">
                <strong>Endereço:</strong>
              </td>
              <td style="background-color: white; color: black; padding: 10px; border: 1px solid black;" colspan="3">
                ${report.address}
              </td>
            </tr>
            <tr>
              <td style="max-width: 50px; background-color: #262626; color: white; padding: 10px; border: 1px solid black;">
                <strong>Ponto de referência:</strong>
              </td>
              <td style="background-color: white; color: black; padding: 10px; border: 1px solid black;" colspan="3">
                ${report.reference}
              </td>
            </tr>
          </table>
          </table>
          <img
            src="data:image/png;base64,${imageBase64}"
            alt="imagem anexada"
            style="
              display: block;
              margin: 20px auto;
              border: 1px solid #ccc;
              border-radius: 5px;
              max-width: 70%;
              max-height: 60vh;
              object-fit: contain;
            "
          />
        </body>
      </html>
    `;
  };

  const savePDF = async (uri: string, defect: string) => {
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

  const sharePDF = async (fileUri: string) => {
    await Sharing.shareAsync(fileUri, {
      UTI: ".pdf",
      mimeType: "application/pdf",
    }).catch((error) => {
      Alert.alert("Erro", "Não foi possível compartilhar o PDF.");
    });
  };

  const createPDF = async (report: ReportProps) => {
    try {
      const imageBase64 = await getImageBase64(report.image);
      const html = createHTMLContent(report, imageBase64);
      const { uri } = await Print.printToFileAsync({ html, base64: false });

      const fileUri = await savePDF(uri, report.defect);
      await sharePDF(fileUri);

      Alert.alert("PDF salvo com sucesso!", `Localização: ${fileUri}`);
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao criar o PDF.");
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const report = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      defect: data.defect,
      address: data.address,
      reference: data.reference,
      image: image,
    };

    addReport(report);

    await createPDF(report);
    router.push("/history");
  };

  const defect = DEFECTS.find((defectEl) => defectEl.id === Number(id));

  return (
    <SafeAreaView className="flex-1 mt-10">
      <Header />
      <ScrollView
        className="bg-white flex-col flex-1 px-4"
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView behavior="padding">
          <Text className="text-xl text-center font-subtitle text-neutral-950 py-4">
            Formulário de denúncia
          </Text>
          {INPUTS.map((item, index) => {
            const fieldName = item.name;

            return (
              <View key={index} className="pb-4">
                <Text className="text-sm text-neutral-950 font-heading mb-1">
                  {item.text}
                </Text>
                <Controller
                  control={control}
                  name={item.name}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      inputMode="text"
                      placeholder={item.placeholder}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      defaultValue={
                        item.placeholder ? "" : defect && defect.name
                      }
                      blurOnSubmit={true}
                      returnKeyType="next"
                    />
                  )}
                />
                {errors[fieldName] &&
                  typeof errors[fieldName].message === "string" && (
                    <Text className="text-red-500 text-xs font-bold">
                      {errors[fieldName].message}
                    </Text>
                  )}
              </View>
            );
          })}
        </KeyboardAvoidingView>
        <View className="bg-white w-full h-44 mb-4 overflow-hidden rounded-md border-2 border-orange-500 justify-center items-center">
          {!image ? (
            <TouchableOpacity
              onPress={pickImage}
              className="w-full h-full justify-center items-center"
            >
              <Text className="text-neutral-400 text-sm text-center max-w-[75%]">
                Selecione anexos para completar a sua solicitação
              </Text>
            </TouchableOpacity>
          ) : (
            <Image
              source={{ uri: image }}
              className="w-full h-full object-cover"
            />
          )}
        </View>
        <Button
          color="primary"
          className="mb-24"
          onPress={handleSubmit(onSubmit)}
        >
          <Button.Text>Enviar solicitação</Button.Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
