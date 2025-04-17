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
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import TransactionList from "@/components/ui/transactionList";

interface WalletResponse {
  balance: number;
}

const Wallet: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [initialLoaded, setInitialLoaded] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState<boolean>(true);

  // read local balance
  useEffect(() => {
    const getStoredBalance = async () => {
      try {
        const storedBalance = await SecureStore.getItemAsync("wallet_balance");
        if (storedBalance) {
          setBalance(parseFloat(storedBalance));
        }
      } catch (e) {
        console.log("Error reading stored balance:", e);
      } finally {
        setInitialLoaded(true);
      }
    };
    getStoredBalance();
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<WalletResponse>("/api/wallet/");
        const fetchedBalance = response.data.balance;

        if (initialLoaded && fetchedBalance !== balance) {
          setBalance(fetchedBalance);

          await SecureStore.setItemAsync(
            "wallet_balance",
            fetchedBalance.toString()
          ); // store

          Toast.show({
            type: "success",
            text1: "Balance updated",
            text2: `Your new balance is ${fetchedBalance} EGP`,
          });
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
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

    fetchBalance();
  }, [initialLoaded]);

  // Transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoadingTransactions(true);
      try {
        const response = await apiClient.get("/api/transaction/history");

        // Assuming response is: { transactions: [...] }
        const fetchedTransactions = response.data.transactions;

        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        Toast.show({
          type: "error",
          text1: "Connection Error",
          text2: "Failed to fetch transactions. Please try again.",
          position: "bottom",
        });
      } finally {
        setLoadingTransactions(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <View className="flex-1">
        <View className="px-5">
          <Text className="color-primary-foreground text-left text-4xl">
            Wallet
          </Text>
        </View>

        <View style={styles.container}>
          <LinearGradient
            colors={["#081C1C", "#113E41", "#1A5A60"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ borderRadius: 16, padding: 10 }}>
            <CustomText className="color-secondary text-left text-md pt-1">
              Total Balance
            </CustomText>
            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text className="color-secondary text-left text-3xl pt-3 p-3 ">
                {balance} EGP
              </Text>
            )}
            <Text className="color-secondary text-right text-sm pt-3 p-4 ">
              **** **** ****
            </Text>
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
            <CustomText className="color-primary-foreground text-3xl">
              Transation
            </CustomText>
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
