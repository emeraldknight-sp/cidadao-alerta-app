import * as ImagePicker from "expo-image-picker";
import { Button } from "@/src/components/button";
import { INPUTS } from "@/src/utils/data/inputs";
import { Input } from "@/src/components/input";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
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

  const onSubmit: SubmitHandler<FieldValues> = ({
    name,
    email,
    phone,
    defect,
    address,
  }) => {
    const report = {
      name: name,
      email: email,
      phone: phone,
      defect: defect,
      address: address,
      image: image,
    };

    console.log("LOG: ", report);

    alert("Solicitação enviada!");
  };

  const [image, setImage] = useState<string | null>(null);

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

  return (
    <ScrollView className="mt-4" showsVerticalScrollIndicator={false}>
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
  );
}
