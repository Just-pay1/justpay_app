import React from "react";
import { View, TextInput, TextInputProps } from "react-native";
import { twMerge } from "tailwind-merge";

interface Props extends TextInputProps {
  suffix: React.ReactNode;
  containerClassName?: string;
  inputClassName?: string;
}

const CustomInputWithSuffix = ({
  suffix,
  containerClassName,
  inputClassName,
  ...rest
}: Props) => {
  return (
    <View
      className={twMerge(
        "flex-row items-center border border-primary-foreground rounded-full px-4 py-1 w-full",
        containerClassName
      )}
    >
      <TextInput
        className={twMerge(
          "flex-1 text-base text-primary font-Nunitosemi",
          inputClassName
        )}
        placeholderTextColor="#9d9a9a"
        autoCapitalize="none"
        cursorColor="#444444"
        {...rest}
      />
      <View className="ml-2">{suffix}</View>
    </View>
  );
};

export default CustomInputWithSuffix;
