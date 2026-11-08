import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  BookOpen,
  Plus,
  Save,
  Download,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { GradeRecord, Student, Course } from '../../types';
import { COURSES } from '../../data/mockData';
import { calculateGrade } from '../../utils/helpers';

interface AcademicsViewProps {
  students: Student[];
  grades: GradeRecord[];
  onSaveGrade: (grade: GradeRecord) => void;
  onUpdateStudentGpa: (studentId: string, newGpa: number) => void;
}

export const AcademicsView: React.FC<AcademicsViewProps> = ({
  students,
  grades,
  onSaveGrade,
  onUpdateStudentGpa,
}) => {
  const [selectedCourse, setSelectedCourse] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // New Grade Entry Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newGrade, setNewGrade] = useState({
    studentId: students[0]?.id || '',
    courseCode: COURSES[0]?.code || '',
    midterm1: 22,
    midterm2: 23,
    assignments: 18,
    finalExam: 27,
  });

  const filteredGrades = grades.filter((g) => {
    const matchesCourse = selectedCourse === 'All' || g.courseCode === selectedCourse;
    const matchesSearch =
      searchQuery.trim() === '' ||
      g.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.courseTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  // Calculate grade distribution
  const aGrades = filteredGrades.filter((g) => g.letterGrade.startsWith('A')).length;
  const bGrades = filteredGrades.filter((g) => g.letterGrade.startsWith('B')).length;
  const cGrades = filteredGrades.filter((g) => g.letterGrade.startsWith('C')).length;
  const fGrades = filteredGrades.filter((g) => g.letterGrade === 'F' || g.letterGrade === 'D').length;
  const classAvg = filteredGrades.length > 0
    ? (filteredGrades.reduce((acc, curr) => acc + curr.totalScore, 0) / filteredGrades.length).toFixed(1)
    : '0';

  const handleCreateGrade = (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find((s) => s.id === newGrade.studentId);
    const course = COURSES.find((c) => c.code === newGrade.courseCode);
    if (!student || !course) return;

    const { total, letter, points } = calculateGrade(
      newGrade.midterm1,
      newGrade.midterm2,
      newGrade.assignments,
      newGrade.finalExam
    );

    const record: GradeRecord = {
      id: `grd-${Date.now()}`,
      studentId: student.id,
      studentName: `${student.firstName} ${student.lastName}`,
      courseCode: course.code,
      courseTitle: course.title,
      midterm1: newGrade.midterm1,
      midterm2: newGrade.midterm2,
      assignments: newGrade.assignments,
      finalExam: newGrade.finalExam,
      totalScore: total,
      letterGrade: letter,
      gradePoints: points,
    };

    onSaveGrade(record);

    // update student's cumulative GPA calculation
    const existing = grades.filter((g) => g.studentId === student.id);
    const allPoints = [...existing.map((g) => g.gradePoints), points];
    const newGpa = parseFloat((allPoints.reduce((a, b) => a + b, 0) / allPoints.length).toFixed(2));
    onUpdateStudentGpa(student.id, newGpa);

    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Academics & Gradebook</h1>
          <p className="text-sm text-slate-500 mt-1">
            Standardized evaluation, weighted assessment scores, and university transcripts.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs shadow-blue-500/20 transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Record Course Grade</span>
        </button>
      </div>

      {/* Grade Metrics Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
            Class Average
          </span>
          <span className="text-2xl font-bold text-slate-900 mt-1 block">{classAvg}%</span>
          <span className="text-[11px] text-slate-500">{filteredGrades.length} graded entries</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider block">
            Grade A / A+
          </span>
          <span className="text-2xl font-bold text-emerald-700 mt-1 block">{aGrades}</span>
          <span className="text-[11px] text-slate-500">Exemplary Standing</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider block">
            Grade B / B+
          </span>
          <span className="text-2xl font-bold text-blue-700 mt-1 block">{bGrades}</span>
          <span className="text-[11px] text-slate-500">Proficient Standing</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-semibold text-amber-600 uppercase tracking-wider block">
            Grade C / C+
          </span>
          <span className="text-2xl font-bold text-amber-700 mt-1 block">{cGrades}</span>
          <span className="text-[11px] text-slate-500">Passing Threshold</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
          <span className="text-[10px] font-semibold text-rose-600 uppercase tracking-wider block">
            Needs Remediation
          </span>
          <span className="text-2xl font-bold text-rose-700 mt-1 block">{fGrades}</span>
          <span className="text-[11px] text-slate-500">Below Minimum</span>
        </div>
      </div>

      {/* Control bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student or course title..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Filter Course:</span>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 font-medium"
          >
            <option value="All">All University Courses</option>
            {COURSES.map((c) => (
              <option key={c.id} value={c.code}>
                {c.code} - {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grade Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Course</th>
                <th className="py-3 px-3 text-center">Midterm 1 (25)</th>
                <th className="py-3 px-3 text-center">Midterm 2 (25)</th>
                <th className="py-3 px-3 text-center">Assignments (20)</th>
                <th className="py-3 px-3 text-center">Final Exam (30)</th>
                <th className="py-3 px-3 text-center">Total (100)</th>
                <th className="py-3 px-4 text-center">Letter Grade</th>
                <th className="py-3 px-4 text-right">Grade Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredGrades.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    No grade records found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredGrades.map((grade) => (
                  <tr key={grade.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {grade.studentName}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{grade.courseTitle}</div>
                      <span className="font-mono text-[10px] text-slate-400">{grade.courseCode}</span>
                    </td>
                    <td className="py-3 px-3 text-center font-mono">{grade.midterm1}</td>
                    <td className="py-3 px-3 text-center font-mono">{grade.midterm2}</td>
                    <td className="py-3 px-3 text-center font-mono">{grade.assignments}</td>
                    <td className="py-3 px-3 text-center font-mono">{grade.finalExam}</td>
                    <td className="py-3 px-3 text-center font-bold text-slate-900 font-mono">
                      {grade.totalScore}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-bold ${
                          grade.letterGrade.startsWith('A')
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : grade.letterGrade.startsWith('B')
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {grade.letterGrade}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-slate-800 font-mono">
                      {grade.gradePoints.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Grade Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="text-base font-bold text-slate-900">Record Course Grade</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateGrade} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Select Student
                </label>
                <select
                  value={newGrade.studentId}
                  onChange={(e) => setNewGrade({ ...newGrade, studentId: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.firstName} {s.lastName} ({s.rollNo}) - {s.department}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Course Subject
                </label>
                <select
                  value={newGrade.courseCode}
                  onChange={(e) => setNewGrade({ ...newGrade, courseCode: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                >
                  {COURSES.map((c) => (
                    <option key={c.id} value={c.code}>
                      {c.code} - {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Midterm 1 (Max 25)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="25"
                    value={newGrade.midterm1}
                    onChange={(e) =>
                      setNewGrade({ ...newGrade, midterm1: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Midterm 2 (Max 25)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="25"
                    value={newGrade.midterm2}
                    onChange={(e) =>
                      setNewGrade({ ...newGrade, midterm2: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Assignments (Max 20)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={newGrade.assignments}
                    onChange={(e) =>
                      setNewGrade({ ...newGrade, assignments: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Final Exam (Max 30)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={newGrade.finalExam}
                    onChange={(e) =>
                      setNewGrade({ ...newGrade, finalExam: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Save Grade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
