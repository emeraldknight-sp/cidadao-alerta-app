import { Image, Text, View } from "react-native";
import { Menu } from "lucide-react-native";
import colors from "tailwindcss/colors"

export default function Header() {
  return (
    <View className="flex-row justify-between items-center">
      <View className="flex flex-row items-center gap-2">
        <Image
          source={require("@/src/assets/logo.png")}
          className="w-[44px] h-[30px]"
        />
        <Text className="text-2xl text-neutral-950 font-heading">Cidadão Alerta</Text>
      </View>
      <Menu size={32} color={colors.neutral[950]} />
    </View>
  );
}
