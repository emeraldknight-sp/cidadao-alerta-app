import { SafeAreaView } from "react-native";
import { Slot } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { Loading } from "../components/loading";
import { Toaster } from "sonner-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="flex-1 bg-neutral-50 p-8">
        <Toaster position="top-center" />
        <Slot />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
