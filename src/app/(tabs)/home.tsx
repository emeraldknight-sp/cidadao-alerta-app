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
    <View className="flex-col gap-3 mt-3">
      <Collapse>
        <CollapseHeader>
          <View className="bg-orange-500 rounded-md">
            <Text className="text-neutral-50 text-xl font-heading px-4 py-2">
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
                href={`/defect/building/${item.id}`}
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
            <Text className="text-neutral-50 text-xl font-heading px-4 py-2">
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
                href={`/defect/paviment/${item.id}`}
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
  );
}
