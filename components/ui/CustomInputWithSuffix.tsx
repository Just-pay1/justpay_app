import React from "react";
import { View, TextInput, TextInputProps, StyleSheet } from "react-native";
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
        style={[styles.textInput, rest.style]}
        placeholderTextColor="#9d9a9a"
        autoCapitalize="none"
        cursorColor="#444444"
        {...rest}
      />
      <View className="ml-2">{suffix}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    minHeight: 40,
  },
});

export default CustomInputWithSuffix;
