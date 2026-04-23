import {db} from '@/config/db';
import { CompletedExerciseTable, CourseChapterTable, CourseTable, EnrolledCourseTable } from '@/config/schema';
import { auth } from '@/auth';
import { and, asc, desc, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest){

    const {searchParams} = new URL(req.url);
    const courseId = searchParams.get('courseid')
    const session = await auth();
    const userEmail = session?.user?.email ?? '';

if (courseId){
    const result = await db.select().from(CourseTable)
    //@ts-ignore
    .where(eq(CourseTable.courseId,courseId))

    const chapterResult = await db.select().from(CourseChapterTable)
        //@ts-ignore
    .where(eq(CourseChapterTable.courseId,courseId)).orderBy(CourseChapterTable.chapterId)

    const enrolledCourse= await db.select().from(EnrolledCourseTable)
     //@ts-ignore
    .where(and(eq(EnrolledCourseTable?.courseId,courseId),eq(EnrolledCourseTable.userId,userEmail)  ))

    const isEnrolledCourse = enrolledCourse?.length>0?true:false
 //@ts-ignore
    const completedExercises = await db.select().from(CompletedExerciseTable).where(and(eq(CompletedExerciseTable.courseId,courseId),eq(CompletedExerciseTable.userId,userEmail)))
    .orderBy(desc(CompletedExerciseTable?.courseId))
    

    return NextResponse.json({
        ...result[0],
        chapters:chapterResult,
        userEnrolled: isEnrolledCourse,
        courseEnrolledInfo: enrolledCourse[0],
        completedExercises: completedExercises
    })
}
else{
    const result =  await db.select().from(CourseTable).orderBy();

    return NextResponse.json(result)
}

}