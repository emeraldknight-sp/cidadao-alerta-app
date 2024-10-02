import { Button } from "./button";
import { DefectProps, ImageIndex } from "../@types";
import { Image, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function Defect({ id, name, description }: DefectProps) {
  const image: ImageIndex = {
    1: require("@/src/assets/deterioracao-concreto.png"),
    2: require("@/src/assets/rachaduras.png"),
    3: require("@/src/assets/infiltracao.png"),
    4: require("@/src/assets/mofo.png"),
    5: require("@/src/assets/destacamento-ceramico.png"),
    6: require("@/src/assets/corrosao.png"),
    7: require("@/src/assets/buraco.png"),
    8: require("@/src/assets/afundamento.png"),
    9: require("@/src/assets/trincas.png"),
    10: require("@/src/assets/remendo.png"),
  };

  const router = useRouter();

  const handleReport = () => {
    router.push("/report");
  };

  return (
    <View className="mt-4">
      <Text className="text-base text-neutral-950 mb-2">
        Definição do problema
      </Text>
      <View className="flex-col gap-2">
        <Text className="text-xl text-neutral-950 font-semibold">{name}</Text>
        <Text className="text-base text-neutral-950 leading-6">
          {description}
        </Text>
      </View>
      <Image
        source={image[id]}
        className="w-full h-56 rounded-md my-4"
        alt={name}
      />
      <Button color="secondary" onPress={handleReport}>
        <Button.Text>Solicitar manutenção</Button.Text>
      </Button>
    </View>
  );
}
