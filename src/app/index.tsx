import { Button } from "../components/button";
import { Image, Text, View } from "react-native";
import { router } from "expo-router";

export default function App() {
  return (
    <View className="flex flex-col justify-center items-center gap-6 flex-1 p-8">
      <View className="flex flex-col items-center gap-2">
        <Image
          source={require("@/src/assets/logo.png")}
          className="w-48 h-48"
        />
      </View>
      <Button color="primary" onPress={() => router.push("/(app)/")}>
        <Button.Text>Começar</Button.Text>
      </Button>
    </View>
  );
}
