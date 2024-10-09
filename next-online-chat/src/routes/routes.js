const routes = {
  defaultApiPath: () => "http://localhost:5001/api/v1",
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
