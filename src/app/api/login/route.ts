import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { logUser } from "@/services/userServices";

export async function POST(req: Request) {
  const body = await req.json();

  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email e senha são obrigatórios" },
      { status: 400 }
    );
  }

  const token = await logUser(email, password);

  if (!token) {
    return NextResponse.json(
      { error: "Acesso negado" },
      { status: 401 }
    );
  }

  (await cookies()).set("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return NextResponse.json({
    error: null,
    message: "Login realizado com sucesso",
  });
}