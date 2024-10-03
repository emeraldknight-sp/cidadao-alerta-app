import Header from "@/src/components/header";
import colors from "tailwindcss/colors";
import { Eye, Save } from "lucide-react-native";
import { Image } from "react-native";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";

export default function History() {
  const reports = [
    {
      id: 1,
      defect: "Deterioração do Concreto",
      address: "Rua Francisco Fortes, 748",
      name: "David Almeida",
      phone: "86988641961",
      email: "contato.pessoa@email.com",
      image: "imagem",
    },
    {
      id: 2,
      defect: "Deterioração do Concreto",
      address: "Rua Francisco Fortes, 748",
      name: "David Almeida",
      phone: "86988641961",
      email: "contato.pessoa@email.com",
      image: "imagem",
    },
    {
      id: 3,
      defect: "Deterioração do Concreto",
      address: "Rua Francisco Fortes, 748",
      name: "David Almeida",
      phone: "86988641961",
      email: "contato.pessoa@email.com",
      image: "imagem",
    },
  ];

  return (
    <SafeAreaView className="flex-1 mt-10">
      <Header />
      <View className="bg-white flex-col flex-1 gap-4 p-4">
        <Text className="text-base text-neutral-950">
          Histórico de denúncias realizadas
        </Text>
        {reports ? (
          reports.map((report, index) => (
            <View key={index} className="flex-row flex-1 max-h-20">
              <Image
                source={require("../../assets/mofo.png")}
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
                  <TouchableOpacity className="flex-row gap-1">
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
          <Text className="">Você não tem denúncias realizadas.</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
