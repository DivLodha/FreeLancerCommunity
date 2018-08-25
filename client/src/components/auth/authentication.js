function isLoggedIn() {
  return localStorage.getItem("token") !== null;
}
function userLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  localStorage.removeItem("userId");
}
function saveUser(token, name, userId) {
  localStorage.setItem("token", token);
  localStorage.setItem("name", name);
  localStorage.setItem("userId", userId);
}
function getToken() {
  if (isLoggedIn()) {
    return localStorage.getItem("token");
  }
}
function userInfo() {
  if (localStorage.getItem("name") !== null) {
    return {
      full_name: localStorage.getItem("name"),
      userId: localStorage.getItem("userId")
    };
  }
  return null;
}
export { isLoggedIn, saveUser, userInfo, userLogout, getToken };
