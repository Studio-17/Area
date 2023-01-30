import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Action } from "../models/actionModels";
import { Area, createAreaDto } from "../models/areaModels";
import { Service } from "../models/serviceModels";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPONT;

export const servicesApi = createApi({
  reducerPath: "servicesApi",
  tagTypes: ["Service", "Action", "Area"],
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
    areas: builder.query<Area[], void>({
      query: () => "api/area",
      providesTags: ["Area"],
    }),
    addArea: builder.mutation<void, createAreaDto>({
      query: (area) => ({
        url: `api/area`,
        method: "POST",
        body: area,
      }),
      invalidatesTags: ["Area"],
    }),
    deleteArea: builder.mutation<void, string>({
      query: (id) => ({
        url: `api/area/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Area"],
    }),
    area: builder.query<Area, string>({
      query: (id) => `api/area/${id}`,
      providesTags: ["Area"],
    }),
  }),
});

export const {
  useServicesQuery,
  useActionsQuery,
  useAddAreaMutation,
  useAreasQuery,
  useDeleteAreaMutation,
  useAreaQuery,
} = servicesApi;
