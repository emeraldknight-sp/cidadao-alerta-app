import Header from "@/src/components/header";
import React from "react";
import { Slot } from "expo-router";
import { View } from "react-native";

export default function ReportLayout() {
  return (
    <View className="bg-neutral-50 w-full py-10 px-4">
      <Header />
      <Slot />
    </View>
  );
}
