const routes = {
  defaultApiPath: () => "/api/v1",
  notFoundPage: () => "*",
  mainPage: () => "/",
  loginPage: () => "/login",
  signUpPage: () => "/signup",
  chatPath: (id) => "/chat/${id}",
  getChannelPath: (id) => `/channels/${id}`,
  messagesPath: () => "/messages",
  getMessagePath: (id) => `/messages/${id}`,
};

export default routes;
