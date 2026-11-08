import React, { useState } from 'react';
import { Building2, Users, GraduationCap, BookOpen, MapPin, Award } from 'lucide-react';
import { Department, Student, Course } from '../../types';
import { COURSES } from '../../data/mockData';

interface DepartmentsViewProps {
  departments: Department[];
  students: Student[];
  onSelectDepartmentStudents: (deptName: string) => void;
}

export const DepartmentsView: React.FC<DepartmentsViewProps> = ({
  departments,
  students,
  onSelectDepartmentStudents,
}) => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Academic Departments</h1>
        <p className="text-sm text-slate-500 mt-1">
          Faculty leadership, departmental programs, student headcount, and performance metrics.
        </p>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {departments.map((dept) => {
          const deptStudents = students.filter((s) => s.department === dept.name);
          const deptCourses = COURSES.filter((c) => c.department === dept.name);
          const avgGpa = deptStudents.length > 0
            ? (deptStudents.reduce((acc, s) => acc + s.gpa, 0) / deptStudents.length).toFixed(2)
            : dept.avgGpa.toFixed(2);

          return (
            <div
              key={dept.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm border border-blue-200 shrink-0">
                    {dept.code}
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {dept.room}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="font-bold text-slate-900 text-base leading-snug">{dept.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Head of Department: <span className="font-semibold text-slate-700">{dept.headOfDepartment}</span>
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-center">
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Enrolled</span>
                    <span className="text-sm font-bold text-slate-900">{deptStudents.length}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Faculty</span>
                    <span className="text-sm font-bold text-slate-900">{dept.facultyCount}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Avg GPA</span>
                    <span className="text-sm font-bold text-blue-700">{avgGpa}</span>
                  </div>
                </div>

                {/* Courses Offered */}
                <div className="mt-4 space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Core Course Curriculum
                  </span>
                  {deptCourses.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">Curriculum under semester review</p>
                  ) : (
                    <div className="space-y-1">
                      {deptCourses.map((c) => (
                        <div
                          key={c.id}
                          className="text-xs flex items-center justify-between text-slate-600 bg-slate-50/70 px-2.5 py-1.5 rounded border border-slate-100"
                        >
                          <span className="font-medium truncate mr-2">{c.title}</span>
                          <span className="font-mono text-[10px] text-slate-400 shrink-0">
                            {c.code} ({c.credits} Cr)
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* View Students CTA */}
              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => onSelectDepartmentStudents(dept.name)}
                  className="w-full py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-center"
                >
                  View Enrolled Students ({deptStudents.length}) &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
