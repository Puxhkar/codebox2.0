import {db} from '@/config/db';
import { CourseChapterTable, CourseTable } from '@/config/schema';
import { asc, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req:NextRequest){

    const {searchParams} = new URL(req.url);
    const courseId = searchParams.get('courseid')

if (courseId){
    const result = await db.select().from(CourseTable)
    //@ts-ignore
    .where(eq(CourseTable.courseId,courseId))

    const chapterResult = await db.select().from(CourseChapterTable)
        //@ts-ignore
    .where(eq(CourseChapterTable.courseId,courseId))

    return NextResponse.json({
        ...result[0],
        chapters:chapterResult
    })
}
else{
    const result =  await db.select().from(CourseTable).orderBy();

    return NextResponse.json(result)
}

}