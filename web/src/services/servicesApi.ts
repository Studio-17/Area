import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddServiceDto, Service, DeleteServiceDto } from "../models/serviceModels";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPONT;

export const servicesApi = createApi({
  reducerPath: "servicesApi",
  tagTypes: ["Service"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_ENDPOINT}`,
  }),
  endpoints: (builder) => ({
    services: builder.query<Service[], void>({
      query: () => "/services",
      providesTags: ["Service"],
    }),
    service: builder.query<Service, string>({
      query: (id) => `/service/${id}`,
      providesTags: ["Service"],
    }),
    addService: builder.mutation<any, AddServiceDto>({
      query: (service) => ({
        url: "/service",
        method: "POST",
        bordy: service,
      }),
      invalidatesTags: ["Service"],
    }),
    deleteService: builder.mutation<any, DeleteServiceDto>({
      query: (service) => ({
        url: "/service",
        method: "DELETE",
        body: service,
      }),
    }),
  }),
});
