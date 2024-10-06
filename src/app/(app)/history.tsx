import colors from "tailwindcss/colors";
import { Eye, Save } from "lucide-react-native";
import { Header } from "@/src/components/header";
import { Image } from "react-native";
import { ReportsContext } from "@/src/context/ReportsContext";
import { SafeAreaView } from "react-native";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { createPDF } from "@/src/utils/functions/create-pdf";
import { useContext } from "react";

export default function History() {
  const { reports } = useContext(ReportsContext);

  return (
    <SafeAreaView className="flex-1 mt-10">
      <Header />
      <View className="bg-white flex-col flex-1 gap-4 p-4">
        <Text className="text-base text-neutral-950">
          Histórico de denúncias realizadas
        </Text>
        {reports.length ? (
          reports.map((report, index) => (
            <View key={index} className="flex-row flex-1 max-h-20">
              <Image
                source={{ uri: report.image }}
                className="w-20 h-20 rounded-md mr-4"
              />
              <View className="flex-col flex-1 justify-between">
                <View>
                  <Text className="text-neutral-950 font-heading text-base">
                    {report.defect}
                  </Text>
                  <Text className="text-neutral-950 text-xs text-wrap">
                    {report.address}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <TouchableOpacity className="flex-row gap-1">
                    <Eye size={20} color={colors.neutral[500]} />
                    <Text className="text-neutral-950 underline font-bold">
                      Visualizar
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="flex-row gap-1"
                    onPress={() => createPDF(report)}
                  >
                    <Save size={20} color={colors.orange[500]} />
                    <Text className="text-orange-500 underline font-bold">
                      Salvar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View className="flex flex-col justify-center items-center flex-1">
            <Text className="text-base font-medium text-neutral-700">
              Você não tem denúncias realizadas.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
