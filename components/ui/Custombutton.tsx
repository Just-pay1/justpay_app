/**
 ** how to deal with this comp ?
 ** to change backGround ==> <Primarybutton bgColor="bg-danger" or "bg-transparent" ...>
 ** to change borderColor ==> <Primarybutton borderColor= "border-color" ...>
 ** to change width ==> <Primarybutton width="w-full" or "w- fit" or "w-[number]"" or any number }} ...>
 */
import { ICustomButton } from "@/interfaces";
import { StyleSheet, View } from "react-native";
import { Pressable } from "react-native";

function PrimaryButton({
  children,
  bgColor = "bg-primary",
  width = "w-3/4",
  borderColor,
  styled,
  ...rest
}: ICustomButton) {
  const borderProp = borderColor ? `border-1.5 ${borderColor}` : null;
  return (
    <View
      className={`mx-auto my-3 rounded-3xl ${width} ${borderProp}`}
      style={[styles.wrapper, styled]}
    >
      <Pressable
        className={`w-full h-fit ${bgColor} `}
        android_ripple={{ color: "rgba(0, 0, 0, .2)", borderless: false }}
        {...rest}
      >
        {children}
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  wrapper: {
    overflow: "hidden",
    // ios shadow property
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // Android shadow property
    elevation: 4,
  },
});
