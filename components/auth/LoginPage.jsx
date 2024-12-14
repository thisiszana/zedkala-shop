"use client";

import api from "@/configs/api";
import { images } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import CustomInp from "../shared/CustomInp";
import CustomBtn from "../shared/CustomBtn";
import { loginUser } from "@/action/auth.action";
import { MESSAGES } from "@/messages/messages";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
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

    if (!form.username || !form.password) return toast.error(MESSAGES.fillInp);

    try {
      setLoading(true);
      const res = await loginUser({
        username: form.username,
        password: form.password,
      });
      console.log(res);

      if (res.success === true) {
        toast.success(res.msg);
        setLoading(false);
        router.push("/");
      } else {
        setLoading(false);
        toast.error(res.msg);
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
            type="password"
            label="رمز عبور"
            value={form.password}
            name="password"
            onChange={onChange}
            wrapperClassName="w-[410px]"
          />
          <CustomBtn
            type="submit"
            title="ورود"
            isLoading={loading}
            disabled={loading}
            classNames={`${
              loading ? "bg-lightGray text-black" : "bg-bgRedMain text-white"
            } w-full h-[50px] font-bold flex items-center justify-center rounded-lg`}
          />
          <div className="flex items-center justify-center gap-4 text-sm font-bold">
            <p>حساب کاربری ندارید؟</p>
            <Link
              href="/signup"
              className="bg-bgRedMain text-lightGray border text-center py-1 px-4 rounded-lg "
            >
              ثبت‌نام
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
