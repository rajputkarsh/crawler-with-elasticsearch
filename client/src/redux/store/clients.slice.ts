import {
  createSlice,
  createAsyncThunk,
  createSelector,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { fetchData } from "../service";
import getApiConfig from "../config";
import { DEFAULT_API_TIMEOUT } from "../../constants/common";
import { AppState } from ".";
import { IClientSlice, IClientSliceData } from "../../interfaces/slice";

export const fetchClientsList = createAsyncThunk(
  "client/list",
  (data: { page: number; limit: number }, thunk) => {
    const apiData = getApiConfig("client", "fetch");

    return fetchData({
      ...apiData,
      data,
      headers: null,
      timeout: DEFAULT_API_TIMEOUT,
    }).catch((error) => {
      throw error;
    });
  }
);

export const fetchClientById = createAsyncThunk(
  "client/list-by-id",
  ({ id }: { id: string }, thunk) => {
    const apiData = getApiConfig("client", "fetch");
    const path = `${apiData["path"]}/${id}`;

    return fetchData({
      ...apiData,
      path,
      data: {},
      headers: null,
      timeout: DEFAULT_API_TIMEOUT,
    }).catch((error) => {
      throw error;
    });
  }
);

export const addClient = createAsyncThunk(
  "client/add",
  (data: Object, thunk) => {
    const apiData = getApiConfig("client", "add");

    return fetchData({
      ...apiData,
      data: data,
      headers: null,
      timeout: DEFAULT_API_TIMEOUT,
    }).catch((error) => {
      throw error;
    });
  }
);

export const updateClient = createAsyncThunk(
  "client/update",
  (data: { [key: string]: any }, thunk) => {
    const { id, ...apiPayload } = data;
    const apiData = getApiConfig("client", "update");
    const path = `${apiData["path"]}/${id || ""}`;

    return fetchData({
      ...apiData,
      data: apiPayload,
      path,
      headers: null,
      timeout: DEFAULT_API_TIMEOUT,
    }).catch((error) => {
      throw error;
    });
  }
);

export const deleteClient = createAsyncThunk(
  "client/delete",
  (data: { id: string }, thunk) => {
    const apiData = getApiConfig("client", "delete");
    const path = `${apiData["path"]}/${data.id}`;

    return fetchData({
      ...apiData,
      path,
      data: {},
      headers: null,
      timeout: DEFAULT_API_TIMEOUT,
    }).catch((error) => {
      throw error;
    });
  }
);



export const searchClients = createAsyncThunk(
  "client/search",
  (data: { term: string }, thunk) => {
    const apiData = getApiConfig("client", "search");

    return fetchData({
      ...apiData,
      data: {q: data.term},
      headers: null,
      timeout: DEFAULT_API_TIMEOUT,
    }).catch((error) => {
      throw error;
    });
  }
);

const initialData: IClientSlice = {
  data: {
    page: 1,
    limit: 25,
    count: 0,
    data: [],
    searchKey: "",
    searchResults: [],
  },
  status: "idle",
  error: null,
};

export const clientSlice = createSlice({
  name: "client",
  initialState: initialData,
  reducers: {
    incrementPageNumber: (state) => {
      state.data.page = state.data.page + 1
      return state;
    },
    resetSearch: (state) => {
      state.data.searchKey = "";
      state.data.searchResults = [];
      return state;
    }
  },
  extraReducers: (
    builders: ActionReducerMapBuilder<{
      data: IClientSliceData;
      status: string;
      error: {} | null;
    }>
  ) => {
    builders.addCase(fetchClientsList.pending, (state, action) => {
      state.status = "loading";
    });
    builders.addCase(fetchClientsList.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error;
    });
    builders.addCase(fetchClientsList.fulfilled, (state, action: any) => {
      state.status = "succeeded";
      const { page, limit, data, count } = action?.payload?.data?.data || {};
      if (page) {
        state.data.page = page;
      }
      if (limit) {
        state.data.limit = limit;
      }
      if (count) {
        state.data.count = count;
      }
      if (data && Array.isArray(data)) {
        state.data.data = [...state.data.data, ...data];
      }
      state.error = null;
    });
    builders.addCase(fetchClientById.pending, (state, action) => {
      state.status = "loading";
    });
    builders.addCase(fetchClientById.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error;
    });
    builders.addCase(fetchClientById.fulfilled, (state, action: any) => {
      state.status = "succeeded";
      const newClient = action.payload?.data?.data;
      const clients: Array<any> = JSON.parse(
        JSON.stringify(state.data.data || [])
      );

      let index = clients.findIndex((e) => e?.uuid === newClient?.uuid);

      if (index >= 0) {
        clients[index] = newClient;
      } else {
        clients.push(newClient);
      }
      state.data.data = clients;
      state.error = null;
    });
    builders.addCase(searchClients.pending, (state, action) => {
      state.status = "loading";
    });
    builders.addCase(searchClients.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error;
    });
    builders.addCase(searchClients.fulfilled, (state, action: any) => {
      state.status = "succeeded";
      const { page, limit, data, count } = action?.payload?.data?.data || {};
      if (data && Array.isArray(data)) {
        state.data.searchKey = action?.meta?.arg?.term || ""; 
        state.data.searchResults = [...data];
      }
      state.error = null;
    });
  },
});

const selectClientRootState = (state: AppState): IClientSlice => state.clients;

export const getPageNumber = createSelector<
  [(state: AppState) => IClientSlice],
  number
>(
  [selectClientRootState],
  (clientState: IClientSlice) => clientState?.data?.page || 1
);

export const getPageLimit = createSelector<
  [(state: AppState) => IClientSlice],
  number
>(
  [selectClientRootState],
  (clientState: IClientSlice) => clientState?.data?.limit || 25
);

export const getTotalCount = createSelector<
  [(state: AppState) => IClientSlice],
  number
>(
  [selectClientRootState],
  (clientState: IClientSlice) => clientState?.data?.count
);

export const getClients = createSelector<
  [(state: AppState) => IClientSlice],
  Array<{ [key: string]: any }>
>(
  [selectClientRootState],
  (clientState: IClientSlice) => clientState?.data?.data || []
);

export const getClientById = (uuid: string | undefined) =>
  createSelector<[(state: AppState) => IClientSlice], { [key: string]: any }>(
    [selectClientRootState],
    (clientState: IClientSlice) =>
      (clientState?.data?.data || []).find((client) => client?.uuid === uuid) || {}
  );

export const getSearchClients = createSelector<
  [(state: AppState) => IClientSlice],
  Array<{ [key: string]: any }>
>(
  [selectClientRootState],
  (clientState: IClientSlice) => clientState?.data?.searchResults || []
);

export const getSearchKey = createSelector<
  [(state: AppState) => IClientSlice],
  string
>(
  [selectClientRootState],
  (clientState: IClientSlice) => clientState?.data?.searchKey || ""
);

export const { incrementPageNumber, resetSearch } = clientSlice.actions;

export default clientSlice.reducer;
