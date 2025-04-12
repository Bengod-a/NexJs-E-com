import { hash } from "bcryptjs";
import prisma from "../../../../lib/DB/prisma";
import { NextRequest, NextResponse } from "next/server";

interface RegisterRequest {
  name: string;
  lastname: string;
  email: string;
  phonenumber: string;
  birthdate?: string;
  password: string;
  conpassword: string;
}

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      lastname,
      email,
      phonenumber,
      birthdate,
      password,
      conpassword,
    }: RegisterRequest = await req.json();

    if (
      !name ||
      !password ||
      !lastname ||
      !email ||
      !phonenumber ||
      !birthdate
    ) {
      return NextResponse.json({ message: "กรุณากรอกข้อมูลให้ครบ" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      return NextResponse.json(
        { message: "Email ถูกใช้งานแล้ว" },
        { status: 400 }
      );
    }

    if (conpassword !== password) {
      return NextResponse.json({ message: "รหัสไม่ตรงกัน" }, { status: 400 });
    }

    const hashedPassword = await hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        lastname,
        password: hashedPassword,
        phonenumber,
        birthdate,
      },
    });

    return NextResponse.json({ success: true, data: newUser }, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
