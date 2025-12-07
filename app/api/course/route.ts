import {db} from '@/config/db';
import { CourseChapterTable, CourseTable, EnrolledCourseTable } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';
import { and, asc, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req:NextRequest){

    const {searchParams} = new URL(req.url);
    const courseId = searchParams.get('courseid')
    const user =  await currentUser();

if (courseId){
    const result = await db.select().from(CourseTable)
    //@ts-ignore
    .where(eq(CourseTable.courseId,courseId))

    const chapterResult = await db.select().from(CourseChapterTable)
        //@ts-ignore
    .where(eq(CourseChapterTable.courseId,courseId))

    const enrolledCourse= await db.select().from(EnrolledCourseTable)
     //@ts-ignore
    .where(and(eq(EnrolledCourseTable?.courseId,courseId),eq(EnrolledCourseTable.userId,user?.primaryEmailAddress?.emailAddress)  ))

    const isEnrolledCourse = enrolledCourse?.length>0?true:false
    return NextResponse.json({
        ...result[0],
        chapters:chapterResult,
        userEnrolled: isEnrolledCourse,
        courseEnrolledInfo: enrolledCourse[0]
    })
}
else{
    const result =  await db.select().from(CourseTable).orderBy();

    return NextResponse.json(result)
}

}