// CustomText.tsx
import React from "react";
import { Text } from "react-native";
import { twMerge } from "tailwind-merge"; // or 'nativewind'

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const CustomText = ({ children, className }: IProps) => {
  const combinedClassName = twMerge(
    "font-Nunitosemi capitalize p-3 text-center text-base",
    className
  );

  return <Text className={combinedClassName}>{children}</Text>;
};

export default CustomText;
