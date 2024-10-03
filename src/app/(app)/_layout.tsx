import colors from "tailwindcss/colors";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import { Tabs } from "expo-router";

export default function Layout() {
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
