import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomText from "@/components/ui/CustomText";
import Walletvector from "@/assets/svg/walletvector.svg";
import Deposit from "@/assets/svg/deposit.svg";
import PrimaryButton from "@/components/ui/Custombutton";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import { apiClient } from "@/config/axios.config";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import TransactionList from "@/components/ui/transactionList";
import { getItemAsync } from "expo-secure-store";

interface WalletResponse {
  balance: number;
  idNumber: string;
}

const Wallet: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const [transactions, setTransactions] = useState<any[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState<boolean>(true);

  const [idHidden, setIdHidden] = useState<string>("");
  const [loadingId, setLoadingId] = useState<boolean>(true);

  const [username, setUsername] = useState<string | null>(null);
  const [loadingUsername, setLoadingUsername] = useState<boolean>(true);

  const [userId, setUserId] = useState<string | null>(null);
  const [loadingUserId, setLoadingUserId] = useState(true);

  // fetch username , userid  from securestore
  useEffect(() => {
    const fetchUserData = async () => {
      const storedId = await getItemAsync("userId");
      const storedUsername = await getItemAsync("username");

      if (storedId) setUserId(storedId); // Only set userId if it exists
      if (storedUsername) setUsername(storedUsername); // Only set username if it exists

      setLoadingUserId(false);
      setLoadingUsername(false);
    };
    fetchUserData();
  }, []);

  // Fetch balance when userId is available
  useFocusEffect(
    React.useCallback(() => {
      if (!userId) return; // If userId is not available, don't proceed
      const fetchBalance = async () => {
        setLoading(true);
        try {
          const response = await apiClient.get<WalletResponse>(
            "/wallet/getBalance",
            {
              headers: { "X-User-ID": userId },
            }
          );
          setBalance(response.data.balance);
          Toast.show({
            type: "success",
            text1: "Balance updated",
            text2: `Your new balance is ${response.data.balance} EGP`,
          });
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Connection Error",
            text2: "Failed to fetch balance. Please try again.",
            position: "bottom",
          });
        } finally {
          setLoading(false);
        }
      };

      if (userId) {
        fetchBalance();
      }
    }, [userId]) // run when userid changes
  );

  // Fetch transactions and ID Number when userId is available
  useEffect(() => {
    const fetchTransactionsAndId = async () => {
      if (!userId) return; // If userId is not available, don't proceed

      setLoadingTransactions(true);
      setLoadingId(true);

      try {
        const [transactionRes, idRes] = await Promise.all([
          apiClient.get("/transaction/history", {
            headers: { "X-User-ID": userId },
          }),
          apiClient.get("/wallet/by-user", {
            headers: { "X-User-ID": userId },
          }),
        ]);
        setTransactions(transactionRes.data.transactions);
        setIdHidden("**** **** **** " + idRes.data.idNumber.slice(-4));
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Connection Error",
          text2: "Failed to fetch data. Please try again.",
          position: "bottom",
        });
      } finally {
        setLoadingTransactions(false);
        setLoadingId(false);
      }
    };

    if (userId) {
      fetchTransactionsAndId();
    }
  }, [userId]);

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <View className="flex-1">
        <View style={styles.container}>
          <LinearGradient
            colors={["#081C1C", "#113E41", "#1A5A60"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{
              borderRadius: 20,
              paddingVertical: 20,
              paddingHorizontal: 16,
            }}>
            {loadingUsername ? (
              <ActivityIndicator size="large" color="#000" />
            ) : (
              <Text className="p-0 color-[rgba(255,255,255,0.8)]  text-xl font-bold  text-left pb-4 ">
                {username || "Guest"}@justpay
              </Text>
            )}

            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <View className="flex-row items-baseline px-4 mt-2 flex-nowrap">
                <Text
                  className=" color-secondary text-4xl font-extrabold"
                  numberOfLines={1}>
                  {Number(balance).toLocaleString("en-EG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
                <Text
                  className="color-secondary text-4xl font-semibold ml-1"
                  numberOfLines={1}>
                  EGP
                </Text>
              </View>
            )}

            {loadingId ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="color-secondary text-right text-sm pt-8 ">
                {"**** **** **** " + idHidden.slice(-4)}
              </Text>
            )}
          </LinearGradient>
        </View>

        <View className="flex-row justify-between mt-1 px-8">
          <PrimaryButton
            width="w-[45%]"
            bgColor="bg-primary"
            borderColor="border-primary">
            <View className="flex-row items-center justify-center ">
              <CustomText className="color-secondary">Deposit</CustomText>
              <Deposit width={18} height={18} color="white" />
            </View>
          </PrimaryButton>

          <PrimaryButton
            width="w-[45%]"
            bgColor="bg-primary"
            borderColor="border-primary">
            <View className="flex-row items-center justify-center">
              <CustomText className="color-secondary ">send</CustomText>
              <Walletvector width={18} height={18} color="white" />
            </View>
          </PrimaryButton>
        </View>

        <View className="items-center">
          <View className="flex-row items-center justify-between w-full px-5">
            <Text className="color-primary-foreground text-3xl font-bold">
              Transaction
            </Text>
            <TouchableOpacity>
              <CustomText className="color-muted text-xl">See All</CustomText>
            </TouchableOpacity>
          </View>
          <View className="border-b border-muted w-[90%] mt-1" />
        </View>

        {loadingTransactions ? (
          <ActivityIndicator size="large" color="#2c7075" />
        ) : (
          <TransactionList transactions={transactions} />
        )}
      </View>
    </ScrollView>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: "hidden",
    marginHorizontal: 20,
    marginTop: 14,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});
