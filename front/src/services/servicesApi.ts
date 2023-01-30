import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Action } from "../models/actionModels";
import { Service } from "../models/serviceModels";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPONT;

export const servicesApi = createApi({
  reducerPath: "servicesApi",
  tagTypes: ["Service", "Action"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_ENDPOINT}`,
  }),
  endpoints: (builder) => ({
    services: builder.query<Service[], void>({
      query: () => "/api/service",
      providesTags: ["Service"],
    }),
    service: builder.query<Service, string>({
      query: (id) => `/service/${id}`,
      providesTags: ["Service"],
    }),
    actions: builder.query<Action[], string>({
      query: (id) => `api/action/service/${id}`,
      providesTags: ["Action"],
    }),
  }),
});

export const { useServicesQuery, useActionsQuery } = servicesApi;
