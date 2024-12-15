

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://zedkala-admin-panel.vercel.app"
    : "http://localhost:3001";

export async function POST(request) {
  const { refreshToken } = await request.json();

  try {
    const { data } = await axios.post(
      `${BASE_URL}/api/auth/refresh-token`,
      { refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { accessToken, accessExpiresIn } = data;
    const accessMaxAgeInSeconds = accessExpiresIn / 1000;


    const cookieStore = cookies();
    cookieStore.set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: accessMaxAgeInSeconds,
    });

    return NextResponse.json({ success: true, message: "Access token set" });
  } catch (error) {
    console.error("Set cookie error:", error.message);
    return NextResponse.json({ success: false, message: "Server error" });
  }
}
