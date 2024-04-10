interface IBaseSlice<T> {
  data: T;
  status: string;
  error: Error | Object | null | string;
}


export interface IClientSliceData {
  page: number;
  limit: number;
  data: Array<{ [key: string]: any }>;
}
export interface IClientSlice extends IBaseSlice<IClientSliceData> {}
