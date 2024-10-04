import clsx from "clsx";
import { BUILDINGS, OPTIONS, PAVIMENTS } from "@/src/utils/data/options-list";
import { Header } from "@/src/components/header";
import { Pressable, SafeAreaView } from "react-native";
import { View, Text, FlatList, Image } from "react-native";
import { router } from "expo-router";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 mt-10">
      <Header />
      <View className="flex-col flex-1 gap-3 p-4 bg-white">
        <Collapse>
          <CollapseHeader>
            <View className="bg-orange-500 rounded-md">
              <Text className="text-neutral-50 text-lg font-heading px-4 py-2">
                {OPTIONS[0].title}
              </Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <FlatList
              data={BUILDINGS}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => router.push(`/defect/${item.id}`)}
                  className={clsx(
                    "flex flex-row items-center space-x-4 px-4 py-3",
                    item.id % 2 === 0 ? "bg-neutral-50" : "bg-neutral-100"
                  )}
                >
                  <Image
                    source={item.image}
                    className="w-10 h-10 rounded-md"
                    alt={item.name}
                  />
                  <Text className="text-neutral-950 text-lg">{item.name}</Text>
                </Pressable>
              )}
            />
          </CollapseBody>
        </Collapse>
        <Collapse>
          <CollapseHeader>
            <View className="bg-orange-500 rounded-md">
              <Text className="text-neutral-50 text-lg font-heading px-4 py-2">
                {OPTIONS[1].title}
              </Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <FlatList
              data={PAVIMENTS}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => router.push(`/defect/${item.id}`)}
                  className={clsx(
                    "flex flex-row items-center space-x-4 px-4 py-3",
                    item.id % 2 === 0 ? "bg-neutral-50" : "bg-neutral-100"
                  )}
                >
                  <Image
                    source={item.image}
                    className="w-10 h-10 rounded-md"
                    alt={item.name}
                  />
                  <Text className="text-neutral-950 text-lg">{item.name}</Text>
                </Pressable>
              )}
            />
          </CollapseBody>
        </Collapse>
      </View>
    </SafeAreaView>
  );
}
