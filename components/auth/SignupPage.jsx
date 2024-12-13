"use client";

import Image from "next/image";

import { images } from "@/constants";
import CustomInp from "../shared/CustomInp";
import { useState } from "react";
import CustomBtn from "../shared/CustomBtn";
import Link from "next/link";

export default function SignupPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {};

  return (
    <form
      onSubmit={handleSubmit}
      className="h-[100vh] flex items-center justify-center gap-[150px] "
    >
      <div className="w-fit h-fit flex flex-col items-center justify-center bg-white border rounded-lg p-5">
        <Image src={images.home_logo} width={100} height={100} alt="لوگو" />
        <p className="my-5 text-right text-[18px] w-full">ثبت نام</p>
        <div className="space-y-5">
          <CustomInp
            type="text"
            label="نام کاربری"
            value={form.username}
            name="username"
            onChange={onChange}
            wrapperClassName="w-[410px]"
          />
          <CustomInp
            type="password"
            label="رمز عبور"
            value={form.password}
            name="password"
            onChange={onChange}
            wrapperClassName="w-[410px]"
          />
          <CustomInp
            type="password"
            label="تکرار رمز عبور"
            value={form.confirmPassword}
            name="confirmPassword"
            onChange={onChange}
            wrapperClassName="w-[410px]"
          />
          <CustomBtn
            type="submit"
            title="ثبت نام"
            isLoading={loading}
            disabled={loading}
            classNames={`${
              loading ? "bg-lightGray text-black" : "bg-bgRedMain text-white"
            } w-full h-[50px] font-bold flex items-center justify-center rounded-lg`}
          />
          <div className="flex items-center justify-center gap-4 text-sm font-bold">
            <p>قبلا ثبت نام کرده اید؟</p>
            <Link
              href="/login"
              className="bg-bgRedMain text-lightGray border text-center py-1 px-4 rounded-lg "
            >
              ورود
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
