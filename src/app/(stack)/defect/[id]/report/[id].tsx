import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
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
import { useRouter } from "expo-router";
import { Input } from "@/src/components/input";
import { Button } from "@/src/components/button";
import { INPUTS } from "@/src/utils/data/inputs";
import { ReportProps } from "@/src/@types";
import Header from "@/src/components/header";

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
});

export default function Report() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

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

  const createPDF = async (report: ReportProps) => {
    const html = `
      <html>
        <body>
          <h1>Denúncia</h1>
          <p><strong>Nome:</strong> ${report.name}</p>
          <p><strong>Email:</strong> ${report.email}</p>
          <p><strong>Telefone:</strong> ${report.phone}</p>
          <p><strong>Defeito:</strong> ${report.defect}</p>
          <p><strong>Endereço:</strong> ${report.address}</p>
          <img src="${image}" alt="imagem anexada" />
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });

    const formatDefect = () => report.defect.toLowerCase().replace(" ", "_");

    const fileUri = `${FileSystem.documentDirectory}alerta_${formatDefect}_${Date.now()}.pdf`;

    console.log("LOG: ", uri, "LOG file URI", fileUri);

    await FileSystem.moveAsync({
      from: uri,
      to: fileUri,
    });

    await Sharing.shareAsync(fileUri).catch((error) => {
      Alert.alert("Erro", "Não foi possível compartilhar o PDF.");
    });

    Alert.alert("PDF salvo com sucesso!", `Localização: ${fileUri}`);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const report = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      defect: data.defect,
      address: data.address,
      image: image,
    };

    await createPDF(report);
    router.push("/history");
  };

  return (
    <>
      <Header />
      <ScrollView
        className="bg-white flex-col flex-1 p-4"
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView behavior="position">
          <Text className="text-xl text-center font-subtitle text-neutral-950 pb-4">
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
                      defaultValue={item.placeholder ? "" : "Sem defeito"}
                      blurOnSubmit={true}
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
        <View className="w-full h-44 mb-4 overflow-hidden rounded-md border-2 border-orange-500 justify-center items-center">
          {!image ? (
            <TouchableOpacity onPress={pickImage} className="max-w-[75%]">
              <Text className="text-neutral-400 text-sm text-center">
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
    </>
  );
}
