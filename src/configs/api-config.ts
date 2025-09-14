import type { ApiErrorResponse } from "@/constants/types";
import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? "v1" : "https://api-steffansim-fleetify.zeabur.app/v1",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const isAxiosError = (error: any): error is AxiosError<ApiErrorResponse> => {
  return error?.isAxiosError === true;
};
