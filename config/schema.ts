import { pgTable, integer, varchar, timestamp, json, primaryKey, text } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const usersTable = pgTable("users", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  password: varchar("password", { length: 255 }),
  image: varchar("image", { length: 255 }),
  points: integer().default(0),
  subscription: varchar()
});

export const accountsTable = pgTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccountType>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 2048 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const sessionsTable = pgTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).primaryKey(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokensTable = pgTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
)

export const CourseTable = pgTable("courses",{
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  courseId: integer().notNull().unique(),
  title: varchar().notNull(),
  desc: varchar().notNull(),
  bannerImage: varchar().notNull(),
  level: varchar().default('Beginner'),
  tags: varchar()
})

export const CourseChapterTable = pgTable('courseChapters',{
  id : integer().primaryKey().generatedAlwaysAsIdentity(),
  chapterId: integer(),
  courseId : integer().notNull(),
  name: varchar(),
  desc: varchar(),
  exercises : json(),

})

export const EnrolledCourseTable = pgTable("enrollCourse", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  courseId: integer().notNull(),
  userId: varchar({ length: 255 }).notNull(),
  enrolledDate: timestamp().defaultNow(),
  xpEarned: integer().default(0).notNull(),
});

export const CompletedExerciseTable = pgTable('completedExercise',{
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  courseId: integer(),
  chapterId: integer(),
  exerciseId: integer(),
  userId: varchar()
})

export const ExerciseTable = pgTable('exercise',{
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  courseId: integer(),
  chapterId: integer(),
  exerciseId: varchar({ length: 255 }),   // fine
  exerciseName: varchar({ length: 255 }), // fine
  exercisesContent: json(),               // perfect
})
