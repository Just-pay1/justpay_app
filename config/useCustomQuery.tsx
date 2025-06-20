import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { apiBilling, apiClient, apiWallet } from "./axios.config";

interface IAuthenticatedQuery {
  queryKey: string[];
  url: string;
  config?: AxiosRequestConfig;
  whichInstance?: "apiWallet" | "apiClient" | "apiBilling"  ;
}

const useCustomQuery = ({
  queryKey,
  url,
  config,
  whichInstance = "apiWallet",
}: IAuthenticatedQuery) => {
  const instance =
    whichInstance === "apiWallet"
      ? apiWallet
      : whichInstance === "apiClient"
        ? apiClient
        : apiBilling;
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await instance.get(url, config);
      return data;
    },
  });
};

export default useCustomQuery;
