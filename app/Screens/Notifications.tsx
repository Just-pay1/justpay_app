import { View, Text, Pressable, FlatList } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import NotificationCard from "@/components/ui/NotificationCard";
import { useState } from "react";

const mockNotifications = [
  {
    id: "1",
    title: "2B",
    subtitle: "Discount Up To 30% In Mobiles",
    isRead: false,
  },
  {
    id: "2",
    title: "2B",
    subtitle: "Discount Up To 30% In Mobiles",
    isRead: false,
  },
  {
    id: "3",
    title: "2B",
    subtitle: "Discount Up To 30% In Mobiles",
    isRead: false,
  },
  {
    id: "4",
    title: "2B",
    subtitle: "Discount Up To 30% In Mobiles",
    isRead: false,
  },
  {
    id: "5",
    title: "2B",
    subtitle: "Discount Up To 30% In Mobiles",
    isRead: false,
  },
  {
    id: "6",
    title: "2B",
    subtitle: "Discount Up To 30% In Mobiles",
    isRead: false,
  },
  {
    id: "7",
    title: "2B",
    subtitle: "Discount Up To 30% In Mobiles",
    isRead: false,
  },
  {
    id: "8",
    title: "2B",
    subtitle: "Discount Up To 30% In Mobiles",
    isRead: false,
  },
  {
    id: "9",
    title: "2B",
    subtitle: "Discount Up To 30% In Mobiles",
    isRead: false,
  },
  {
    id: "10",
    title: "2B",
    subtitle: "Discount Up To 30% In Mobiles",
    isRead: false,
  },
  {
    id: "11",
    title: "2B",
    subtitle: "Discount Up To 30% In Mobiles",
    isRead: false,
  },
  {
    id: "12",
    title: "2B",
    subtitle: "Discount Up To 30% In Mobiles",
    isRead: false,
  },
  {
    id: "13",
    title: "2B",
    subtitle: "Discount Up To 30% In Mobiles",
    isRead: false,
  },
  {
    id: "14",
    title: "2B",
    subtitle: "Discount Up To 30% In Mobiles",
    isRead: false,
  },
  {
    id: "15",
    title: "2B",
    subtitle: "Discount Up To 30% In Mobiles",
    isRead: false,
  },
];

const Notifications = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleNotificationPress = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead: true } : item))
    );

    console.log("Pressed notification:", id);
  };

  return (
    <View className="flex-1 mt-6 ">
      <View className="flex-row items-center justify-between  mb-8 px-4">
        <Pressable
          onPress={() => router.push("/home")}
          style={{ paddingRight: 10 }}>
          {({ pressed }) => (
            <Ionicons
              name="chevron-back-outline"
              size={32}
              color={pressed ? "#1f5e5c" : "#2c7075"}
              style={{ opacity: pressed ? 0.6 : 1 }}
            />
          )}
        </Pressable>
        <Text className="text-3xl font-bold  text-[#2c7075] text-center flex-1 ">
          Notifications
        </Text>
        <View style={{ width: 32 }} />
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        ItemSeparatorComponent={() => <View className="h-5" />}
        renderItem={({ item }) => (
          <NotificationCard
            title={item.title}
            subtitle={item.subtitle}
            isRead={item.isRead}
            onPress={() => handleNotificationPress(item.id)}
          />
        )}
      />
    </View>
  );
};

export default Notifications;
