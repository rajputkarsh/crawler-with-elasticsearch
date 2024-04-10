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
  (data: { [key: string]: any }, thunk) => {
    const apiData = getApiConfig("client", "fetch");

    return fetchData({
      ...apiData,
      data: {},
      headers: null,
      timeout: DEFAULT_API_TIMEOUT,
    }).catch((error) => {
      throw error;
    });
  }
);

export const fetchClientById = createAsyncThunk(
  "client/list-by-id",
  (data: { id: string }, thunk) => {
    const apiData = getApiConfig("client", "fetch");

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

const initialData: IClientSlice = {
  data: {
    page: 1,
    limit: 25,
    data: [],
  },
  status: "idle",
  error: null,
};

export const clientSlice = createSlice({
  name: "client",
  initialState: initialData,
  reducers: {},
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
      const { page, limit, data } = action?.payload?.data?.data || {};
      if (page) {
        state.data.page = page;
      }
      if (limit) {
        state.data.limit = limit;
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

      let index = clients.findIndex(
        (e) => e?.uuid === newClient?.uuid
      );

      if (index >= 0) {
        clients[index] = newClient;
      } else {
        clients.push(newClient);
      }
      state.data.data = clients;
      state.error = null;
    });
  },
});

const selectClientRootState = (state: AppState): IClientSlice => state.clients;

export const getClients = createSelector<
  [(state: AppState) => IClientSlice],
  Array<{ [key: string]: any }>
>(
  [selectClientRootState],
  (clientState: IClientSlice) => clientState?.data?.data || []
);

export default clientSlice.reducer;
