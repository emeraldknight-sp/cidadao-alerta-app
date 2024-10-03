import { Button } from "../components/button";
import { Image, Text, View } from "react-native";
import { router } from "expo-router";

export default function App() {
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
      <Button color="primary" onPress={() => router.push("/(app)/")}>
        <Button.Text>Começar</Button.Text>
      </Button>
    </View>
  );
}
