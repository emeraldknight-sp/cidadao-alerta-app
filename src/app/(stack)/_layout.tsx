import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="defect/[id]"
        options={{ title: "Defeito estrutural", headerShown: false }}
      />
      <Stack.Screen
        name="defect/[id]/report/[id]"
        options={{ title: "Reportar", headerShown: false }}
      />
    </Stack>
  );
}
