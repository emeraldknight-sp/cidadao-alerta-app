import { TextInput, TextInputProps } from "react-native";

export function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput
      textAlignVertical="center"
      placeholderTextColor="text-neutral-500"
      className="text-neutral-950 text-base font-body bg-neutral-50 rounded-md border-orange-500 border-2 h-12 px-3 py-3"
      {...rest}
    ></TextInput>
  );
}
