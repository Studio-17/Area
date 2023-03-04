import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Action } from "../models/actionModels";
import { Area, createAreaDto, updateAreaDto } from "../models/areaModels";
import {
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  LoginResponse,
} from "../models/authModel";
import { Service, ServiceInfo } from "../models/serviceModels";
import { RootState } from "../store/store";
// import { REACT_NATIVE_APP_API_URL } from "@env";

const API_ENDPOINT = "http://10.0.2.2:8080/api/reaccoon";

export const servicesApi = createApi({
  reducerPath: "servicesApi",
  tagTypes: ["Service", "Action", "Area"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_ENDPOINT}`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    services: builder.query<Service[], void>({
      query: () => "/service",
      providesTags: ["Service"],
    }),
    service: builder.query<ServiceInfo, string>({
      query: (name) => `/service/${name}`,
      providesTags: ["Service"],
    }),
    actions: builder.query<Action[], string>({
      query: (name) => `action/service/${name}`,
      providesTags: ["Action"],
    }),
    areas: builder.query<Area[], void>({
      query: () => "area",
      providesTags: ["Area"],
    }),
    addArea: builder.mutation<void, createAreaDto>({
      query: (area) => ({
        url: `area`,
        method: "POST",
        body: area,
      }),
      invalidatesTags: ["Area"],
    }),
    editArea: builder.mutation<
      void,
      { areaToUpdate: updateAreaDto; areaId: string }
    >({
      query: ({ areaToUpdate, areaId }) => ({
        url: `area/${areaId}`,
        method: "PATCH",
        body: areaToUpdate,
      }),
      invalidatesTags: ["Area"],
    }),
    deleteArea: builder.mutation<void, string>({
      query: (id) => ({
        url: `area/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Area"],
    }),
    area: builder.query<Area, string>({
      query: (id) => `area/${id}`,
      providesTags: ["Area"],
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "authentication/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (credentials) => ({
        url: "authentication/register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useServicesQuery,
  useServiceQuery,
  useActionsQuery,
  useAddAreaMutation,
  useAreasQuery,
  useEditAreaMutation,
  useDeleteAreaMutation,
  useAreaQuery,
  useLoginMutation,
  useRegisterMutation,
} = servicesApi;
