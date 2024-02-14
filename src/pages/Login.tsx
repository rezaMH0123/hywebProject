import loginIMG from "../assets/2.svg";
import HIWEBIMG from "../assets/1.svg";
import FormInput from "../components/formInput";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthCheck from "../components/authCheck";

export default function Login() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isAuthenticated) {
        navigate("/");
      }
    }, 4000);

    return () => clearTimeout(timeout);
  }, [isAuthenticated, navigate]);
  return (
    <div className="flex h-screen">
      <div className="right flex flex-row-reverse   w-[44%] h-full">
        <div className="formContaner flex flex-col justify-between items-center mt-8 mr-4  h-[80%] w-[500px]">
          <img src={HIWEBIMG} alt="loginIMG" className="w-[136px] h-[91px]" />
          {isAuthenticated ? <AuthCheck /> : <FormInput />}
        </div>
      </div>
      <div className="right  w-[56%] h-full">
        <img src={loginIMG} alt="loginIMG" className="h-full w-full" />
      </div>
    </div>
  );
}
