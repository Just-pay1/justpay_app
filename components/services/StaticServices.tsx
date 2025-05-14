import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import HeaderSection from "./HeaderSection";
import Vec from "@/assets/svg/Vec.svg";
import { useRouter } from "expo-router";

interface Service {
  id: string;
  name: string;
}

const ServiceItem: React.FC<{ item: Service }> = ({ item }) => {
  const router = useRouter();

  const handlePress = () => {
    if (item.id === "1") {
      router.push("/Services/electricityBilling");
    }
  };

  return (
    <TouchableOpacity style={styles.serviceCard} onPress={handlePress}>
      <Vec width={35} height={35} />
      <Text style={styles.serviceText}>{item.name}</Text>
    </TouchableOpacity>
  );
};
const Services: React.FC = () => {
  const staticServices: Service[] = [
    { id: "1", name: "Service 1" },
    { id: "2", name: "Service 2" },
    { id: "3", name: "Service 3" },
  ];

  const [services] = useState<Service[]>(staticServices);

  return (
    <View style={styles.container}>
      <HeaderSection />
      <FlatList
        data={services}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ServiceItem item={item} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  list: {
    paddingHorizontal: 10,
    alignItems: "center",
  },
  serviceCard: {
    backgroundColor: "#F2F3F5",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: "center",
    marginRight: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: 100,
    height: 120,
    justifyContent: "center",
  },
  serviceText: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "600",
    color: "#444444",
    marginTop: 10,
  },
});

export default Services;
