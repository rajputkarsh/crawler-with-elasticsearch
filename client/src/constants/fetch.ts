import dayjs from "dayjs";

export const DEFAULT_HEADERS = {
  timezone: dayjs().utcOffset(),
} as const;
