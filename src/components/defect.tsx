import { DefectProps, ImageIndex } from "../@types";
import { Image, Text, View } from "react-native";
import { Button } from "./button";
import { toast } from "sonner-native";

export default function Defect({ id, name, description }: DefectProps) {
  const image: ImageIndex = {
    1: require("@/src/assets/defects/deterioracao-concreto.png"),
    2: require("@/src/assets/defects/rachaduras.png"),
    3: require("@/src/assets/defects/infiltracao.png"),
    4: require("@/src/assets/defects/mofo.png"),
    5: require("@/src/assets/defects/destacamento-ceramico.png"),
    6: require("@/src/assets/defects/corrosao.png"),
    7: require("@/src/assets/defects/buraco.png"),
    8: require("@/src/assets/defects/afundamento.png"),
    9: require("@/src/assets/defects/trincas.png"),
    10: require("@/src/assets/defects/remendo.png"),
  };

  return (
    <View className="mt-4">
      <Text className="text-base text-neutral-950 mb-2">
        Definição do problema:
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
      <Button
        color="secondary"
        onPress={() => toast.info("Solicitando manutenção")}
      >
        <Button.Text>Solicitar manutenção</Button.Text>
      </Button>
    </View>
  );
}
