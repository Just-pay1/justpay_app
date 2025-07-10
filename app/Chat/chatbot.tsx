import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import useCustomQuery from "@/config/useCustomQuery";
import { getFlattenedMerchants, getServiceName } from "@/utils";
import RenderIcon from "@/components/ui/RenderIcon";
import { ServiceItem } from "@/components/services/ServicesSection";
interface Message {
  id: number;
  text: string;
  from: "user" | "bot";
  service?: string;
  showButtons?: boolean;
  merchants?: Array<{
    serviceId: string;
    serviceType: string;
    merchant: {
      id: string;
      commercial_name: string;
    };
  }>;
}
interface ApiResponse {
  response: string;
  Service: string;
}

const chatStyles = StyleSheet.create({
  serviceCard: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    margin: 4,
    width: "40%", // 4 cards per row with spacing
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

export default function ChatBotPage() {
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
    useCallback(() => {
      refetchServices();
    }, [])
  );
  const flattenedMerchants = getFlattenedMerchants(servicesData);
  const router = useRouter();

  // Custom ServiceItem component for chatbot with proper width
  const ChatServiceItem = ({
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
      style={chatStyles.serviceCard}
      onPress={() => {
        router.replace({
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
      <View style={chatStyles.iconContainer}>
        <RenderIcon
          serviceType={serviceType}
          commercialName={merchant.commercial_name}
        />
      </View>
      <Text
        style={chatStyles.serviceName}
        numberOfLines={2}
        ellipsizeMode="tail"
        adjustsFontSizeToFit={true}
      >
        {/* {merchant.commercial_name.split(" ").join("\n")} */}
        {merchant.commercial_name}
      </Text>
    </TouchableOpacity>
  );

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! How can I help you?", from: "bot" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const callChatbotAPI = async (userMessage: string): Promise<ApiResponse> => {
    try {
      const response = await axios.post(
        "https://customer-chatbot-f4gxejfbana5hwfc.uaenorth-01.azurewebsites.net/chat",
        {
          message: userMessage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error calling chatbot API:", error);
      return {
        response:
          "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        Service: "",
      };
    }
  };
  const onSend = async () => {
    if (!message.trim() || isLoading) return;
    const userMessage = message.trim();
    const newMessage: Message = {
      id: Date.now(),
      text: userMessage,
      from: "user",
    };
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    setIsLoading(true);
    try {
      const apiResponse = await callChatbotAPI(userMessage);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: apiResponse.response,
        from: "bot",
        service: apiResponse.Service,
        showButtons: apiResponse.Service !== "",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "I'm sorry, something went wrong. Please try again.",
        from: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  const handleNavigateToServices = (ser: string, messageId: number) => {
    const serviceName = getServiceName(ser);
    const filteredMerchants = flattenedMerchants.filter(
      (service: { serviceType: string }) => service.serviceType === serviceName
    );

    // Update the message to include the filtered merchants
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, merchants: filteredMerchants, showButtons: false }
          : msg
      )
    );
  };
  const handleHideButtons = (messageId: number) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, showButtons: false } : msg
      )
    );
  };
  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);
  return (
    <LinearGradient colors={["#e0f7f6", "#ffffff"]} className="flex-1 ">
      {/* Header  */}

      <View className="relative pt-6 pb-3 items-center justify-center">
        <Pressable
          onPress={() => router.back()}
          className="absolute left-5 top-6"
        >
          {({ pressed }) => (
            <Ionicons
              name="chevron-back-outline"
              size={32}
              color={pressed ? "#1f5e5c" : "#2c7075"}
              style={{ opacity: pressed ? 0.6 : 1 }}
            />
          )}
        </Pressable>

        <Text className="text-xl font-semibold text-[#2c7075] ">
          Justpay Assistant
        </Text>
      </View>
      {/*messages */}
      <View className="flex-1 px-4">
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{ paddingVertical: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <View key={msg.id}>
              <View
                className={`mb-2 max-w-[80%] px-6 py-4 rounded-2xl border ${
                  msg.from === "user"
                    ? "bg-[#2c7075] self-end rounded-br-none  border-[#2c7075]  "
                    : "bg-secondary self-start rounded-bl-none border-[#2c7075] "
                }`}
              >
                <Text
                  className={`text-[18px] leading-[26px] tracking-[0.3px] font-[FamilyMain] ${
                    msg.from === "user" ? "color-secondary" : "color-primary"
                  }`}
                >
                  {msg.text}
                </Text>
              </View>

              {/* Navigation buttons for bot messages with service */}
              {msg.from === "bot" && msg.showButtons && msg.service && (
                <View className="mb-2 max-w-[80%] self-start">
                  <Text className="text-[16px] font-semibold color-primary mb-2 ml-2">
                    Do you want to navigate to pay the bill?
                  </Text>
                  <View className="flex-row gap-2 ml-2">
                    <Pressable
                      onPress={() =>
                        handleNavigateToServices(msg.service!, msg.id)
                      }
                      className="bg-[#2c7075] px-4 py-2 rounded-lg"
                    >
                      <Text className="text-white font-semibold">Yes</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => handleHideButtons(msg.id)}
                      className="bg-gray-300 px-4 py-2 rounded-lg"
                    >
                      <Text className="text-gray-700 font-semibold">No</Text>
                    </Pressable>
                  </View>
                </View>
              )}

              {/* Merchant cards display */}
              {msg.from === "bot" &&
                msg.merchants &&
                msg.merchants.length > 0 && (
                  <View className="mb-2 w-full self-start">
                    <Text className="text-[16px] font-semibold color-primary mb-2 ml-2">
                      Please select a merchant to pay your bill:
                    </Text>
                    <View className="flex-row flex-wrap justify-around gap-y-3 w-full">
                      {msg.merchants.map((merchant) => (
                        <ChatServiceItem
                          key={merchant.merchant.id}
                          merchant={merchant.merchant}
                          serviceType={merchant.serviceType}
                          serviceId={merchant.serviceId}
                        />
                      ))}
                    </View>
                  </View>
                )}
            </View>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <View className="mb-2 max-w-[80%] px-6 py-4 rounded-2xl border bg-secondary self-start rounded-bl-none border-[#2c7075]">
              <View className="flex-row items-center">
                <ActivityIndicator size="small" color="#2c7075" />
                <Text className="text-[16px] color-primary ml-2">
                  Typing...
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
      {/* */}
      <View className="px-4 pt-2 pb-6 bg-white">
        <View className="flex-row items-center gap-3 ">
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message..."
            className="flex-1 h-14 border border-[#2c7075] rounded-xl px-4 text-gray-500  text-[13px]"
            editable={!isLoading}
          />

          <Pressable
            onPress={onSend}
            disabled={!message.trim() || isLoading}
            className={`w-14 h-14 rounded-full items-center justify-center ml-2 ${
              !message.trim() || isLoading ? "bg-gray-300" : "bg-[#2c7075]"
            }`}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Ionicons
              name="send"
              size={26}
              color={!message.trim() || isLoading ? "#666" : "white"}
            />
          </Pressable>
        </View>
        <Text className="text-center color-muted text-[12px] mt-2">
          This conversation may be monitored and recorded for security and
          quality purposes.
        </Text>
      </View>
    </LinearGradient>
  );
}
