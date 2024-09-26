import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Loading } from "../components/loading";
import { SafeAreaView } from "react-native";
import { Slot } from "expo-router";
import { Toaster } from "sonner-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

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
      <SafeAreaView className="flex-1 bg-neutral-50 antialiased">
        <Toaster position="top-center" />
        <Slot />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
