import Defect from "@/src/components/defect";
import { BUILDINGS } from "@/src/utils/data/options-list";
import { useLocalSearchParams } from "expo-router";

export default function BuildingDefect() {
  const { id } = useLocalSearchParams();
  const defect = BUILDINGS.find((buildingEL) => buildingEL.id === Number(id));

  return (
    defect && <Defect name={defect.name} description={defect.description} />
  );
}
