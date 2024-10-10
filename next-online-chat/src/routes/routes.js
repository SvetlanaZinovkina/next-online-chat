const routes = {
  defaultHostPath: () => "http://localhost:5001/",
  defaultApiPath: () => "http://localhost:5001/api/v1",
  notFoundPage: () => "*",
  mainPage: () => "/",
  profilePage: () => "/profile",
  updateUsername: (id) => `/update-user/username/${id}`,
  updateEmail: (id) => `/update-user/email/${id}`,
  updatPassword: (id) => `/update-user/password/${id}`,
  updateAvatar: (id) => `/update-user/avatar/${id}`,
  loginPage: () => "/login",
  signUpPage: () => "/signup",
  chatPath: (id) => "/chat/${id}",
  getChannelPath: (id) => `/channels/${id}`,
  messagesPath: () => "/messages",
  getMessagePath: (id) => `/messages/${id}`,
  getUsers: () => "/users",
  getUser: () => `/user`,
};

export default routes;
