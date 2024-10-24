import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  return (
    <SafeAreaView>
      <View>
        <Text className="text-danger p-3 text-lg font-RobotoSlab">index</Text>
      </View>
    </SafeAreaView>
  );
};

export default index;
