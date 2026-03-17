import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { CourseTable } from './config/schema';

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
  const result = await db.select().from(CourseTable);
  console.log(JSON.stringify(result, null, 2));
}

main().catch(console.error);
