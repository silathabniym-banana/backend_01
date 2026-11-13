import { NextResponse } from "next/server";
import db from "../../../lib/db";
//================================================================================
// GET By ID Function (/src/app/api/users/[id]/route.js)
//================================================================================
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    // ดึงข้อมูลผู้ใช้เฉพาะ id ที่กำหนดจากตาราง tbl_users
    const [rows] = await db.query(
      "SELECT id, firstname, fullname, lastname, username, status, created_at, updated_at FROM tbl_users WHERE id = ?",
      [id]
    );

    // ตรวจสอบว่าพบผู้ใช้งานคนนี้ในระบบหรือไม่
    if (rows.length === 0) {
      return NextResponse.json(
        {
          status: "error",
          message: `ไม่พบข้อมูลผู้ใช้ ID: ${id}`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: "ok",
        data: rows[0],
      },
      { status: 200 }
    );

  } catch (err) {
    console.error('Database query error:', err);
    return NextResponse.json(
      { 
        error: 'Database error', 
        details: err.message 
      },
      { status: 500 }
    );
  }
}

// ==========================
// 1. PUT Function (อัปเดตข้อมูลผู้ใช้ตาม ID ในฐานข้อมูลจริง)
// ==========================
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { firstname, fullname, lastname, username, status } = body;

    // คำสั่ง SQL สำหรับอัปเดตข้อมูลในตาราง tbl_users
    const [result] = await db.query(
      "UPDATE tbl_users SET firstname = ?, fullname = ?, lastname = ?, username = ?, status = ? WHERE id = ?",
      [firstname, fullname, lastname, username, status, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { status: "error", message: `ไม่พบผู้ใช้ ID: ${id} สำหรับอัปเดต` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `อัปเดตข้อมูลผู้ใช้คนที่ ${id} สำเร็จ`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Database update error:', error);
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
// 2. DELETE Function (ลบข้อมูลผู้ใช้ตาม ID จากฐานข้อมูลจริง)
// ==========================
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // คำสั่ง SQL สำหรับลบข้อมูลออกจากตาราง tbl_users
    const [result] = await db.query("DELETE FROM tbl_users WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { status: "error", message: `ไม่พบผู้ใช้ ID: ${id} สำหรับลบ` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `ลบข้อมูลผู้ใช้คนที่ ${id} สำเร็จ`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Database delete error:', error);
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