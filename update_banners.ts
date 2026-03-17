import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { CourseTable } from './config/schema';

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
  
  // Update HTML Beginner course (courseId: 2)
  await db.update(CourseTable)
    .set({ bannerImage: '/hero2.gif' })
    .where(eq(CourseTable.courseId, 2));
  console.log('Updated HTML banner');

  // Update CSS Beginner course (courseId: 3)
  await db.update(CourseTable)
    .set({ bannerImage: '/hero3.gif' })
    .where(eq(CourseTable.courseId, 3));
  console.log('Updated CSS banner');
}

main().catch(console.error);
