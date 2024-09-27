import { Button } from "@/src/components/button";
import { FlatList, Text, View } from "react-native";
import { INPUTS } from "@/src/utils/data/inputs";
import { Input } from "@/src/components/input";
import { toast } from "sonner-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
    };
    alert("Solicitação enviada!");
  };

  return (
    <View className="mt-4">
      <Text className="text-xl text-center font-subtitle text-neutral-950 pb-4">
        Formulário de denúncia
      </Text>
      <FlatList
        data={INPUTS}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          const fieldName = item.name;

          return (
            <View className="pb-4">
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
                    blurOnSubmit={true}
                    defaultValue={item.placeholder || "Sem defeito"}
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
        }}
      />
      <Button color="primary" onPress={handleSubmit(onSubmit)}>
        <Button.Text>Enviar solicitação</Button.Text>
      </Button>
    </View>
  );
}
