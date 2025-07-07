import CryptoJS from "crypto-js";
import * as Location from "expo-location";

function generateNonce(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function encryptData(billId?: string, receivedId?: string, amount?: number) {
  const timestamp = new Date().toISOString();
  const nonce = generateNonce();
  const secretKey = process.env.EXPO_PUBLIC_SECRET_KEY;

  let stringToSign: string;

  if (billId) {
    // For bill payments
    stringToSign = `${billId}|${timestamp}|${nonce}`;
  } else if (receivedId && amount) {
    // For money transfers
    stringToSign = `${receivedId}|${amount}|${timestamp}|${nonce}`;
  } else {
    throw new Error(
      "Either billId or (receivedId and amount) must be provided"
    );
  }

  const signature = CryptoJS.HmacSHA256(stringToSign, secretKey || "").toString(
    CryptoJS.enc.Hex
  );
  return { signature, timestamp, nonce };
}
const getCurrentLocation = async () => {
  try {
    // Request location permissions
    const { status } = await Location.requestForegroundPermissionsAsync();
    // if (status !== "granted") {
    //   console.log("Location permission denied");
    //   return null;
    // }
    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    return currentLocation;
  } catch (error) {
    return null;
  }
};

export { encryptData, getCurrentLocation };

export function getServiceName(serviceType: string) {
  if (serviceType.toLowerCase().includes("elec")) {
    return "electric bills";
  } else if (serviceType.toLowerCase().includes("water")) {
    return "water bills";
  } else if (serviceType.toLowerCase().includes("gas")) {
    return "gas bills";
  } else if (serviceType.toLowerCase().includes("internet")) {
    return "internet bills";
  } else if (
    serviceType.toLowerCase().includes("mob") ||
    serviceType.toLowerCase().includes("phone")
  ) {
    return "phone bills";
  } else if (serviceType.toLowerCase().includes("ref")) {
    return "Reference number";
  }
}

interface Service {
  id: string;
  service_type: string;
  merchants: {
    merchant_id: string;
    commercial_name: string;
  }[];
}

export const getFlattenedMerchants = (servicesData: any) => {
  return (
    servicesData?.data.rows.flatMap((service: Service) =>
      service.merchants.map(
        (merchant: { merchant_id: string; commercial_name: string }) => ({
          serviceId: service.id,
          serviceType: service.service_type,
          merchant,
        })
      )
    ) || []
  );
};
