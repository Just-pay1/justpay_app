import * as SecureStore from "expo-secure-store";

// Store tokens

export const storeTokens = async (
  user: string,
  userId: string,
  accessToken: string,
  refreshToken: string
) => {
  try {
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);
    await SecureStore.setItemAsync("userId", JSON.stringify(userId));
    await SecureStore.setItemAsync("user", JSON.stringify(user));
    console.log("Tokens stored successfully!");
  } catch (error) {
    console.error("SecureStore Error:", error);
  }
};
export const storeStatus = async (status: "true" | "false") => {
  try {
    await SecureStore.setItemAsync("isVerified", status);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Retrieve tokens
export const getTokens = async () => {
  try {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    const userId = await SecureStore.getItemAsync("userId");
    const user = await SecureStore.getItemAsync("user");
    const status = await SecureStore.getItemAsync("isVerified");
    return {
      accessToken,
      refreshToken,
      user,
      userId,
      status,
    };
  } catch (error) {
    console.error("SecureStore Error:", error);
    return null;
  }
};

// Remove tokens
export const removeTokens = async () => {
  try {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    await SecureStore.deleteItemAsync("userId");
    await SecureStore.deleteItemAsync("user");
    await SecureStore.deleteItemAsync("isVerified");
    console.log("Tokens removed successfully!");
  } catch (error) {
    console.error("SecureStore Error:", error);
  }
};
