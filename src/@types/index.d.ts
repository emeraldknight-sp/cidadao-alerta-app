import { ImageSourcePropType, TouchableOpacityProps } from "react-native";
import { LinkProps } from "expo-router";

declare module "accordion-collapse-react-native";
declare module "*.png";

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  color: "primary" | "secondary";
}

interface ButtonTextProps {
  children: React.ReactNode;
}

interface ButtonIconProps {
  children: React.ReactNode;
}

interface LinkButtonProps extends LinkProps<string> {
  title: string;
}

interface DefectProps {
  id: number;
  name: string;
  description: string;
}

interface ReportProps {
  name: string;
  email: string;
  phone: string;
  defect: string;
  address: string;
  reference: string;
  image: string;
}

interface ReportsContextProps {
  reports: ReportProps[];
  addReport: (report: ReportProps) => void;
}

interface ReportsProviderProps {
  children: React.ReactNode;
}
