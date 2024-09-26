import clsx from "clsx";
import { ButtonIconProps, ButtonProps, ButtonTextProps } from "../@types";
import { Text, TouchableOpacity } from "react-native";

function Button({ children, color, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      className={clsx(
        "w-full h-12 bg-orange-500 rounded-md items-center justify-center flex-row flex",
        color === "primary" ? "bg-orange-500" : "bg-gray-800"
      )}
      activeOpacity={0.7}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}

function ButtonText({ children }: ButtonTextProps) {
  return (
    <Text className="text-neutral-50 font-heading text-base mx-2">
      {children}
    </Text>
  );
}

function ButtonIcon({ children }: ButtonIconProps) {
  return children;
}

Button.Text = ButtonText;
Button.Icon = ButtonIcon;

export { Button };
