import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
  InfoToast,
  SuccessToast,
  ToastProps,
} from "react-native-toast-message";
import Ionicons from "@expo/vector-icons/Ionicons";
const toastConfig = {
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      renderLeadingIcon={() => (
        <Ionicons
          name="checkmark-circle"
          size={30}
          color="#15803d"
          marginLeft={10}
        />
      )}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#bbf7d0",
        borderLeftColor: "#15803d",
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: 600,
      }}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      renderLeadingIcon={() => (
        <Ionicons name="warning" size={30} color="#bb2121" marginLeft={10} />
      )}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#fecaca",
        borderLeftColor: "#bb2121",
        minHeight: 60,
        height: "auto",
      }}
      text1Style={{
        paddingVertical: 1,
        fontSize: 15,
        fontWeight: 600,
      }}
      text1NumberOfLines={3}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
  info: (props: ToastProps) => (
    <ErrorToast
      {...props}
      renderLeadingIcon={() => (
        <Ionicons
          name="information-circle"
          size={30}
          color="#0369a1"
          marginLeft={10}
        />
      )}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#bae6fd",
        borderLeftColor: "#0369a1",
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: 600,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
  // tomatoToast: ({ text1, props }) => (
  //   <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
  //     <Text>{text1}</Text>
  //     <Text>{props.uuid}</Text>
  //   </View>
  // )
};

export default toastConfig;
