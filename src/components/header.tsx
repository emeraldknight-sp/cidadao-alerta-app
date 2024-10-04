import { Image, Text, View } from "react-native";
import { Menu } from "lucide-react-native";
import colors from "tailwindcss/colors"

export function Header() {
  return (
    <View className="bg-white flex-row justify-between items-center z-10 p-4">
      <View className="flex flex-row items-center gap-2">
        <Image
          source={require("@/src/assets/logo.png")}
          className="w-11 h-11"
        />
        <Text className="text-2xl text-neutral-950 font-heading">Cidadão Alerta</Text>
      </View>
      <Menu size={32} color={colors.neutral[950]} />
    </View>
  );
}
