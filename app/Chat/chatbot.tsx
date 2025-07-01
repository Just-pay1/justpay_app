import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";
interface Message {
  id: number;
  text: string;
  from: "user" | "bot";
  tool_calls?: any;
  showButtons?: boolean;
}
interface ApiResponse {
  response: string;
  tool_calls: any;
}
export default function ChatBotPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! How can I help you?", from: "bot" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const callChatbotAPI = async (userMessage: string): Promise<ApiResponse> => {
    try {
      const response = await fetch(
        "https://customer-chatbot-f4gxejfbana5hwfc.uaenorth-01.azurewebsites.net/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error calling chatbot API:", error);
      return {
        response:
          "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        tool_calls: null,
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
        tool_calls: apiResponse.tool_calls,
        showButtons: apiResponse.tool_calls !== null,
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
  const handleNavigateToServices = (typeOfTransaction: string) => {
    router.push({
      pathname: "/(main)/home",
      params: { typeOfTransaction },
    });
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

              {/* Navigation buttons for bot messages with tool_calls */}
              {msg.from === "bot" && msg.showButtons && msg.tool_calls && (
                <View className="mb-2 max-w-[80%] self-start">
                  <Text className="text-[16px] font-semibold color-primary mb-2 ml-2">
                    Do you want to navigate to pay the bill?
                  </Text>
                  <View className="flex-row gap-2 ml-2">
                    <Pressable
                      onPress={() =>
                        handleNavigateToServices(
                          msg.tool_calls.type_of_transaction
                        )
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
