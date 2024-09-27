import { Button } from "../components/button";
import { Image, Text, View } from "react-native";
import { Input } from "../components/input";
import { User } from "../@types";
import { toast } from "sonner-native";
import { useRouter } from "expo-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";

const schema = z.object({
  email: z
    .string({ required_error: "Campo obrigatório" })
    .email("Seu e-mail deve ser válido"),
  password: z
    .string({ required_error: "Campo obrigatório" })
    .min(8, "Sua senha deve ter 8 caracteres"),
});

export default function App() {
  const router = useRouter();

  const db: User[] = [
    {
      email: "lorena@gmail.com",
      password: "12345678",
    },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FieldValues> = ({ email, password }) => {
    const user: User | undefined = db.find((userEl) => userEl.email === email);

    if (user && user?.password === password) {
      router.push("/home");
    } else {
      toast.error("Usuário não encontrado!", {
        id: "user-not-found",
      });
    }
  };

  return (
    <View className="flex flex-col justify-center items-center gap-6 flex-1 p-8">
      <View className="flex flex-col items-center gap-2">
        <Image
          source={require("@/src/assets/logo.png")}
          className="w-[120px] h-[82px]"
        />
        <Text className="text-2xl text-neutral-950 font-heading">
          Cidadão Alerta
        </Text>
      </View>
      <View className="w-full">
        <Text className="text-sm text-neutral-950 font-heading">E-mail:</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              defaultValue="lorena@gmail.com"
              inputMode="email"
              autoComplete="email"
              placeholder="Digite seu e-mail"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              blurOnSubmit={true}
              returnKeyType="next"
            />
          )}
        />
        {errors.email && typeof errors.email.message === "string" && (
          <Text className="text-red-500 text-xs font-bold">
            {errors.email.message}
          </Text>
        )}
      </View>
      <View className="w-full">
        <Text className="text-sm text-neutral-950 font-heading">Senha:</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              defaultValue="12345678"
              autoComplete="password"
              placeholder="Digite sua senha"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              secureTextEntry={true}
              blurOnSubmit={true}
              returnKeyType="next"
            />
          )}
        />
        {errors.password && typeof errors.password.message === "string" && (
          <Text className="text-red-500 text-xs font-bold">
            {errors.password.message}
          </Text>
        )}
      </View>
      <Button color="primary" onPress={handleSubmit(onSubmit)}>
        <Button.Text>Entrar</Button.Text>
      </Button>
    </View>
  );
}
