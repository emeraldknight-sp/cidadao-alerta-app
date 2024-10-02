import { Loading } from "../../components/loading";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import colors from "tailwindcss/colors";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { SafeAreaView } from "react-native";

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
    <SafeAreaView className="flex-1">
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Início",
            tabBarActiveTintColor: colors.orange[500],
            tabBarInactiveTintColor: colors.neutral[600],
            tabBarIcon: ({ focused, size }) => {
              if (focused) {
                return (
                  <FontAwesome
                    name="home"
                    color={colors.orange[500]}
                    size={size}
                  />
                );
              }

              return (
                <FontAwesome
                  name="home"
                  color={colors.neutral[600]}
                  size={size}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            headerShown: false,
            title: "Histórico",
            tabBarActiveTintColor: colors.orange[500],
            tabBarInactiveTintColor: colors.neutral[600],
            tabBarIcon: ({ focused, size }) => {
              if (focused) {
                return (
                  <FontAwesome
                    name="history"
                    color={colors.orange[500]}
                    size={size}
                  />
                );
              }

              return (
                <FontAwesome
                  name="history"
                  color={colors.neutral[600]}
                  size={size}
                />
              );
            },
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
