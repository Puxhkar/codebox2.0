'use client';

import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';

import Link from 'next/link'; // ✅ FIXED
import { completedExcercises, exercise } from '../../../_components/CourseList';
import ContentSection from './_components/ContentSection';
import Header from '@/app/_components/Header';
import CodeEditor from './_components/CodeEditor';
import { Button } from '@/components/ui/button';

/* -------------------- Types -------------------- */

export type CourseExercise = {
  chapterId: number;
  courseId: number;
  desc: string;
  name: string;
  exercises: exercise[];
  exerciseData: ExerciseData;
  completedExercise: completedExcercises[];
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
  const exerciseSlug = params?.exerciseslug?.toString(); // ✅ correct slug

  const [loading, setLoading] = useState(false);
  const [courseExerciseData, setCourseExerciseData] =
    useState<CourseExercise>();
  const [nextButtonRoute, setNextButtonRoute] = useState<string>();
  const [prevButtonRoute, setPrevButtonRoute] = useState<string>();

  /* -------------------- Fetch Exercise -------------------- */

  useEffect(() => {
    if (courseId && chapterId && exerciseSlug) {
      getExerciseCourseDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, chapterId, exerciseSlug]);

  const getExerciseCourseDetail = async () => {
    try {
      setLoading(true);

      const result = await axios.post('/api/exercise', {
        courseId,
        chapterId,
        exerciseId: exerciseSlug,
      });

      setCourseExerciseData(result.data);
    } catch (err) {
      console.error('Error fetching exercise:', err);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- Disable Body Scroll -------------------- */

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  /* -------------------- Prev / Next Logic -------------------- */

  useEffect(() => {
    if (courseExerciseData && exerciseSlug) {
      getPrevNextButtonRoute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseExerciseData, exerciseSlug]);

  const getPrevNextButtonRoute = () => {
    if (!courseExerciseData) return;

    const currentIndex = courseExerciseData.exercises.findIndex(
      (item) => item.slug === exerciseSlug
    );

    const nextExercise =
      courseExerciseData.exercises[currentIndex + 1]?.slug;
    const prevExercise =
      courseExerciseData.exercises[currentIndex - 1]?.slug;

    setNextButtonRoute(
      nextExercise
        ? `/courses/${courseId}/${chapterId}/${nextExercise}`
        : undefined
    );

    setPrevButtonRoute(
      prevExercise
        ? `/courses/${courseId}/${chapterId}/${prevExercise}`
        : undefined
    );
  };

  /* -------------------- Render -------------------- */

  return (
    <div>
      {/* HEADER */}
      <div className="bg-black border-b border-zinc-800 font-game">
        <div className="max-w-7xl mx-auto px-6">
          <Header />
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="border-t-4">
        <SplitterLayout
          percentage
          primaryMinSize={40}
          secondaryInitialSize={60}
        >
          {/* LEFT */}
          <div>
            <ContentSection
              courseExerciseData={courseExerciseData}
              loading={loading}
            />
          </div>

          {/* RIGHT */}
          <div>
            <CodeEditor
              courseExerciseData={courseExerciseData}
              loading={loading}
            />
          </div>
        </SplitterLayout>
      </div>

      {/* BOTTOM NAV */}
      <div className="font-game fixed bottom-0 w-full bg-zinc-900 flex p-4 justify-between items-center">
        {prevButtonRoute ? (
          <Link href={prevButtonRoute}>
            <Button className="text-xl" variant="pixel">
              Previous
            </Button>
          </Link>
        ) : (
          <Button className="text-xl opacity-50" variant="pixel" disabled>
            Previous
          </Button>
        )}

        {nextButtonRoute ? (
          <Link href={nextButtonRoute}>
            <Button className="text-xl" variant="pixel">
              Next
            </Button>
          </Link>
        ) : (
          <Button className="text-xl opacity-50" variant="pixel" disabled>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

export default Playground;
