import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  } catch (error) {
    console.error("Error loading data: ", error);
    return [];
  }
};
