import { db } from "@/config/db";
import { CourseChapterTable, ExerciseTable } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {courseId, chapterId,exerciseId} = await req.json();

    const courseResult = await db.select().from(CourseChapterTable)
    .where(and(eq(CourseChapterTable.courseId,courseId),eq(CourseChapterTable.chapterId,chapterId)))

    const exerciseResult = await db.select().from(ExerciseTable)
    .where(and(eq(ExerciseTable.courseId,courseId),
        eq(ExerciseTable.exerciseId,exerciseId)))

    return NextResponse.json({
        ...courseResult[0],
        exerciseData: exerciseResult[0]
    })
}