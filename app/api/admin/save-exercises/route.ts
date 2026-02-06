import { db } from "@/config/db";
import { CourseChapterTable , ExerciseTable} from "@/config/schema";
// import { CourseChapterTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";

const DATA = 
[
  {
    "courseId": 4,
    "exerciseId": "read-a-file",
    "exerciseName": "Read a File 📂🐍",
    "chapterId": 5,
    "exercisesContent": {
      "content": "<body style='font-family:Arial;line-height:1.8;background:#0f0f0f;color:#e5e7eb;padding:20px;'><p>Files store persistent data 📂.</p><p>Reading files brings content to Python.</p><p>Open, read, close.</p><p>Handle exceptions carefully.</p><p>Practice file handling.</p><p>Python IO made easy.</p><p>Master reading files 🐍</p></body>",
      "task": "<body style='font-family:Arial;padding:10px;'><p>Write a Python program to read the contents of a file and display them.</p></body>",
      "hint": "<body style='font-family:Arial;padding:10px;'><p>Use <code>open('filename','r')</code> and <code>read()</code> methods.</p></body>",
      "starterCode": {
        "/script.py": "# Read from a file\nfilename = 'data.txt'\n# your code here"
      },
      "regex": "open|read",
      "output": "File content displayed",
      "hintXp": 30
    }
  },
  {
    "courseId": 4,
    "exerciseId": "write-to-file",
    "exerciseName": "Write to File ✍️🐍",
    "chapterId": 5,
    "exercisesContent": {
      "content": "<body style='font-family:Arial;line-height:1.8;background:#0f0f0f;color:#e5e7eb;padding:20px;'><p>Writing files saves data ✍️.</p><p>Use modes carefully.</p><p>Overwrite or create new.</p><p>Python makes IO simple.</p><p>Practice writing content.</p><p>Handle exceptions.</p><p>Master writing files 🐍</p></body>",
      "task": "<body style='font-family:Arial;padding:10px;'><p>Write a Python program to write text to a file.</p></body>",
      "hint": "<body style='font-family:Arial;padding:10px;'><p>Use <code>open('filename','w')</code> and <code>write()</code> methods.</p></body>",
      "starterCode": {
        "/script.py": "# Write to a file\nfilename = 'output.txt'\n# your code here"
      },
      "regex": "open|write",
      "output": "File written successfully",
      "hintXp": 30
    }
  },
  {
    "courseId": 4,
    "exerciseId": "append-mode",
    "exerciseName": "Append Mode ➕🐍",
    "chapterId": 5,
    "exercisesContent": {
      "content": "<body style='font-family:Arial;line-height:1.8;background:#0f0f0f;color:#e5e7eb;padding:20px;'><p>Append mode adds to files ➕.</p><p>Original content stays intact.</p><p>Use 'a' mode safely.</p><p>Python IO flexibility.</p><p>Practice appending text.</p><p>Dynamic file updates.</p><p>Master append mode 🐍</p></body>",
      "task": "<body style='font-family:Arial;padding:10px;'><p>Write a Python program to append text to an existing file.</p></body>",
      "hint": "<body style='font-family:Arial;padding:10px;'><p>Use <code>open('filename','a')</code> and <code>write()</code>.</p></body>",
      "starterCode": {
        "/script.py": "# Append to a file\nfilename = 'log.txt'\n# your code here"
      },
      "regex": "open|write",
      "output": "Text appended successfully",
      "hintXp": 20
    }
  },
  {
    "courseId": 4,
    "exerciseId": "file-cleanup",
    "exerciseName": "File Cleanup 🧹🐍",
    "chapterId": 5,
    "exercisesContent": {
      "content": "<body style='font-family:Arial;line-height:1.8;background:#0f0f0f;color:#e5e7eb;padding:20px;'><p>Cleaning files removes clutter 🧹.</p><p>Delete content or empty files.</p><p>Python handles file deletion.</p><p>Practice safe cleanup.</p><p>Prevent data loss.</p><p>Master file cleanup 🐍</p></body>",
      "task": "<body style='font-family:Arial;padding:10px;'><p>Write a Python program to clear the contents of a file safely.</p></body>",
      "hint": "<body style='font-family:Arial;padding:10px;'><p>Open file in write mode without writing preserves the file but clears content.</p></body>",
      "starterCode": {
        "/script.py": "# Clear file contents\nfilename = 'temp.txt'\n# your code here"
      },
      "regex": "open",
      "output": "File cleaned successfully",
      "hintXp": 25
    }
  },
  {
    "courseId": 4,
    "exerciseId": "csv-reader",
    "exerciseName": "CSV Reader 📊🐍",
    "chapterId": 5,
    "exercisesContent": {
      "content": "<body style='font-family:Arial;line-height:1.8;background:#0f0f0f;color:#e5e7eb;padding:20px;'><p>CSV files are everywhere 📊.</p><p>Comma-separated values.</p><p>Read them into Python.</p><p>Use <code>csv</code> module.</p><p>Practice reading CSV data.</p><p>Dynamic data processing.</p><p>Master CSV reading 🐍</p></body>",
      "task": "<body style='font-family:Arial;padding:10px;'><p>Write a Python program to read data from a CSV file and print it.</p></body>",
      "hint": "<body style='font-family:Arial;padding:10px;'><p>Use <code>import csv</code> and <code>csv.reader</code>.</p></body>",
      "starterCode": {
        "/script.py": "# Read CSV file\nimport csv\nfilename = 'data.csv'\n# your code here"
      },
      "regex": "import csv|reader",
      "output": "CSV data displayed",
      "hintXp": 40
    }
  },
  {
    "courseId": 4,
    "exerciseId": "file-bug-fix",
    "exerciseName": "File Bug Fix 🐞🔧",
    "chapterId": 5,
    "exercisesContent": {
      "content": "<body style='font-family:Arial;line-height:1.8;background:#0f0f0f;color:#e5e7eb;padding:20px;'><p>File bugs are common 🐞.</p><p>Wrong modes or paths break code.</p><p>Python raises errors.</p><p>Debug carefully.</p><p>Practice error handling.</p><p>Master file debugging 🔧</p></body>",
      "task": "<body style='font-family:Arial;padding:10px;'><p>Identify and fix a bug in a file operation program.</p></body>",
      "hint": "<body style='font-family:Arial;padding:10px;'><p>Check file paths, modes, and handle exceptions.</p></body>",
      "starterCode": {
        "/script.py": "# Fix file bug\nfilename = 'data.txt'\n# your code here"
      },
      "regex": "open|read|write",
      "output": "File bug fixed",
      "hintXp": 30
    }
  }
]














  export async function GET() {
    try {
        for (const item of DATA) {
            await db.insert(ExerciseTable).values({
                courseId: item.courseId,
                chapterId: item.chapterId,
                exerciseId: item.exerciseId,
                exerciseName: item.exerciseName,
                exercisesContent: item.exercisesContent,
            });
        }
        return NextResponse.json("Success");
    } catch (e) {
        console.error("DB Insert Error:", e);
        return NextResponse.json({ error: e }, { status: 500 });
    }
}



