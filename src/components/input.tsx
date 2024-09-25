import { TextInput, TextInputProps } from "react-native";

export function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput
      textAlignVertical="center"
      placeholderTextColor="text-neutral-500"
      className="h-12 bg-neutral-50 border-2 border-orange-500 rounded-md px-3 py-3 font-body text-sm text-neutral-950"
      {...rest}
    ></TextInput>
  );
}
