import { db } from './config/db.tsx';
import { usersTable } from './config/schema.ts';
import { eq } from 'drizzle-orm';

async function main() {
  try {
    const currentUsers = await db.select().from(usersTable).where(eq(usersTable.email, "UserTest_login@gmail.com"));
    console.log("Success:", currentUsers);
  } catch (err: any) {
    console.error("Failure:", err);
    console.error("Stack:", err.stack);
  }
}

main();
