import { Ref, forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";
interface IProps extends TextInputProps {}

const CustomInput = forwardRef(({ ...rest }: IProps, ref: Ref<TextInput>) => {
  return (
    <TextInput
      ref={ref}
      className="p-2 pl-3 color-primary border-1.5 border-primary-foreground h-12 
        rounded-3xl w-full font-Nunitosemi text-base focus:border-2 focus:border-primary"
      placeholderTextColor="#9d9a9a" //muted
      autoCapitalize="words"
      cursorColor="#444444" //primary-foreground
      {...rest}
    />
  );
});

export default CustomInput;
