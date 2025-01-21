"use client";
import { useState } from "react";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <div className="flex flex-col w-full h-full n items-center">
        <h1 className="flex font-bold mt-[114px] text-3xl text-[#1E232C] w-[280px] h-[78px]">
          Welcome back! Glad to see you, Again!
        </h1>
        <div className="flex flex-col mt-[68px] w-[333px] h-[142px] justify-between rounded-lg items-center">
          <input
            type="text"
            className="w-[330px] h-[56px] rounded-lg border border-[#DADADA] bg-[#F7F8F9] font-medium pl-2 text-[#8391A1]"
            placeholder="Enter your email"
          />
          <div className="w-[330px] h-[56px] rounded-lg border border-[#DADADA] bg-[#F7F8F9] px-2 flex flex-row justify-between items-center">
            <input
              type={showPassword ? "text" : "password"}
              className="font-medium pl-2 text-[#8391A1] outline-none bg-[#F7F8F9] flex-grow"
              placeholder="Enter your password"
            />
            <button
              onClick={togglePasswordVisibility}
              className="focus:outline-none"
            >
              {showPassword ? (
                <AiFillEye className="text-[#8391A1]" size={22} />
              ) : (
                <AiFillEyeInvisible className="text-[#8391A1]" size={22} />
              )}
            </button>
          </div>
        </div>
        <Link href="/scanner">
          <button className="w-[333px] h-[56px] mt-[35px] bg-[#AF52DE] text-center rounded-lg text-white text-base font-semibold">
            Login to Scanner
          </button>
        </Link>
        <Link href="/dashboard">
          <button className="w-[333px] h-[56px] mt-[35px] border border-[#AF52DE] bg-white text-center rounded-lg text-[#AF52DE] text-base font-semibold">
            Login to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
