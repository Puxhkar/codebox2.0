import { NextRequest, NextResponse } from "next/server";
import { EnrolledCourseTable } from "@/config/schema";
import { db } from "@/config/db";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { courseId } = await req.json();
    const user = await currentUser();

    // 1️⃣ Check if user is logged in
    if (!user) {
      return NextResponse.json(
        { error: "User not logged in" },
        { status: 401 }
      );
    }

    // 2️⃣ Validate courseId
    if (!courseId) {
      return NextResponse.json(
        { error: "courseId missing" },
        { status: 400 }
      );
    }

    // 3️⃣ Validate userId (Clerk email MUST exist)
    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) {
      return NextResponse.json(
        { error: "User email not found" },
        { status: 400 }
      );
    }

    // 4️⃣ Insert into DB
    const result = await db
      .insert(EnrolledCourseTable)
      .values({
        courseId: Number(courseId),
        userId: email,
        xpEarned: 0,
      })
      .returning();

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("EnrollCourse Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
