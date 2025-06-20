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
import TransactionList from "@/components/ui/transactionList";
import { getItem } from "expo-secure-store";
import useCustomQuery from "@/config/useCustomQuery";
import { useFocusEffect } from "@react-navigation/native";
interface WalletResponse {
  balance: number;
  idNumber: string;
}
const Wallet = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState<boolean>(true);
  const {
    data,
    error: balanceError,
    isLoading: balanceLoading,
    refetch: refetchBalance,
  } = useCustomQuery({
    queryKey: ["balance"],
    url: "/transactions/api/wallet/getBalance",
  });
  const {
    data: walletData,
    error: walletError,
    isLoading: walletLoading,
    refetch: refetchWallet,
  } = useCustomQuery({
    queryKey: ["wallet"],
    url: "/transactions/api/wallet/by-user",
  });

  useFocusEffect(
    React.useCallback(() => {
      refetchBalance();
      refetchWallet();
    }, [])
  );

  if (walletError || balanceError) {
    console.log({ error: walletError?.message || balanceError?.message });
  }
  const storedId = getItem("userId");
  const storedUsername = getItem("username");
  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
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
            }}
          >
            <Text className="p-0 text-secondary  text-xl font-bold  text-left pb-4 ">
              {storedUsername || "Guest"}@justpay
            </Text>
            {balanceLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size={"large"} color="#ffffff" />
              </View>
            ) : (
              <View className="flex-row items-baseline px-4 flex-nowrap">
                <Text
                  className=" color-secondary text-4xl font-extrabold"
                  numberOfLines={1}
                >
                  {Number(data.Balance || 0).toLocaleString("en-EG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
                <Text
                  className="color-secondary text-4xl font-semibold ml-1"
                  numberOfLines={1}
                >
                  EGP
                </Text>
              </View>
            )}

            <Text className="color-secondary text-right text-sm mt-4 ">
              {walletLoading
                ? ""
                : `**** **** **** ${walletData.walletId.slice(-4)}`}
            </Text>
          </LinearGradient>
        </View>

        <View className="flex-row justify-between mt-1 px-8">
          <PrimaryButton width="w-[45%]">
            <View className="flex-row items-center justify-center bg-primary">
              <CustomText className="color-secondary bg-primary">
                Deposit
              </CustomText>
              <Deposit width={18} height={18} color="white" />
            </View>
          </PrimaryButton>
          <PrimaryButton width="w-[45%]">
            <View className="flex-row items-center justify-center bg-primary">
              <CustomText className="color-secondary bg-primary">
                send
              </CustomText>
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
