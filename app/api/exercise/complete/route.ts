import { db } from "@/config/db";
import { CompletedExerciseTable } from "@/config/schema";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {courseId , chapterId , exerciseId} = await req.json();

    const session = await auth();

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db.insert(CompletedExerciseTable).values({
        chapterId:chapterId,
        courseId:courseId,
        exerciseId:exerciseId,
        userId: session.user.email
    }).returning()

    return NextResponse.json(result)
}