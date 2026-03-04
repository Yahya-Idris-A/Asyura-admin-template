"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginWithDummyToken(email: string) {
  // Simulasi pembuatan token JWT
  const dummyToken = `jwt_token_for_${email}_${Date.now()}`;

  // Set cookie dengan standar keamanan enterprise
  (await cookies()).set("auth_token", dummyToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // Berlaku 1 hari (dalam detik)
    path: "/",
  });

  // Redirect ke halaman dalam setelah cookie terpasang
  redirect("/dashboard");
}

export async function logoutUser() {
  // Hapus cookie
  (await cookies()).delete("auth_token");
  
  // Lempar kembali ke halaman login
  redirect("/sign-in");
}