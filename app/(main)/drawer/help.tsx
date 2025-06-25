import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import CustomText from "@/components/ui/CustomText";
import CustomInput from "@/components/ui/CustomInput";
import PrimaryButton from "@/components/ui/Custombutton";

// Static FAQ data
const faqData = [
  {
    question: "How do I reset my password?",
    answer:
      "Go to the login screen and tap 'Forgot Password.' Enter your registered email, and we'll send you a reset link.",
  },
  {
    question: "I sent money to the wrong account. What should I do?",
    answer: "Please contact support immediately for assistance.",
  },
  {
    question: "How can I cancel a transaction?",
    answer: "Go to your transaction history and select the one to cancel.",
  },
];

const SupportCenter = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <View className="flex-1 bg-secondary">
      {/* Header */}
      <View className=" pb-4 px-5">
        <CustomText className="text-primary text-3xl  text-center">
          Support Center
        </CustomText>
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Contact Options */}
        <View className="bg-primary px-5 py-2 rounded-2xl space-y-4">
          <CustomText className="text-secondary text-center text-2xl ">
            Have a question?{"\n"}Let's solve it together
          </CustomText>
          
          <PrimaryButton width="w-[90%]" className="bg-secondary">
            <CustomText className="text-primary text-center text-3xl">
              Chat With Us
            </CustomText>
          </PrimaryButton>
          <PrimaryButton width="w-[90%]" className="bg-secondary">
           <CustomText className="text-primary text-center text-3xl ">
              Call Support
            </CustomText>
          </PrimaryButton>
          <PrimaryButton width="w-[90%]" className="bg-secondary">
           <CustomText className="text-primary text-center text-3xl ">
              Email Support
            </CustomText>
          </PrimaryButton>
        </View>

        {/* FAQ Section with new design */}
        <View className="bg-primary rounded-2xl mt-6 px-4 py-4">
          <CustomText className="text-secondary text-3xl mb-1 text-center">
            FAQ
          </CustomText>

          {faqData.map((item, index) => (
            <View key={index} className="bg-secondary rounded-xl mb-3 overflow-hidden">
              <TouchableOpacity 
                onPress={() => toggleExpand(index)}
                className="px-4 py-3"
              >
                <View className="flex-row justify-between items-center">
                  <CustomText className="text-primary flex-1 mr-2 text-left text-xl  font-bold">
                    {item.question}
                  </CustomText>
                  <Ionicons
                    name={expandedIndex === index ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#1A5A60"
                  />
                </View>
              </TouchableOpacity>
              
              {expandedIndex === index && (
                <View className="px-4 pb-4 pt-1  border-gray-200">
                  <CustomText className="text-lg leading-5">
                    {item.answer}
                  </CustomText>
                </View>
              )}
            </View>
          ))}
        </View>

       
      </ScrollView>
    </View>
  );
};

export default SupportCenter;