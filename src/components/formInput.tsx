import { useEffect, useState } from "react";
import CheckBox from "./checkBox";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../features/authSlice";
import { RootState } from "../app/store";

export default function FormInput() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const loading = useSelector((state: RootState) => state.auth.loading);
  const dispatch = useDispatch();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isChecked) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }
    dispatch(loginRequest());
    try {
      const respons = await axios.post("/Security/UserLogin/Login", {
        userName: username,
        passWord: password,
      });
      if (respons.status === 200) {
        localStorage.setItem("user", username);
        dispatch(
          loginSuccess({
            accessToken: respons?.data?.data.accessToken.access_token,
            refreshToken: respons?.data?.data.accessToken.refresh_token,
            user: respons?.data?.data?.userName,
          })
        );

        Cookies.set(
          "access_token",
          respons.data.data.accessToken.access_token,
          {
            expires: new Date(
              respons.data.data.accessToken.expire_access_token
            ),
            // expires: new Date(expirationTime),
          }
        );
        Cookies.set(
          "refresh_token",
          respons.data.data.accessToken.refresh_token,
          {
            expires: new Date(
              respons.data.data.accessToken.expire_refresh_token
            ),
          }
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(loginFailure());
    }
  };

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");
    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setIsChecked(true);
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center gap-y-3 w-[440px] h-[370px] xl:w-[482px]  xl:h-[437px]  text-right p-8 border border-[#9A9A9A] self-center rounded-2xl font-custom"
    >
      <div className="flex flex-col p-2 ">
        <label className="text-[#A0A0A0]">نام کاربری</label>
        <input
          className="border border-[#9A9A9A] outline-none mt-2 p-2 rounded-lg text-right text-[#9A9A9A]"
          type="text"
          placeholder="...نام کاربری"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div className="flex flex-col p-2">
        <label className="text-[#A0A0A0]">کلمه عبور</label>
        <input
          className="border border-[#9A9A9A] outline-none mt-2 p-2 rounded-lg text-right text-[#9A9A9A]"
          type="password"
          placeholder="...کلمه عبور"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="flex justify-end gap-x-2 p-2 ">
        <CheckBox isChecked={isChecked} setIsChecked={setIsChecked} />
      </div>
      {loading ? (
        <button
          disabled={true}
          className="text-white bg-[#46B666] h-[47px] rounded-lg mt-4"
          type="submit"
        >
          ...صبر کنید
        </button>
      ) : (
        <button
          className="text-white bg-[#46B666] h-[47px] rounded-lg mt-4"
          type="submit"
        >
          ورود
        </button>
      )}
    </form>
  );
}
