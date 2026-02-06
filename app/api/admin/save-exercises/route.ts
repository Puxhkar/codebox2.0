import { db } from "@/config/db";
import { CourseChapterTable , ExerciseTable} from "@/config/schema";
// import { CourseChapterTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";

const DATA = 
[
  {
    "courseId": 2,
    "exerciseId": "play-the-sound",
    "exerciseName": "Play the Sound",
    "chapterId": 11,
    "exercisesContent": {
      "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p>HTML supports audio playback.</p><p>The audio tag is simple.</p><p>You can control sound playback.</p><p>Audio enhances user experience.</p><p>Controls allow interaction.</p><p>Modern browsers support audio.</p><p>Use proper formats.</p><p>Test audio playback.</p><p>Sound matters.</p><p>Let’s begin.</p></body>",
      "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Add an audio element with controls.</p></body>",
      "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Use the <code>&lt;audio&gt;</code> tag with <code>controls</code>.</p></body>",
      "starterCode": {
        "/index.html": "<!DOCTYPE html>\n<html>\n<body>\n</body>\n</html>"
      },
      "regex": "<audio[\\s\\S]*controls[\\s\\S]*>",
      "output": "<audio controls></audio>",
      "hintXp": 25
    }
  },
  {
    "courseId": 2,
    "exerciseId": "video-portal",
    "exerciseName": "Video Portal",
    "chapterId": 11,
    "exercisesContent": {
      "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p>Videos bring content to life.</p><p>The video tag enables playback.</p><p>Controls help navigation.</p><p>HTML handles video easily.</p><p>Use supported formats.</p><p>Video improves engagement.</p><p>Structure matters.</p><p>Test across browsers.</p><p>Build the portal.</p><p>Proceed.</p></body>",
      "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Add a video element with controls.</p></body>",
      "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Use <code>&lt;video controls&gt;</code>.</p></body>",
      "starterCode": {
        "/index.html": "<!DOCTYPE html>\n<html>\n<body>\n</body>\n</html>"
      },
      "regex": "<video[\\s\\S]*controls[\\s\\S]*>",
      "output": "<video controls></video>",
      "hintXp": 40
    }
  },
  {
    "courseId": 2,
    "exerciseId": "autoplay-test",
    "exerciseName": "Autoplay Test",
    "chapterId": 11,
    "exercisesContent": {
      "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p>Autoplay starts media automatically.</p><p>Browsers restrict autoplay.</p><p>Muted autoplay is allowed.</p><p>User experience matters.</p><p>Use attributes carefully.</p><p>Test behavior.</p><p>Understand restrictions.</p><p>Apply autoplay.</p><p>Check results.</p><p>Proceed.</p></body>",
      "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Add an autoplay attribute to the audio.</p></body>",
      "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Add <code>autoplay</code> to the audio tag.</p></body>",
      "starterCode": {
        "/index.html": "<!DOCTYPE html>\n<html>\n<body>\n<audio></audio>\n</body>\n</html>"
      },
      "regex": "<audio[\\s\\S]*autoplay[\\s\\S]*>",
      "output": "<audio autoplay></audio>",
      "hintXp": 20
    }
  },
  {
    "courseId": 2,
    "exerciseId": "add-subtitles",
    "exerciseName": "Add Subtitles",
    "chapterId": 11,
    "exercisesContent": {
      "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p>Subtitles improve accessibility.</p><p>Tracks provide captions.</p><p>Video supports subtitles.</p><p>Accessibility is essential.</p><p>Use correct attributes.</p><p>Language matters.</p><p>Support all users.</p><p>Add captions.</p><p>Improve UX.</p><p>Proceed.</p></body>",
      "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Add subtitles using a track tag.</p></body>",
      "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Use <code>&lt;track kind=\"subtitles\"&gt;</code>.</p></body>",
      "starterCode": {
        "/index.html": "<!DOCTYPE html>\n<html>\n<body>\n<video controls></video>\n</body>\n</html>"
      },
      "regex": "<track[\\s\\S]*kind=[\"']subtitles[\"'][\\s\\S]*>",
      "output": "<track kind=\"subtitles\" src=\"subs.vtt\">",
      "hintXp": 40
    }
  },
  {
    "courseId": 2,
    "exerciseId": "audio-playlist",
    "exerciseName": "Audio Playlist",
    "chapterId": 11,
    "exercisesContent": {
      "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p>Multiple sources improve compatibility.</p><p>Audio supports source tags.</p><p>Browsers choose supported formats.</p><p>Playlist concept starts here.</p><p>HTML handles fallback.</p><p>Structure sources.</p><p>Improve playback.</p><p>Add sources.</p><p>Test audio.</p><p>Proceed.</p></body>",
      "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Add multiple source tags inside audio.</p></body>",
      "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Use multiple <code>&lt;source&gt;</code> tags.</p></body>",
      "starterCode": {
        "/index.html": "<!DOCTYPE html>\n<html>\n<body>\n<audio controls></audio>\n</body>\n</html>"
      },
      "regex": "<audio[\\s\\S]*><source[\\s\\S]*></audio>",
      "output": "<audio controls><source src=\"song.mp3\"></audio>",
      "hintXp": 20
    }
  },
  {
    "courseId": 2,
    "exerciseId": "thumbnail-setup",
    "exerciseName": "Thumbnail Setup",
    "chapterId": 11,
    "exercisesContent": {
      "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p>Posters act as thumbnails.</p><p>Videos show images before play.</p><p>Poster improves appearance.</p><p>User sees preview.</p><p>HTML supports posters.</p><p>Use poster attribute.</p><p>Enhance UI.</p><p>Set thumbnail.</p><p>Finalize setup.</p><p>Proceed.</p></body>",
      "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Add a poster image to the video.</p></body>",
      "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Use the <code>poster</code> attribute.</p></body>",
      "starterCode": {
        "/index.html": "<!DOCTYPE html>\n<html>\n<body>\n<video controls></video>\n</body>\n</html>"
      },
      "regex": "<video[\\s\\S]*poster=[\"'][\\s\\S]*[\"'][\\s\\S]*>",
      "output": "<video controls poster=\"thumb.png\"></video>",
      "hintXp": 25
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



