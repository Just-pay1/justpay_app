import { TBgColorOptions, TBorderColorOptions } from "@/types";
import { ReactNode } from "react";
import { PressableProps, StyleProp, ViewStyle } from "react-native";

export interface ICustomButton extends PressableProps {
  children: string | ReactNode;
  bgColor?: TBgColorOptions | (string & {});
  borderColor?: TBorderColorOptions | (string & {});
  width?: string;
  styled?: StyleProp<ViewStyle>;
  loading?: boolean;
  textLoading?: string;
}
export interface IRegisterInput {
  name: "name" | "email" | "phone" | "password" | "confirmPassword";
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
export interface IResetPass {
  name: "newPassword" | "confirmedPassword";
  placeholder: string;
  type: "password";
}
