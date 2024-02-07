import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const backendURL = "/";

const api = createApi({
    reducerPath: 'api',

    baseQuery: fetchBaseQuery({
        baseUrl: backendURL,

        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ["User", "Class"],

    endpoints: (builder) => ({
        //<-----------AUTHORIZATION----------->
        //REGISTER ACCOUNT ENDPOINT
        register: builder.mutation({
            query: (user) => ({
                url: `/auth/register`,
                method: 'POST',
                body: user,
            }),
            providesTags: ["User"]
        }),
        //LOGIN ACCOUNT 
        login: builder.mutation({
            query: (user) => ({
                url: `/auth/login`,
                method: 'POST',
                body: user,
            }),
            providesTags: ["User"]
        }),
        //<------------GET USER INFO------------>
        //GET USER
        getUser: builder.query({
            query: () => ({
                url: `/auth/account`,
                method: 'GET',
            }),
            providesTags: ["User"]
        }),
        getClasses: builder.query({
            query: () => ({
                url: `/api/my_classes`,
                method: 'GET'
            }),
            providesTags: ["Class"]
        }),
        postNewClass: builder.mutation({
            query: (newClass) => ({
                url: `/api/class`,
                method: 'POST',
                body: newClass,
            }),
            invalidatesTags: ["Class"]
        }),
    })
});
export default api;
export const {
    //Authorization
    useRegisterMutation,
    useLoginMutation,
    useGetUserQuery,
    //User Information
    useGetClassesQuery,
    usePostNewClassMutation,
} = api