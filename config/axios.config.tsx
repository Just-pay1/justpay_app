import axios, { InternalAxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";
import { removeTokens } from "./auth";
import { store } from "../store/store";
import { Alert } from "react-native";
import { logout } from "@/store/authSlice";
import { router } from "expo-router";

export const apiClient = axios.create({
  // baseURL: "http://192.168.1.12:3000",
  // baseURL: "https://identity0.azurewebsites.net",
  baseURL: "http://74.162.120.110:8000",
});
// export const apiWallet = axios.create({
//   baseURL: "https://e-wallet.azurewebsites.net/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
export const apiBilling = axios.create({
  baseURL: "https://billingservice1.azurewebsites.net/api",
});
export const apiRefNumBilling = axios.create({
  baseURL: "https://refererencenumber-akcug4h4d4fff8d9.canadacentral-01.azurewebsites.net/api",
});

// apiWallet.interceptors.request.use(
//   (config) => {
//     const userId = SecureStore.getItem("userId");
//     console.log(userId);
//     if (userId) {
//       config.headers["X-User-ID"] = userId;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig<any> {
  skipAuthRefresh?: boolean;
}

apiClient.interceptors.request.use(
  async (config: CustomAxiosRequestConfig) => {
    // Skip adding auth header for refresh token requests
    if (config.skipAuthRefresh) {
      return config;
    }

    const accessToken = await SecureStore.getItemAsync("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    const originalRequest = error.config;
    // console.log("Response Interceptor Error:", error.response?.status);
    if (
      error.response?.status === 402 &&
      !originalRequest._retry &&
      originalRequest.url !== "/refreshToken"
    ) {
      console.log("Starting refresh token process");
      try {
        const refreshToken = await SecureStore.getItemAsync("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token found");
        }
        originalRequest._retry = true;
        // Add explicit error handling for the refresh request
        const { data } = await apiClient.post(
          "/identity/refreshToken",
          {
            refreshToken,
          },
          {
            // Prevent this request from being intercepted to avoid infinite loops
            skipAuthRefresh: true,
            headers: {
              "Content-Type": "application/json",
            },
          } as CustomAxiosRequestConfig
        );

        console.log("Token refresh successful");
        await SecureStore.setItemAsync("accessToken", data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return apiClient(originalRequest);
      } catch (error) {
        console.log("Token refresh failed");
        Alert.alert(
          "Session Expired",
          "Your session has expired. Please login again.",
          [
            {
              text: "OK",
              onPress: () => {
                store.dispatch(logout());
                router.replace("/");
              },
            },
          ]
        );
        await removeTokens();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
