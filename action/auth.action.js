"use server";

import { cookies } from "next/headers";

import { MESSAGES } from "@/messages/messages";
import { fetchLogin, fetchRefreshToken } from "@/services/req";
import { getServerSession } from "@/utils/session";

export const loginUser = async (data) => {
  try {
    const res = await fetchLogin(data);

    if (res?.success === true) {
      const {
        accessToken,
        refreshToken,
        accessExpiresIn,
        refreshExpiresIn,
        msg,
      } = res;

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
        msg,
      };
    }

    return {
      success: false,
      data: res,
    };
  } catch (error) {
    console.error("Login Error:", error);
    return {
      success: false,
      msg: MESSAGES.server,
    };
  }
};