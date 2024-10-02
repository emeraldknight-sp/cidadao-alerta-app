import Header from "@/src/components/header";
import clsx from "clsx";
import { BUILDINGS, OPTIONS, PAVIMENTS } from "@/src/utils/data/options-list";
import { Link } from "expo-router";
import { View, Text, FlatList } from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";

export default function Home() {
  return (
    <>
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
                <Link
                  href={`/defect/${item.id}`}
                  className={clsx(
                    "px-4 py-3",
                    item.id % 2 === 0 ? "bg-neutral-200" : "bg-neutral-100"
                  )}
                  asChild
                >
                  <Text className="text-neutral-950 text-lg">{item.name}</Text>
                </Link>
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
                <Link
                  href={`/defect/${item.id}`}
                  className={clsx(
                    "px-4 py-3",
                    item.id % 2 === 0 ? "bg-neutral-200" : "bg-neutral-100"
                  )}
                  asChild
                >
                  <Text className="text-neutral-950 text-lg">{item.name}</Text>
                </Link>
              )}
            />
          </CollapseBody>
        </Collapse>
      </View>
    </>
  );
}
