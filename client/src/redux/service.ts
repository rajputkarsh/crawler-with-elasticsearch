import { DEFAULT_HEADERS } from "../constants/fetch";
import { FetchDataResponse, ServiceParam } from "../interfaces/service";
import { toast } from "react-toastify";
import Axios from "axios";

const axios = Axios.create({
  withCredentials: true,
  responseType: "json",
});

export const fetchData = ({
  method,
  path,
  data,
  headers,
  timeout = 30000,
}: ServiceParam): Promise<FetchDataResponse> => {
  const requestConfig: { [key: string]: any } = {
    url: path,
    method: method,
    ...(method !== "GET" ? data : {}),
    ...(timeout ? { timeout } : {}),
  };

  if (headers) {
    requestConfig["headers"] = headers;
  }

  requestConfig["headers"] = {
    ...DEFAULT_HEADERS,
    ...requestConfig["headers"],
  };

  if (method === "GET") {
    requestConfig["params"] = data;
  } else {
    requestConfig["data"] = data;
  }

  return new Promise((resolve, reject) => {
    axios(requestConfig)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          resolve({
            data: response.data,
            status: response.status,
            headers: response.headers,
          });
        } else {
          const error = new Error();
          reject(error);
        }
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          // frontend offline or backend not working
          toast("Something went wrong");
        } else {
          reject(error?.response?.data || error);
        }
      });
  });
};
