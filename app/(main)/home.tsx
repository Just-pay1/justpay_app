import PrimaryButton from "@/components/ui/Custombutton";
import { logoutThunk } from "@/store/authSlice";
import { Fragment } from "react";
import { Text } from "react-native";
import { apiClient } from "@/config/axios.config";
import * as SecureStore from "expo-secure-store";
import { useAppDispatch } from "@/store/store";

const Home = () => {
  const handlersubmit = async () => {
    console.log("here again");
    try {
      console.log("hello");
      const accessToken = await SecureStore.getItemAsync("accessToken");
      const userId = await SecureStore.getItemAsync("userId");

      console.log("accessToken:", accessToken);
      console.log("userId:", userId);

      if (!accessToken || !userId) {
        console.warn("No token or userId found, skipping initial user fetch");
        console.log("No token or userId found, skipping initial user fetch");
        return;
      }

      const { data } = await apiClient.get(`/user/${userId}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const dispatch = useAppDispatch();
  return (
    <Fragment>
      <Text>Home</Text>
      <PrimaryButton onPress={() => dispatch(logoutThunk())}>
        <Text>logout</Text>
      </PrimaryButton>
      <PrimaryButton onPress={() => handlersubmit()}>
        <Text>get data</Text>
      </PrimaryButton>
    </Fragment>
  );
};

export default Home;
