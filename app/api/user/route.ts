import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await auth();
    const userEmail = session?.user?.email;

    if (!userEmail) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await db.select().from(usersTable)
    .where(eq(usersTable.email, userEmail))

    if(users?.length <= 0) {
        const newUser = {
            name: session?.user?.name ?? '',
            email: userEmail,
            points: 0
        }
        const result = await db.insert(usersTable)
            .values(newUser).returning()

        return NextResponse.json(result[0])
    }

    return NextResponse.json(users[0])
}