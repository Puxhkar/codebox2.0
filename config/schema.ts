import { pgTable, integer, varchar, timestamp,json } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  points: integer().default(0),
  subscription: varchar()
});


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
