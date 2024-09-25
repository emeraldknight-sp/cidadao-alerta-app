import { TouchableOpacityProps } from "react-native";

declare module "accordion-collapse-react-native";
declare module "*.png";

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

interface ButtonTextProps {
  children: React.ReactNode;
}

interface ButtonIconProps {
  children: React.ReactNode;
}

interface User {
  email: string;
  password: string;
}
