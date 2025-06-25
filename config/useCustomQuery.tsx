import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { apiBilling, apiClient } from "./axios.config";

interface IAuthenticatedQuery {
  queryKey: string[];
  url: string;
  config?: AxiosRequestConfig;
  whichInstance?: "apiClient" | "apiBilling";
}

const useCustomQuery = ({
  queryKey,
  url,
  config,
  whichInstance = "apiClient",
}: IAuthenticatedQuery) => {
  const instance = whichInstance === "apiBilling" ? apiBilling : apiClient;
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await instance.get(url, config);
      return data;
    },
  });
};

export default useCustomQuery;
