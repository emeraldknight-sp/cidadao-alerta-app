import { Button } from "@/src/components/button";
import { DEFECTS } from "@/src/utils/data/options-list";
import { Header } from "@/src/components/header";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function Defect() {
  const { id } = useLocalSearchParams();
  const defect = DEFECTS.find((buildingEL) => buildingEL.id === Number(id));

  const handleReport = () => {
    router.push(`/defect/${id}/report/${id}`);
  };

  return (
    defect && (
      <SafeAreaView className="flex-1 mt-10">
        <Header />
        <ScrollView className="bg-white flex-col flex-1 p-4">
          <Text className="text-base text-neutral-950 mb-2">
            Definição do problema
          </Text>
          <View className="flex-col gap-2">
            <Text className="text-xl text-neutral-950 font-semibold">
              {defect.name}
            </Text>
            <Text className="text-base text-neutral-950 leading-6 text-justify">
              {defect.description}
            </Text>
          </View>
          <Image
            source={defect.image}
            className="w-full h-56 max-h-96 md:h-[30vh] rounded-md my-4"
            alt={defect.name}
          />
          <Button color="secondary" onPress={handleReport}>
            <Button.Text>Solicitar manutenção</Button.Text>
          </Button>
        </ScrollView>
      </SafeAreaView>
    )
  );
}
