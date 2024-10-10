import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import routes from "@/routes/routes.js";

const baseQuery = fetchBaseQuery({
  baseUrl: routes.defaultApiPath(),
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const api = createApi({
  baseQuery,
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (newUser) => ({
        url: routes.signUpPage(),
        method: "POST",
        body: newUser,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: routes.loginPage(),
        method: "POST",
        body: credentials,
      }),
    }),
    getUsers: builder.query({
      query: () => routes.getUsers(),
    }),
    getUserData: builder.query({
      query: () => routes.getUser(),
    }),
    editUsername: builder.mutation({
      query: ({ id, newUsername }) => ({
        url: routes.updateUsername(id),
        method: "PATCH",
        body: { username: newUsername },
      }),
    }),
    editEmail: builder.mutation({
      query: ({ id, newEmail }) => ({
        url: routes.updateEmail(id),
        method: "PATCH",
        body: { email: newEmail },
      }),
    }),
    editPassword: builder.mutation({
      query: ({ id, newPassword }) => ({
        url: routes.updatPassword(id),
        method: "PATCH",
        body: { password: newPassword },
      }),
    }),
    editAvatar: builder.mutation({
      query: ({ id, formData }) => ({
        url: routes.updateAvatar(id),
        method: "PATCH",
        body: formData,
      }),
    }),
    addChannel: builder.mutation({
      query: (newChannel) => ({
        url: routes.channelsPath(),
        method: "POST",
        body: newChannel,
      }),
    }),
    editChannel: builder.mutation({
      query: ({ id, editedChannel }) => ({
        url: routes.getChannelPath(id),
        method: "PATCH",
        body: editedChannel,
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: routes.getChannelPath(id),
        method: "DELETE",
      }),
    }),
    getMessages: builder.query({
      query: () => routes.messagesPath(),
    }),
    addMessage: builder.mutation({
      query: (newMessage) => ({
        url: routes.messagesPath(),
        method: "POST",
        body: newMessage,
      }),
    }),
    editMessage: builder.mutation({
      query: ({ id, editedMessage }) => ({
        url: routes.getMessagePath(id),
        method: "PATCH",
        body: editedMessage,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginMutation,
  useGetUsersQuery,
  useGetUserDataQuery,
  useEditUsernameMutation,
  useEditEmailMutation,
  useEditPasswordMutation,
  useEditAvatarMutation,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
  useGetMessagesQuery,
  useAddMessageMutation,
  useEditMessageMutation,
} = api;
export default api;
