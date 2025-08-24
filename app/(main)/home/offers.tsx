import { View, Text, TextInput, ScrollView, Image } from "react-native";
import React from "react";

const offers = [
  {
    company: "H&M",
    deal: "40% OFF",
    expiry: "Ends in 2 Months",
  },
  {
    company: "El Araby",
    deal: "25% OFF",
    expiry: "Ends in 1 Week",
  },
  {
    company: "Uber",
    deal: "15% OFF",
    expiry: "Ends in 5 Days",
  },
  {
    company: "Vodafone",
    deal: "50 EGP Cashback",
    expiry: "Ends Today",
  },
  {
    company: "IKEA",
    deal: "Buy 1 Get 1 Free",
    expiry: "Ends in 1 Month",
  },
];

const OffersPage = () => {
  return (
    <ScrollView className="flex-1 bg-white px-4">
      {/* Page Title */}
      <Text className="text-5xl font-Medium mb-6 px-2">Offers</Text>

      {/* Offer Cards */}
      {offers.map((offer, index) => (
        <View
          key={index}
          className="flex-row rounded-xl overflow-hidden mb-4 shadow-sm  ">
          <View className="bg-[#8F2B23] w-2/5 h-28 justify-center items-center px-2">
            <Text className="color-[#C4C4C4] text-3xl font-semibold text-center">
              SPECIAL{"\n"}DEAL
            </Text>
            <Text className="color-muted text-sm text-center mt-1">
              Limited time offer!
            </Text>
          </View>

          {/* Right side: Gray */}
          <View className="bg-[#C4C4C4] w-3/5 h-28 justify-center px-4">
            <Text className="font-bold text-xl">{offer.company}</Text>
            <Text className="text-sm font-semibold mt-2">{offer.deal}</Text>
            <Text className="text-xs color-primary-foreground mt-2">
              {offer.expiry}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default OffersPage;
