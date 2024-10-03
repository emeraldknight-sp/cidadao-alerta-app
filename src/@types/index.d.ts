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

interface User {
  name: string;
  email: string;
  phone: string;
  password: string;
  reports: any[];
  isLogged: boolean;
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

type ImageIndex = {
  [key: number]: ImageSourcePropType;
};
