type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";

type ApiConfig = {
  [outerKey: string]: {
    [innerKey: string]: {
      method: ApiMethod;
      path: string;
    };
  };
};

const BACKEND_ROUTES = {
  client: `${import.meta.env.API_BASE_URL}/api/client`,
};

const apiConfig: ApiConfig = {
  client: {
    fetch: {
      method: "GET",
      path: BACKEND_ROUTES.client,
    },
    add: {
      method: "POST",
      path: BACKEND_ROUTES.client,
    },
    update: {
      method: "PATCH",
      path: BACKEND_ROUTES.client,
    },
    delete: {
      method: "DELETE",
      path: BACKEND_ROUTES.client,
    },
  },

} as const;

const apiTypes = Object.keys(apiConfig);
type ApiType = (typeof apiTypes)[number];

const apiNames: Array<string> = [];
for (let apiCollection of Object.values(apiConfig)) {
  apiNames.push(...Object.keys(apiCollection));
}
type ApiName = (typeof apiNames)[number];

const getApiConfig = (
  apiType: ApiType,
  apiName: ApiName
): { method: ApiMethod; path: string } => {
  const result = apiConfig?.[apiType]?.[apiName];

  if (!result) throw new Error("Invalid params for API Config");
  return result;
};

export default getApiConfig;
