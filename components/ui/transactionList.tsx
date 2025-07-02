import React from "react";
import { View, Text, Image } from "react-native";
import Pencilcoin from "@/assets/svg/pencilcoin.svg";

export type Transaction = {
  display: string;
  id: string;
  amount: string;
  type: string;
  description: string;
  date: string;
  time: string;
  logo: string;
};

interface Props {
  transactions: Transaction[];
}

const TransactionList: React.FC<Props> = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <View className="items-center justify-center mt-10 mb-10">
        <Pencilcoin width={80} height={80} />
        <Text className="color-primary-foreground text-center text-lg mt-4">
          You have no transaction yet!
        </Text>
      </View>
    );
  }

  return (
    <View className="px-5 mt-3">
      {transactions.map((transaction, index, array) => {
        return (
          <View key={transaction.id}>
            <View className="flex-row justify-between items-start py-4">
              {/* Logo */}
              <View className="w-10 h-10  rounded-full items-center justify-center mr-3 mt-1">
                <Image
                  source={require("@/assets/images/1924a99473c91bfdac585c9cc9c2bc58.png")}
                  style={{ width: 22, height: 22 }}
                  resizeMode="contain"
                />
              </View>

              {/*  Disply /Description / Date */}
              <View className="flex-1">
                <Text className="text-xl  font-bold text-primaryforeground mb-1">
                  {transaction.display}
                </Text>
                <Text
                  className="font-base  text-primary-foreground"
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {transaction.description}
                </Text>
                <View className="flex-row mt-2">
                  <Text className="text-sm text-muted">{transaction.date}</Text>
                  <View style={{ width: 16 }} />
                  <Text className="text-sm   text-muted">
                    {transaction.time}
                  </Text>
                </View>
              </View>

              {/*  Amount */}
              <View className="items-end ml-2">
                <Text className=" font-bold text-xl text-primary-foreground">
                  {parseFloat(transaction.amount).toFixed(2)} EGP
                </Text>
              </View>
            </View>

            {index !== array.length - 1 && (
              <View className="border-b border-[#334d4f] opacity-40 mx-2" />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default TransactionList;
