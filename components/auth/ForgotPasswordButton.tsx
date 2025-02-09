import React from "react";
import { TouchableOpacity, Text, StyleSheet ,View} from "react-native";


interface ForgotPasswordProps {
  onForgotPassword: () => void;
}

const ForgotPasswordButton: React.FC<ForgotPasswordProps> = ({ onForgotPassword }) => {
  return (
  <View style={styles.container}>
    <TouchableOpacity onPress={onForgotPassword} style={styles.button}>
      <Text style={styles.buttonText}>Forgot Password?</Text>
    </TouchableOpacity>
    </View>
    
  );
};

const styles = StyleSheet.create({
    container:{
        width: "100%",
        marginBottom: 20,
    },
  button: {
    alignSelf: "flex-end"
  },
  buttonText: {
    fontSize: 14,
    color: "#007d7e",
    fontWeight: "bold",
    alignSelf: "flex-end",
   // textAlign: "right",
    marginBottom:5,
    
  },
});

export default ForgotPasswordButton;




