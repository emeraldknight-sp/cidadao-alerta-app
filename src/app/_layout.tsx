import { Loading } from "../components/loading";
import { ReportsProvider } from "../context/ReportsContext";
import { SafeAreaView } from "react-native";
import { Slot } from "expo-router";
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
    <ReportsProvider>
      <SafeAreaView className="flex-1 bg-white">
        <Slot />
      </SafeAreaView>
    </ReportsProvider>
  );
}
