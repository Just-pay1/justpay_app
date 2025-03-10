import { Text } from "react-native";
const CustomMsgError = ({ msg }: { msg?: string }) => {
  return <Text className="color-danger ml-2">*{msg}</Text>;
};

export default CustomMsgError;
