import Defect from "@/src/components/defect";
import { PAVIMENTS } from "@/src/utils/data/options-list";
import { useLocalSearchParams } from "expo-router";

export default function PavimentDefect() {
  const { id } = useLocalSearchParams();
  const defect = PAVIMENTS.find((pavimentEL) => pavimentEL.id === Number(id));

  return (
    defect && (
      <Defect
        id={defect.id}
        name={defect.name}
        description={defect.description}
      />
    )
  );
}
