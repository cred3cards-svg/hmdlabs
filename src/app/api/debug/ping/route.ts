import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Check DB
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ 
      status: "online", 
      database: "connected",
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ 
      status: "error", 
      database: "disconnected",
      message: error.message 
    }, { status: 500 });
  }
}
