import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "@/components/ui/CustomText";
import { useState, useRef, useEffect } from "react";

export default function ChatBotPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! How can I help you?", from: "bot" },
    { id: 2, text: "I want to pay my electricity bill.", from: "user" },
  ]);

  const scrollRef = useRef<ScrollView>(null);

  const onSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      from: "user",
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    // bot
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Sure, let me help you with that.",
          from: "bot",
        },
      ]);
    }, 1000);
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
          contentContainerStyle={{ paddingVertical: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
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
          ))}
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
          />

          <Pressable
            onPress={onSend}
            disabled={!message.trim()}
            className="w-14 h-14 bg-[#2c7075] rounded-full items-center justify-center ml-2"
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Ionicons name="send" size={26} color="white" />
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
