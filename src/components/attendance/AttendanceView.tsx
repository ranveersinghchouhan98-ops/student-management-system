import React, { useState } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  HelpCircle,
  Save,
  Download,
  Calendar,
  Filter,
} from 'lucide-react';
import { Student, AttendanceRecord, AttendanceStatus, Course } from '../../types';
import { COURSES } from '../../data/mockData';
import { formatDate, getAttendanceStatusBadgeClass } from '../../utils/helpers';

interface AttendanceViewProps {
  students: Student[];
  attendanceRecords: AttendanceRecord[];
  onSaveAttendanceBatch: (newRecords: AttendanceRecord[]) => void;
  onUpdateStudentAttendanceRates: (updatedStudents: Student[]) => void;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  students,
  attendanceRecords,
  onSaveAttendanceBatch,
  onUpdateStudentAttendanceRates,
}) => {
  const [selectedCourse, setSelectedCourse] = useState<string>(COURSES[0].code);
  const [sessionDate, setSessionDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Current session map: studentId -> status
  const [sessionMap, setSessionMap] = useState<Record<string, AttendanceStatus>>(() => {
    const initial: Record<string, AttendanceStatus> = {};
    students.forEach((s) => {
      initial[s.id] = 'Present';
    });
    return initial;
  });

  const courseObj = COURSES.find((c) => c.code === selectedCourse) || COURSES[0];
  const eligibleStudents = students.filter(
    (s) => s.status === 'Active' && (s.department === courseObj.department || Math.random() > 0.4)
  );

  const setStatus = (studentId: string, status: AttendanceStatus) => {
    setSessionMap((prev) => ({ ...prev, [studentId]: status }));
  };

  const markAll = (status: AttendanceStatus) => {
    const next: Record<string, AttendanceStatus> = {};
    eligibleStudents.forEach((s) => {
      next[s.id] = status;
    });
    setSessionMap((prev) => ({ ...prev, ...next }));
  };

  // Stats
  const presentCount = eligibleStudents.filter((s) => (sessionMap[s.id] || 'Present') === 'Present').length;
  const lateCount = eligibleStudents.filter((s) => sessionMap[s.id] === 'Late').length;
  const absentCount = eligibleStudents.filter((s) => sessionMap[s.id] === 'Absent').length;
  const excusedCount = eligibleStudents.filter((s) => sessionMap[s.id] === 'Excused').length;
  const sessionRate = eligibleStudents.length > 0
    ? Math.round(((presentCount + lateCount * 0.5) / eligibleStudents.length) * 100)
    : 100;

  const handleSave = () => {
    const newRecords: AttendanceRecord[] = eligibleStudents.map((s) => ({
      id: `att-${Date.now()}-${s.id}`,
      studentId: s.id,
      studentName: `${s.firstName} ${s.lastName}`,
      rollNo: s.rollNo,
      department: s.department,
      courseCode: selectedCourse,
      date: sessionDate,
      status: sessionMap[s.id] || 'Present',
    }));

    onSaveAttendanceBatch(newRecords);

    // recalculate student attendance rates slightly
    const updated = students.map((s) => {
      const st = sessionMap[s.id];
      if (!st) return s;
      let newRate = s.attendanceRate;
      if (st === 'Absent') newRate = Math.max(50, s.attendanceRate - 2);
      if (st === 'Present') newRate = Math.min(100, s.attendanceRate + 1);
      return { ...s, attendanceRate: newRate };
    });

    onUpdateStudentAttendanceRates(updated);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Attendance Register</h1>
          <p className="text-sm text-slate-500 mt-1">
            Conduct daily lecture attendance, monitor absentee trends, and enforce compliance.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs shadow-blue-500/20 transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save & Submit Register</span>
        </button>
      </div>

      {/* Session Controls Card */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Course Module
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold border border-slate-200 rounded-lg bg-white text-slate-800"
            >
              {COURSES.map((course) => (
                <option key={course.id} value={course.code}>
                  {course.code} - {course.title} ({course.department})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Session Date</label>
            <input
              type="date"
              value={sessionDate}
              onChange={(e) => setSessionDate(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Instructor</label>
            <div className="px-3 py-2 text-xs border border-slate-100 rounded-lg bg-slate-50 text-slate-700 font-medium">
              {courseObj.instructor}
            </div>
          </div>
        </div>

        {/* Live Metrics Strip */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs">
            <span className="font-semibold text-slate-700">
              Roster: {eligibleStudents.length} Students
            </span>
            <span className="text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {presentCount} Present
            </span>
            <span className="text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {lateCount} Late
            </span>
            <span className="text-rose-700 font-medium bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              {absentCount} Absent
            </span>
            <span className="text-blue-700 font-medium bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {excusedCount} Excused
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => markAll('Present')}
              className="px-3 py-1 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-md transition-colors"
            >
              Mark All Present
            </button>
            <button
              type="button"
              onClick={() => markAll('Absent')}
              className="px-3 py-1 text-xs font-semibold text-rose-700 bg-white hover:bg-rose-50 border border-rose-200 rounded-md transition-colors"
            >
              Mark All Absent
            </button>
          </div>
        </div>
      </div>

      {/* Attendance Roster Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-900">
            Enrolled Students Attendance Roster ({selectedCourse})
          </h2>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
            Session Compliance: {sessionRate}%
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-4">Historical Rate</th>
                <th className="py-3 px-4 text-center">Status Selection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {eligibleStudents.map((student) => {
                const currentStatus = sessionMap[student.id] || 'Present';

                return (
                  <tr key={student.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatarUrl}
                          alt={student.firstName}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-slate-900">
                            {student.firstName} {student.lastName}
                          </p>
                          <p className="text-[11px] text-slate-500">{student.program}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-slate-600">
                      {student.rollNo}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-semibold ${
                          student.attendanceRate >= 85
                            ? 'text-emerald-700'
                            : student.attendanceRate >= 75
                            ? 'text-amber-700'
                            : 'text-rose-700'
                        }`}
                      >
                        {student.attendanceRate}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setStatus(student.id, 'Present')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            currentStatus === 'Present'
                              ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-600/20'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          Present
                        </button>

                        <button
                          type="button"
                          onClick={() => setStatus(student.id, 'Late')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            currentStatus === 'Late'
                              ? 'bg-amber-500 text-white shadow-xs ring-2 ring-amber-500/20'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          Late
                        </button>

                        <button
                          type="button"
                          onClick={() => setStatus(student.id, 'Absent')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            currentStatus === 'Absent'
                              ? 'bg-rose-600 text-white shadow-xs ring-2 ring-rose-600/20'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          Absent
                        </button>

                        <button
                          type="button"
                          onClick={() => setStatus(student.id, 'Excused')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            currentStatus === 'Excused'
                              ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-600/20'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          Excused
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historical Sessions Log */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-sm font-bold text-slate-900">Recent Official Attendance Entries</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-2.5 px-4">Date</th>
                <th className="py-2.5 px-4">Student</th>
                <th className="py-2.5 px-4">Roll No</th>
                <th className="py-2.5 px-4">Course</th>
                <th className="py-2.5 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attendanceRecords.slice(0, 8).map((record) => (
                <tr key={record.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4 text-slate-600">{formatDate(record.date)}</td>
                  <td className="py-2.5 px-4 font-semibold text-slate-800">{record.studentName}</td>
                  <td className="py-2.5 px-4 font-mono text-slate-500">{record.rollNo}</td>
                  <td className="py-2.5 px-4 text-slate-700 font-mono">{record.courseCode}</td>
                  <td className="py-2.5 px-4 text-right">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getAttendanceStatusBadgeClass(
                        record.status
                      )}`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
