import React from 'react';
import {
  MoreHorizontal,
  Eye,
  Edit2,
  Trash2,
  Contact,
  ArrowUpDown,
  Mail,
  Phone,
} from 'lucide-react';
import { Student } from '../../types';
import {
  getStatusBadgeClass,
  getFeeStatusBadgeClass,
  formatCurrency,
} from '../../utils/helpers';

interface StudentTableProps {
  students: Student[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onViewProfile: (student: Student) => void;
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (student: Student) => void;
  onGenerateIdCard: (student: Student) => void;
  sortField: keyof Student;
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof Student) => void;
}

export const StudentTable: React.FC<StudentTableProps> = ({
  students,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onViewProfile,
  onEditStudent,
  onDeleteStudent,
  onGenerateIdCard,
  sortField,
  sortDirection,
  onSort,
}) => {
  const isAllSelected = students.length > 0 && selectedIds.length === students.length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4 w-10">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onToggleSelectAll}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  aria-label="Select all students"
                />
              </th>

              {/* Student Name */}
              <th
                onClick={() => onSort('firstName')}
                className="py-3 px-4 cursor-pointer hover:text-slate-800 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Student</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>

              {/* Roll No */}
              <th
                onClick={() => onSort('rollNo')}
                className="py-3 px-4 cursor-pointer hover:text-slate-800 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Roll No</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>

              {/* Department */}
              <th
                onClick={() => onSort('department')}
                className="py-3 px-4 cursor-pointer hover:text-slate-800 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Department & Year</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>

              {/* GPA */}
              <th
                onClick={() => onSort('gpa')}
                className="py-3 px-4 cursor-pointer hover:text-slate-800 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>GPA</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>

              {/* Attendance */}
              <th
                onClick={() => onSort('attendanceRate')}
                className="py-3 px-4 cursor-pointer hover:text-slate-800 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Attendance</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>

              {/* Status */}
              <th className="py-3 px-4">Status</th>

              {/* Fee Status */}
              <th className="py-3 px-4">Tuition</th>

              {/* Action column */}
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-sm">
            {students.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-slate-400">
                  No students found matching your criteria.
                </td>
              </tr>
            ) : (
              students.map((student) => {
                const isSelected = selectedIds.includes(student.id);

                return (
                  <tr
                    key={student.id}
                    onClick={() => onViewProfile(student)}
                    className={`hover:bg-blue-50/40 transition-colors group cursor-pointer ${
                      isSelected ? 'bg-blue-50/60' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td
                      className="py-3 px-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelect(student.id)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        aria-label={`Select student ${student.firstName} ${student.lastName}`}
                      />
                    </td>

                    {/* Student Name & Avatar */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatarUrl}
                          alt={student.firstName}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                            {student.firstName} {student.lastName}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                            <span className="truncate">{student.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Roll No */}
                    <td className="py-3 px-4">
                      <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {student.rollNo}
                      </span>
                    </td>

                    {/* Department & Year */}
                    <td className="py-3 px-4">
                      <p className="text-xs font-semibold text-slate-800 truncate max-w-[200px]">
                        {student.department}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Year {student.year} • Semester {student.semester}
                      </p>
                    </td>

                    {/* GPA */}
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded ${
                          student.gpa >= 3.8
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : student.gpa >= 3.0
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {student.gpa.toFixed(2)}
                      </span>
                    </td>

                    {/* Attendance */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-semibold ${
                            student.attendanceRate >= 85
                              ? 'text-emerald-700'
                              : student.attendanceRate >= 75
                              ? 'text-amber-700'
                              : 'text-rose-700'
                          }`}
                        >
                          {student.attendanceRate}%
                        </span>
                        <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              student.attendanceRate >= 85
                                ? 'bg-emerald-500'
                                : student.attendanceRate >= 75
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`}
                            style={{ width: `${student.attendanceRate}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Enrollment Status */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadgeClass(
                          student.status
                        )}`}
                      >
                        {student.status}
                      </span>
                    </td>

                    {/* Tuition Fee Status */}
                    <td className="py-3 px-4">
                      <div className="text-xs">
                        <span
                          className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold border ${getFeeStatusBadgeClass(
                            student.feeStatus
                          )}`}
                        >
                          {student.feeStatus}
                        </span>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          {formatCurrency(student.paidFee)} / {formatCurrency(student.totalFee)}
                        </p>
                      </div>
                    </td>

                    {/* Action buttons */}
                    <td
                      className="py-3 px-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onViewProfile(student)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="View Profile Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onGenerateIdCard(student)}
                          className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                          title="Generate Student ID Card"
                        >
                          <Contact className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEditStudent(student)}
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                          title="Edit Student Information"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteStudent(student)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                          title="Delete Student Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
