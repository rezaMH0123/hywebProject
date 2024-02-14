import authCheckIMG from "../assets/authCheck.svg";
import loginLoadingIMG from "../assets/loginLoading.svg";

export default function AuthCheck() {
  return (
    <div className="flex flex-col justify-center  w-[440px] h-[370px] xl:w-[482px]  xl:h-[437px]  text-right  border border-[#9A9A9A] self-center rounded-2xl font-custom">
      <div className="flex flex-col gap-y-16 justify-center items-center ">
        <img
          src={authCheckIMG}
          alt="authCheckIMG"
          className="h-[64px] w-[64px]"
        />
        <span className="font-custom text-[#46B666]">
          .ورود شما با موفقیت انجام شد
        </span>
        <img src={loginLoadingIMG} alt="loginLoadingIMG" />
      </div>
    </div>
  );
}
