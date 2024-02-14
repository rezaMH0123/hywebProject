import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = "https://taskapi.hiweb.ir/api";

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401) {
      const refreshToken = Cookies.get("refresh_token");
      const user = localStorage.getItem("user");
      console.log(user);
      if (refreshToken) {
        try {
          const response = await axios.post(
            "/Security/UserLogin/RefreshToken",
            {
              userName: user,
              refreshToken: refreshToken,
            }
          );
          if (response.status === 200) {
            Cookies.set(
              "access_token",
              response.data.data.accessToken.access_token,
              {
                expires: new Date(
                  response.data.data.accessToken.expire_access_token
                ),
              }
            );
            Cookies.set(
              "refresh_token",
              response.data.data.accessToken.refresh_token,
              {
                expires: new Date(
                  response.data.data.accessToken.expire_refresh_token
                ),
              }
            );
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        window.location.href = "/login";
      }
    }
  }
);
