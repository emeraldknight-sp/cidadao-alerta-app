import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (key: string, newData: any) => {
  try {
    const existingDataString = await AsyncStorage.getItem(key);
    const existingData = existingDataString
      ? JSON.parse(existingDataString)
      : [];

    existingData.push(newData);

    await AsyncStorage.setItem(key, JSON.stringify(existingData));
  } catch (error) {
    console.error("Error saving data: ", error);
  }
};
