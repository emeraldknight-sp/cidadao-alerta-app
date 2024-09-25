import { ActivityIndicator, View } from "react-native";

export function Loading() {
  return (
    <View className="flex-1 items-center justify-center bg-neutral-50">
      <ActivityIndicator className="bg-neutral-50" />
    </View>
  );
}