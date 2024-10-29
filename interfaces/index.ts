import { TBgColorOptions, TBorderColorOptions } from "@/types";
import { ReactNode } from "react";
import { PressableProps, StyleProp, ViewStyle } from "react-native";

export interface ICustomButton extends PressableProps {
  children: string | ReactNode;
  bgColor?: TBgColorOptions | (string & {});
  borderColor?: TBorderColorOptions | (string & {});
  width?: string;
  styled?: StyleProp<ViewStyle>;
}
