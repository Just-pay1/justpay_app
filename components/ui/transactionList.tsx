import React from "react";
import { View, Text } from "react-native";
import Pencilcoin from "@/assets/svg/pencilcoin.svg";

interface Props {
  transactions: any[];
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
      {[
        ...new Map(
          transactions.map((tx) => [
            `${tx.description}-${tx.amount}-${tx.date}`,
            tx,
          ])
        ).values(),
      ].map((transaction, index, array) => {
        const transactionDate = new Date(transaction.date);
        const formattedDate = transactionDate.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        const formattedTime = transactionDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        const statusColor =
          transaction.status === "confirmed"
            ? "color-primary"
            : transaction.status === "canceled"
              ? "color-danger"
              : "color-primary-foreground";

        const amountColor = "color-primary-foreground";

        return (
          <View key={index}>
            <View className="flex-row justify-between items-center p-3">
              <View>
                <Text className=" color-primary-foreground text-base">
                  {transaction.description}
                </Text>
                <Text className="text-muted text-sm mt-1">
                  {formattedDate} - {formattedTime}
                </Text>
              </View>
              <View className="items-end">
                <Text className={`text-base font-bold ${amountColor}`}>
                  {Math.abs(transaction.amount).toFixed(2)} EGP
                </Text>
                {transaction.status && (
                  <Text
                    className={`text-xs font-semibold capitalize mt-1 ${statusColor}`}>
                    {transaction.status === "confirmed"
                      ? "Approved"
                      : transaction.status === "canceled"
                        ? "Canceled"
                        : transaction.status}
                  </Text>
                )}
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
