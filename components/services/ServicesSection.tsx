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
import useCustomQuery from "@/config/useCustomQuery";
import { useFocusEffect } from "@react-navigation/native";
import HeaderSection from "./HeaderSection";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../ui/CustomText";
import { router, useLocalSearchParams } from "expo-router";
import { Dimensions } from "react-native";
import RenderIcon from "../ui/RenderIcon";
const { height: screenHeight } = Dimensions.get("window");
interface Service {
  id: string;
  service_type: string;
  merchants: {
    merchant_id: string;
    commercial_name: string;
  }[];
}

const ServiceItem = ({
  merchant,
  serviceType,
  serviceId,
}: {
  merchant: { id: string; commercial_name: string };
  serviceType: string;
  serviceId: string;
}) => (
  <TouchableOpacity
    activeOpacity={0.6}
    style={styles.serviceCard}
    onPress={() => {
      router.push({
        // pathname: "/Services/electricityBilling",
        pathname: (serviceType === "reference bills" ||
        serviceType.includes("ref")
          ? "/Services/refnumBilling"
          : "/Services/generalBilling") as any,
        params: {
          merchant_id: merchant.id,
          commercial_name: merchant.commercial_name,
          service_type: serviceType,
          service_id: serviceId,
        },
      });
    }}
  >
    <View style={styles.iconContainer}>
      <RenderIcon serviceType={serviceType} />
      {/* <Ionicons name="flash" size={15} color="#ffffff" /> */}
    </View>
    <Text
      style={styles.serviceName}
      numberOfLines={2}
      ellipsizeMode="tail"
      adjustsFontSizeToFit={false}
    >
      {merchant.commercial_name.split(" ").join("\n")}
    </Text>
  </TouchableOpacity>
);

const ServicesSection = () => {
  const {
    data: servicesData,
    error: servicesError,
    isLoading: servicesLoading,
    refetch: refetchServices,
  } = useCustomQuery({
    queryKey: ["services"],
    whichInstance: "apiBilling",
    url: "/merchants/list-active-merchants?page=1",
  });

  useFocusEffect(
    React.useCallback(() => {
      refetchServices();
    }, [])
  );
  console.log(servicesData?.data.rows[1]?.merchants[0]?.id);
  if (servicesLoading) {
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
        <Text style={styles.errorText}>{servicesError.message}</Text>
      </View>
    );
  }

  if (servicesData.data.count === 0) {
    return (
      <View style={styles.container}>
        <HeaderSection />
        <Text style={styles.noDataText}>No services available</Text>
      </View>
    );
  }

  const flattenedMerchants =
    servicesData?.data.rows.flatMap((service: Service) =>
      service.merchants.map(
        (merchant: { merchant_id: string; commercial_name: string }) => ({
          serviceId: service.id,
          serviceType: service.service_type,
          merchant,
        })
      )
    ) || [];

  return (
    <View style={styles.container}>
      <HeaderSection />
      <FlatList
        data={flattenedMerchants}
        numColumns={4}
        keyExtractor={(item) => {
          // console.log(item);
          return item.merchant.merchant_id + item.serviceId;
        }}
        renderItem={({ item }) => (
          <ServiceItem
            merchant={item.merchant}
            serviceType={item.serviceType}
            serviceId={item.serviceId}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 10,
    width: "100%",
    height: "82.8%",
    // borderWidth: 5,
    // borderColor: "red",
    // minHeight: 500,
  },
  listContent: {
    // borderWidth: 5,
    // borderColor: "green",
    paddingBottom: 20,
    marginBottom: 10,
    justifyContent: "flex-start",
  },

  columnWrapper: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    color: "#333333",
  },
  list: {
    paddingVertical: 10,
    gap: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  serviceCard: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    margin: 4,
    width: "22.8%",
    shadowColor: "#535050",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 3,
    minHeight: 100,
    justifyContent: "center",
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
  iconContainer: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: "#2c7075",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: "#2c7075",
  },
});

export default ServicesSection;
