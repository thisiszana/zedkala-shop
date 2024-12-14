"use client";

import Image from "next/image";

import { images } from "@/constants";
import CustomInp from "../shared/CustomInp";
import { useState } from "react";
import CustomBtn from "../shared/CustomBtn";
import Link from "next/link";
import toast from "react-hot-toast";
import { MESSAGES } from "@/messages/messages";
import api from "@/configs/api";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    displayName: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.confirmPassword || !form.username || !form.password)
      return toast.error(MESSAGES.fillInp);

    if (form.password !== form.confirmPassword)
      return toast.error(MESSAGES.confirmPassword);

    try {
      setLoading(true);
      const response = await api.post("/api/auth/register", {
        displayName: form.displayName,
        username: form.username,
        password: form.password,
      });

      if (response.status === 201) {
        toast.success(response.data.msg);
        setLoading(false);
        router.push("/login");
      } else {
        toast.error("مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(`خطا: ${error.response.data.message}`);
      } else {
        toast.error("مشکلی پیش آمده است. لطفاً اتصال خود را بررسی کنید.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-[100vh] flex items-center justify-center gap-[150px] "
    >
      <div className="w-fit h-fit flex flex-col items-center justify-center bg-white border rounded-lg p-5">
        <Image
          src={images.home_logo}
          width={100}
          height={100}
          alt="لوگو"
          priority="true"
        />
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
            type="text"
            label="نام"
            value={form.displayName}
            name="displayName"
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
