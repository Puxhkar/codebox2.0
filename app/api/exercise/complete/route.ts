import { db } from "@/config/db";
import { CompletedExerciseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {courseId , chapterId , exerciseId} = await req.json();

    const user = await currentUser();

    const result = await db.insert(CompletedExerciseTable).values({
        chapterId:chapterId,
        courseId:courseId,
        exerciseId:exerciseId,
        userId: user?.primaryEmailAddress?.emailAddress
    }).returning()

    return NextResponse.json(result)
}