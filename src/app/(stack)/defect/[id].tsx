import Header from "@/src/components/header";
import { BUILDINGS, PAVIMENTS } from "@/src/utils/data/options-list";
import { Button } from "@/src/components/button";
import { Image, ScrollView, Text, View } from "react-native";
import { ImageIndex } from "@/src/@types";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Defect() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const defect = BUILDINGS.concat(PAVIMENTS).find((buildingEL) => buildingEL.id === Number(id));

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

  const handleReport = () => {
    router.push(`/defect/${id}/report/${id}`);
  };

  return (
    defect && (
      <>
        <Header />
        <ScrollView className="bg-white flex-col flex-1 p-4">
          <Text className="text-base text-neutral-950 mb-2">
            Definição do problema
          </Text>
          <View className="flex-col gap-2">
            <Text className="text-xl text-neutral-950 font-semibold">
              {defect.name}
            </Text>
            <Text className="text-base text-neutral-950 leading-6">
              {defect.description}
            </Text>
          </View>
          <Image
            source={image[Number(id)]}
            className="w-full h-56 rounded-md my-4"
            alt={defect.name}
          />
          <Button color="secondary" onPress={handleReport}>
            <Button.Text>Solicitar manutenção</Button.Text>
          </Button>
        </ScrollView>
      </>
    )
  );
}
