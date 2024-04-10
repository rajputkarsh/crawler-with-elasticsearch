import { AxiosResponseHeaders } from "axios";

export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";

export type ServiceParam = {
  method: ApiMethod;
  path: string;
  data: { [key: string]: any };
  headers: { [key: string]: any } | null;
  timeout: number;
};

export type FetchDataResponse = {
  data: Object | null;
  headers: Partial<AxiosResponseHeaders>;
  status: number;
};
