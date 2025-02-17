import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import HeaderSection from "./HeaderSection";

interface Service {
  id: string;
  name: string;
  logo: string; // Image URL
}

const ServiceItem: React.FC<{ item: Service }> = ({ item }) => (
  <TouchableOpacity style={styles.serviceCard}>
    <Image source={{ uri: item.logo }} style={styles.logo} />
    <Text style={styles.serviceText}>{item.name}</Text>
  </TouchableOpacity>
);

const ServicesSection: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // if data is still loading
  if (loading) {
    return (
      <View style={styles.container}>
        <HeaderSection />
        <ActivityIndicator size="large" color="#2c7075" />
      </View>
    );
  }

  // if an error occurred
  if (error) {
    return (
      <View style={styles.container}>
        <HeaderSection />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // if no services are available
  if (services.length === 0) {
    return (
      <View style={styles.container}>
        <HeaderSection />
        <Text style={styles.noDataText}>No services available</Text>
      </View>
    );
  }

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
    paddingHorizontal: 16,
  },
  list: {
    paddingHorizontal: 10,
    alignItems: "center",
  },
  serviceCard: {
    backgroundColor: "#F8F9FA",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    marginRight: 16,
    shadowColor: "#000", // ios
    shadowOpacity: 0.1, // ios
    shadowRadius: 10, //ios
    elevation: 5, // for android
    height: 140,
    width: 120,
    justifyContent: "center",
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 12,
  },
  serviceText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  noDataText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#757575",
  },
});

export default ServicesSection;
