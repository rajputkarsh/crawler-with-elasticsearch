import dayjs from "dayjs";
import { IClient } from "../interfaces/Client";

export const DEFAULT_CLIENT_FIELDS: IClient = {
  name: "",
  email: "",
  registrationDate: dayjs().format('YYYY-MM-DD'),
  companyCategory: "",
  companySubCategory: "",
  companyClass: "",
  cin: "",
  pin: "",
  state: "",
  address: "",
  roc: "",
  status: "",
};