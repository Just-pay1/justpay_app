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
export interface IRegisterInput {
  name: "name" | "email" | "phone" | "password";
  placeholder: string;
  type: string;
  // validation: {
  //   required?: boolean;
  //   minLength?: number;
  //   pattern?: RegExp;
  // };
}
export interface ILoginInput {
  name: "email" | "password";
  placeholder: string;
  type: string;
}
