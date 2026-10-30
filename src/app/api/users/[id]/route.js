import { NextResponse } from "next/server";

//================================================================================
// GET By ID Function (/src/app/api/users/[id]/route.js)
//================================================================================
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    console.log({ success: true, message: `ดึงข้อมูลผู้ใช้คนที่ ${id} ใช้สำเร็จ`, status: 200 });

    return NextResponse.json(
      {
        success: true,
        message: `ดึงข้อมูลผู้ใช้ ${id} ใช้สำเร็จ`,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}



// ==========================
// 1. PUT Function (แก้ไขข้อมูลผู้ใช้ตาม ID)
// ==========================
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    console.log({ success: true, message: `อัปเดตข้อมูลผู้ใช้คนที่ ${id} สำเร็จ`, status: 200 });

    return NextResponse.json(
      {
        success: true,
        message: `อัปเดตข้อมูลผู้ใช้คนที่ ${id} สำเร็จ`,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

// ==========================
// 2. DELETE Function (ลบข้อมูลผู้ใช้ตาม ID)
// ==========================
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    console.log({ success: true, message: `ลบข้อมูลผู้ใช้คนที่ ${id} สำเร็จ`, status: 200 });

    return NextResponse.json(
      {
        success: true,
        message: `ลบข้อมูลผู้ใช้คนที่ ${id} สำเร็จ`,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
