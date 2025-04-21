import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const HeaderSection: React.FC = () => (
  <View style={styles.header}>
    <Text style={styles.title}>Services</Text>
    <TouchableOpacity>
      <Text style={styles.seeAll}>See All</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
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
