import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CustomText from "../ui/CustomText";

const HeaderSection: React.FC = () => (
  <View style={styles.header}>
    <CustomText className="text-2xl font-bold p-0 mb-1 text-primary ">
      Services
    </CustomText>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  seeAll: {
    color: "gray",
    fontSize: 16,
  },
});

export default HeaderSection;
