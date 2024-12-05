'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loading from '@/components/ui/Loading';
import CourseCardVisitor from '@/components/coursecomponents/CourseCardVisitor';

type Course = {
  _id: string;
  name: string;
  description: string;
  instrument: { _id: string; name: string; description: string };
  createdDate: string;
  sessionsPerWeek: number;
  grade: string;
  backgroundColor: string;
};

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      const sortedCourses = data.sort((a: Course, b: Course) =>
        a.instrument.name.localeCompare(b.instrument.name)
      );
      setCourses(sortedCourses);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch courses', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  if (loading) return <Loading />;
  const coursesByInstrument: { [key: string]: Course[] } = courses.reduce(
    (groups, course) => {
      const instrumentName = course.instrument.name;
      if (!groups[instrumentName]) {
        groups[instrumentName] = [];
      }
      groups[instrumentName].push(course);
      return groups;
    },
    {} as { [key: string]: Course[] }
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Courses</h1>
      {Object.keys(coursesByInstrument).map((instrumentName) => (
        <div key={instrumentName} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{instrumentName}</h2>
          <p className="text-gray-700 text-base mb-4">
            {coursesByInstrument[instrumentName][0].instrument.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coursesByInstrument[instrumentName].map((course) => (
              <CourseCardVisitor
                key={course._id}
                name={course.name}
                description={course.description}
                instrument={course.instrument}
                sessionsPerWeek={course.sessionsPerWeek}
                grade={course.grade}
                createdDate={course.createdDate}
                backgroundColor={course.backgroundColor}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
