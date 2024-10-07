import * as ImagePicker from "expo-image-picker";
import { Button } from "@/src/components/button";
import { DEFECTS } from "@/src/utils/data/options-list";
import { Header } from "@/src/components/header";
import { INPUTS } from "@/src/utils/data/inputs";
import { Input } from "@/src/components/input";
import { ReportsContext } from "@/src/context/ReportsContext";
import { createPDF } from "@/src/utils/functions/create-pdf";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
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
  reference: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, "Referência muito curta"),
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { name, email, phone, defect, address, reference } = data;
    const report = {
      name,
      email,
      phone,
      defect,
      address,
      reference,
      image,
    };

    addReport(report);

    await createPDF(report);
    router.push("/history");
  };

  const defect = DEFECTS.find((defectEl) => defectEl.id === Number(id));

  return (
    <SafeAreaView className="flex-1 mt-10">
      <Header />
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        className="flex flex-1"
        behavior="padding"
      >
        <ScrollView
          className="bg-white flex flex-col flex-1 px-4"
          showsVerticalScrollIndicator={false}
        >
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
