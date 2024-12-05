'use client';
import React, { useEffect, useState } from 'react';

import { SubmitHandler } from 'react-hook-form';

import { useSession } from 'next-auth/react';
import CourseCardManagement from '@/components/coursecomponents/CourseCardManagement';
import { toast } from 'react-toastify';
import Modal from '@/components/Modal';
import CourseForm from '@/components/forms/CoursesForm';
import Loading from '@/components/ui/Loading';
import type { TCourseSubmissionSchema } from '@/schemas/courseSubmission';

type Course = {
  _id: string;
  name: string;
  createdDate: string;
  instrument: { _id: string; name: string; description: string };
  sessionsPerWeek: number;
  grade: string;
  description: string;
  userId: string;
  backgroundColor: string;
};

export default function ManagementCourses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [course, setCourse] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const fetchCourse = async () => {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      const sortedCourse = data.sort((a: Course, b: Course) =>
        a.instrument.name.localeCompare(b.instrument.name)
      );

      setCourse(sortedCourse);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch courses', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCourse();
    console.log('fetching courses');
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedCourse(null);
    setIsModalOpen(false);
  };
  const handleEditClick = (course: Course) => {
    console.log(course);
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleFormSubmit: SubmitHandler<TCourseSubmissionSchema> = async (
    data
  ) => {
    if (!session || !session.user) {
      console.error('User is not authenticated');
      return;
    }

    const courseData = {
      name: data.name,
      instrument: data.instrument,
      sessionsPerWeek: data.sessionsPerWeek,
      grade: data.grade,
      description: data.description || '',
      userId: session.user.id,
      createdDate: selectedCourse
        ? selectedCourse.createdDate
        : data.createdDate.toISOString(),

      backgroundColor: data.backgroundColor,
    };

    // const formData = new FormData();
    // formData.append('name', data.name);
    // formData.append('instrument', data.instrument);
    // formData.append('sessionsPerWeek', data.sessionsPerWeek.toString());
    // formData.append('description', data.description || '');
    // formData.append('grade', data.grade);

    // formData.append('userId', data.userId);
    // formData.append(
    //   'createdDate',
    //   selectedCourse
    //     ? selectedCourse.createdDate
    //     : data.createdDate.toISOString()
    // );
    // if (selectedCourse) {
    //   formData.append('id', selectedCourse._id);
    // }

    try {
      console.log('Submitting form data to API...', courseData);
      let response;
      if (selectedCourse) {
        response = await fetch(`/api/courses`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            courseData: { ...courseData, id: selectedCourse._id },
          }),
        });
        console.log('Submitting form data to API...APPENDED', courseData);
      } else {
        response = await fetch('/api/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ courseData }),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      console.log('Form submission successful:', result);
      toast.success('News post saved successfully');
      closeModal();
      fetchCourse();
      // Navigate to a different page or show a success message if needed
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to Submit Form');
    }
  };

  const handleDeleteClick = (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course')) {
      onDelete(courseId);
    }
  };
  const onDelete = async (courseId: string) => {
    try {
      const response = await fetch(`/api/courses?id=${courseId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete Course');
      }
      toast.success('Course deleted successfully');
      fetchCourse();
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course');
    }
  };
  if (loading) <Loading />;

  const coursesByInstrument: { [key: string]: Course[] } = course.reduce(
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Courses</h1>
        <button
          onClick={openModal}
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          Add New Course
        </button>
      </div>
      {Object.keys(coursesByInstrument).map((instrumentName) => (
        <div key={instrumentName}>
          <h2 className="text-2xl font-bold mb-4">{instrumentName}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coursesByInstrument[instrumentName].map((course) => (
              <CourseCardManagement
                key={course._id}
                name={course.name}
                id={course._id}
                description={course.description}
                instrument={course.instrument}
                sessionsPerWeek={course.sessionsPerWeek}
                grade={course.grade}
                createdDate={course.createdDate}
                backgroundColor={course.backgroundColor}
                onEdit={() => handleEditClick(course)}
                onDelete={() => handleDeleteClick(course._id)}
              />
            ))}
          </div>
        </div>
      ))}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <CourseForm
            onSubmit={handleFormSubmit}
            initialData={
              selectedCourse
                ? {
                    ...selectedCourse,
                    createdDate: new Date(),
                    instrument: selectedCourse.instrument._id,
                  }
                : null
            }
          />
        </Modal>
      )}
    </div>
  );
}
