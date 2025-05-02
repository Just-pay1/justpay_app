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
import { apiClient } from "@/config/axios.config";

interface Service {
  id: string;
  name: string;
  logo: string;
}

const ServiceItem: React.FC<{ item: Service }> = ({ item }) => (
  <TouchableOpacity style={styles.serviceCard}>
    <Image
      source={{ uri: item.logo }}
      style={styles.logo}
      resizeMode="contain"
    />
    <Text style={styles.serviceText}>{item.name}</Text>
  </TouchableOpacity>
);

const ServicesSection: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState<boolean>(true);
  const [servicesError, setServicesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await apiClient.get(
          "/api/merchants/list-active-merchants"
        );
        console.log(response);
        setServices(response.data);
      } catch (error) {
        setServicesError("Failed to load services.");
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  if (loadingServices) {
    return (
      <View style={styles.container}>
        <HeaderSection />
        <ActivityIndicator size="large" color="#2c7075" />
      </View>
    );
  }

  if (servicesError) {
    return (
      <View style={styles.container}>
        <HeaderSection />
        <Text style={styles.errorText}>{servicesError}</Text>
      </View>
    );
  }

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
        keyExtractor={(item) => item.id.toString()}
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
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
