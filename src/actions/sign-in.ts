"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth/auth";
import {
  isDatabaseReachable,
  isDemoCredentials
} from "@/utils/demo-user";

export type SignInResult =
  | { success: true }
  | { success: false; error: string };

export async function signInWithCredentials(
  email: string,
  password: string
): Promise<SignInResult> {
  const normalizedEmail = email.trim().toLowerCase();

  const dbReachable = await isDatabaseReachable();
  if (!dbReachable && !isDemoCredentials(normalizedEmail, password)) {
    return {
      success: false,
      error:
        "База данных недоступна. Запустите PostgreSQL (docker compose up -d) и npm run db:push"
    };
  }

  try {
    const result = await signIn("credentials", {
      email: normalizedEmail,
      password,
      redirect: false
    });

    if (result && typeof result === "object" && "error" in result && result.error) {
      return { success: false, error: "Неверный email или пароль" };
    }

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: "Неверный email или пароль" };
    }

    console.error("Ошибка авторизации:", error);
    return { success: false, error: "Не удалось войти. Попробуйте ещё раз." };
  }
}
