import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": getCsrfTokenFromCookie(), // get the CSRF token from a cookie
  },
  withCredentials: true,
});

function getCsrfTokenFromCookie() {
  const name = "XSRF-TOKEN=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}

export default axiosClient;
