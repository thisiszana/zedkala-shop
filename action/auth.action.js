"use server";

import { cookies } from "next/headers";

import api from "@/configs/api";
import { MESSAGES } from "@/messages/messages";

export const loginUser = async (data) => {
  try {
    const { username, password } = data;

    const res = await api.post("/api/auth/login", {
      username,
      password,
    });

    const {
      accessToken,
      refreshToken,
      accessExpiresIn,
      refreshExpiresIn,
      msg,
    } = res.data;

    const accessMaxAgeInSeconds = accessExpiresIn / 1000;
    const refreshMaxAgeInSeconds = refreshExpiresIn / 1000;

    const cookieStore = await cookies();

    cookieStore.set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: accessMaxAgeInSeconds,
    });

    cookieStore.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: refreshMaxAgeInSeconds,
    });

    return {
      success: true,
      msg: msg,
    };
  } catch (error) {
    console.error("Login Error:", error);
    return {
      success: false,
      msg: error.msg || MESSAGES.server,
    };
  }
};
