import {
  View,
  Text,
  Pressable,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/ui/CustomInput";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams } from "expo-router";
import TransactionList from "@/components/ui/transactionList";
import useCustomQuery from "@/config/useCustomQuery";

type Transaction = {
  display: string;
  id: string;
  amount: string;
  type: string;
  description: string;
  date: string;
  time: string;
  logo: string;
};

const History = () => {
  const router = useRouter();

  const {
    data: transactionData,
    isLoading,
    error,
    refetch,
  } = useCustomQuery({
    queryKey: ["transaction-history"],
    // url: "/api/transaction/history",
    url: "/transactions/api/transaction/history",
  });

  const parsedTransactions = transactionData?.transactions || [];

  const [searchText, setSearchText] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (date) {
      setSelectedDate(date);
      const formatted = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      setSearchText(formatted);
    }
  };

  const filteredTransactions = parsedTransactions.filter(
    (tx: Transaction) =>
      tx.date.includes(searchText) ||
      tx.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-white ">
      <View className="flex-row items-center justify-between  mb-2 px-4">
        <Pressable
          onPress={() => router.push("/home/wallet")}
          style={{ paddingRight: 10 }}
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
        <Text className="text-3xl font-bold  text-[#2c7075] text-center flex-1 ">
          History
        </Text>
        <View style={{ width: 32 }} />
      </View>

      <View className="relative mt-4 mb-2 w-full px-6">
        <CustomInput
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
          style={{
            height: 48,
            borderColor: "#ccc",
            borderRadius: 12,
            borderWidth: 1,
            paddingHorizontal: 12,
            paddingRight: 44,
            backgroundColor: "#fff",
          }}
        />

        <Pressable
          onPress={() => setShowDatePicker(true)}
          style={{ position: "absolute", right: 30, top: 12 }}
        >
          <MaterialCommunityIcons
            name="calendar-month-outline"
            size={24}
            color="#2c7075"
          />
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#2c7075"
          style={{ marginTop: 40 }}
        />
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {parsedTransactions.length > 0 ? (
            <TransactionList transactions={filteredTransactions} />
          ) : (
            <Text className="text-center text-muted mt-10">
              No transactions found
            </Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default History;
