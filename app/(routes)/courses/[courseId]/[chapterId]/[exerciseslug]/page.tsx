'use client';

import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import { exercise } from '../../../_components/CourseList';
import ContentSection from './_components/ContentSection';
import Header from '@/app/_components/Header';

/* -------------------- Types -------------------- */

export type CourseExercise = {
  chapterId: number;
  courseId: number;
  desc: string;
  name: string;
  exercises: exercise[];
  exerciseData: ExerciseData;
};

type ExerciseData = {
  chapterId: number;
  courseId: number;
  exerciseId: string;
  exerciseName: string;
  exercisesContent: ExercisesContent;
};

type ExercisesContent = {
  content: string;
  hint: string;
  hintXp: string;
  starterCode: any;
  task: string;
};

/* -------------------- Component -------------------- */

function Playground() {
  const params = useParams();

  const courseId = Number(params?.courseId);
  const chapterId = Number(params?.chapterId);
  const exerciseSlug = params?.exerciseslug?.toString();

  const [loading, setLoading] = useState(false);
  const [courseExerciseData, setCourseExerciseData] = useState<CourseExercise>();

  useEffect(() => {
    if (courseId && chapterId && exerciseSlug) {
      GetExerciseCourseDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, chapterId, exerciseSlug]);

  const GetExerciseCourseDetail = async () => {
    try {
      setLoading(true);

      const result = await axios.post('/api/exercise', {
        courseId,
        chapterId,
        exerciseId: exerciseSlug,
      });

      setCourseExerciseData(result.data);
    } catch (err) {
      console.error("Error fetching exercise:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div className="bg-black border-b border-zinc-800 font-game">
        <div className="max-w-7xl mx-auto px-6 font-game">
          <Header />
        </div>
      </div>

      {/* Layout */}
      <div className="border-t-4">
        <SplitterLayout
          percentage
          primaryMinSize={40}
          secondaryInitialSize={60}
        >
          {/* LEFT — Exercise Content */}
          <div>
            <ContentSection
              courseExerciseData={courseExerciseData}
              loading={loading}
            />
          </div>

          {/* RIGHT — Code Editor Placeholder */}
          <div>Code Editor</div>
        </SplitterLayout>
      </div>
    </div>
  );
}

export default Playground;
