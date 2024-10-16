import { configureStore } from "@reduxjs/toolkit";
import api from "./api.js";
import userReducer from "./slices/userSlice.js";
import usersReducer from "./slices/usersSlice.js";

// import channelsReducer from "../slices/channelsSlice.js";
// import messagesReducer from "../slices/messagesSlice.js";
// import modalReducer from "../slices/modalSlice.js";

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
    users: usersReducer,
    // messages: messagesReducer,
    // modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
