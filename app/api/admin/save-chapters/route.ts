import { db } from "@/config/db";
import { CourseChapterTable } from "@/config/schema";
// import { CourseChapterTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";

const DATA = [
  {
    "id": 1,
    "name": "Introduction to Python",
    "desc": "Learn Python basics and start writing your first programs.",
    "exercises": [
      { "name": "Hello Python", "slug": "hello-python", "xp": 20, "difficulty": "easy" },
      { "name": "Print the Output", "slug": "print-the-output", "xp": 15, "difficulty": "easy" },
      { "name": "Fix the Syntax", "slug": "fix-the-syntax", "xp": 25, "difficulty": "easy" },
      { "name": "Python Detective", "slug": "python-detective", "xp": 20, "difficulty": "easy" },
      { "name": "Run the Script", "slug": "run-the-script", "xp": 15, "difficulty": "easy" },
      { "name": "Comment the Code", "slug": "comment-the-code", "xp": 20, "difficulty": "easy" }
    ]
  },
  {
    "id": 2,
    "name": "Variables & Data Types",
    "desc": "Store and work with different types of data.",
    "exercises": [
      { "name": "Variable Vault", "slug": "variable-vault", "xp": 20, "difficulty": "easy" },
      { "name": "Type Finder", "slug": "type-finder", "xp": 20, "difficulty": "easy" },
      { "name": "Math Operations", "slug": "math-operations", "xp": 25, "difficulty": "easy" },
      { "name": "String Magic", "slug": "string-magic", "xp": 25, "difficulty": "easy" },
      { "name": "Type Conversion", "slug": "type-conversion", "xp": 30, "difficulty": "medium" },
      { "name": "Data Type Fix", "slug": "data-type-fix", "xp": 20, "difficulty": "easy" }
    ]
  },
  {
    "id": 3,
    "name": "Conditions & Loops",
    "desc": "Control program flow using logic and repetition.",
    "exercises": [
      { "name": "If Else Trial", "slug": "if-else-trial", "xp": 25, "difficulty": "easy" },
      { "name": "Number Checker", "slug": "number-checker", "xp": 30, "difficulty": "easy" },
      { "name": "Loop the List", "slug": "loop-the-list", "xp": 25, "difficulty": "easy" },
      { "name": "While Loop Game", "slug": "while-loop-game", "xp": 30, "difficulty": "medium" },
      { "name": "Break & Continue", "slug": "break-and-continue", "xp": 20, "difficulty": "easy" },
      { "name": "Logic Bug Fix", "slug": "logic-bug-fix", "xp": 35, "difficulty": "medium" }
    ]
  },
  {
    "id": 4,
    "name": "Functions",
    "desc": "Write reusable blocks of code using functions.",
    "exercises": [
      { "name": "Define a Function", "slug": "define-a-function", "xp": 25, "difficulty": "easy" },
      { "name": "Function Parameters", "slug": "function-parameters", "xp": 30, "difficulty": "easy" },
      { "name": "Return the Value", "slug": "return-the-value", "xp": 20, "difficulty": "easy" },
      { "name": "Default Arguments", "slug": "default-arguments", "xp": 25, "difficulty": "easy" },
      { "name": "Function Challenge", "slug": "function-challenge", "xp": 40, "difficulty": "medium" },
      { "name": "Refactor Functions", "slug": "refactor-functions", "xp": 35, "difficulty": "medium" }
    ]
  },
  {
    "id": 5,
    "name": "Lists & Dictionaries",
    "desc": "Store and manipulate collections of data.",
    "exercises": [
      { "name": "List Builder", "slug": "list-builder", "xp": 20, "difficulty": "easy" },
      { "name": "Access Elements", "slug": "access-elements", "xp": 15, "difficulty": "easy" },
      { "name": "Dictionary Vault", "slug": "dictionary-vault", "xp": 30, "difficulty": "easy" },
      { "name": "Loop Dictionary", "slug": "loop-dictionary", "xp": 35, "difficulty": "medium" },
      { "name": "Nested Data", "slug": "nested-data", "xp": 40, "difficulty": "medium" },
      { "name": "Data Fixer", "slug": "data-fixer", "xp": 25, "difficulty": "easy" }
    ]
  },
  {
    "id": 6,
    "name": "File Handling",
    "desc": "Read from and write to files using Python.",
    "exercises": [
      { "name": "Read a File", "slug": "read-a-file", "xp": 30, "difficulty": "easy" },
      { "name": "Write to File", "slug": "write-to-file", "xp": 30, "difficulty": "easy" },
      { "name": "Append Mode", "slug": "append-mode", "xp": 20, "difficulty": "easy" },
      { "name": "File Cleanup", "slug": "file-cleanup", "xp": 25, "difficulty": "easy" },
      { "name": "CSV Reader", "slug": "csv-reader", "xp": 40, "difficulty": "medium" },
      { "name": "File Bug Fix", "slug": "file-bug-fix", "xp": 30, "difficulty": "medium" }
    ]
  },
  {
    "id": 7,
    "name": "Object-Oriented Python",
    "desc": "Model real-world concepts using classes and objects.",
    "exercises": [
      { "name": "Create a Class", "slug": "create-a-class", "xp": 30, "difficulty": "easy" },
      { "name": "Constructor Magic", "slug": "constructor-magic", "xp": 25, "difficulty": "easy" },
      { "name": "Method Madness", "slug": "method-madness", "xp": 30, "difficulty": "medium" },
      { "name": "Inheritance Intro", "slug": "inheritance-intro", "xp": 35, "difficulty": "medium" },
      { "name": "Encapsulation Fix", "slug": "encapsulation-fix", "xp": 30, "difficulty": "medium" },
      { "name": "OOP Refactor", "slug": "oop-refactor", "xp": 40, "difficulty": "medium" }
    ]
  },
  {
    "id": 8,
    "name": "Python Best Practices",
    "desc": "Write clean, readable, and efficient Python code.",
    "exercises": [
      { "name": "PEP8 Cleanup", "slug": "pep8-cleanup", "xp": 20, "difficulty": "easy" },
      { "name": "Meaningful Names", "slug": "meaningful-names", "xp": 20, "difficulty": "easy" },
      { "name": "Refactor Script", "slug": "refactor-script", "xp": 35, "difficulty": "medium" },
      { "name": "Error Handling", "slug": "error-handling", "xp": 40, "difficulty": "medium" },
      { "name": "Performance Basics", "slug": "performance-basics", "xp": 30, "difficulty": "medium" },
      { "name": "Final Python Challenge", "slug": "final-python-challenge", "xp": 50, "difficulty": "medium" }
    ]
  }
]




  // ✨ Add all other chapters exactly as you already have them
  // (I trimmed here because message length is huge)
  // Just paste the remaining objects below.
;

// -------------------------------------


export async function GET(req: NextRequest) {
    DATA.forEach(async (item) => {
        await db.insert(CourseChapterTable).values({
            courseId: 4, //Change Course ID depends on course info,
            desc: item?.desc,
            exercises: item.exercises,
            name: item?.name,
            chapterId: item?.id
        })
    })
    return NextResponse.json('Success')
}


