import React from 'react';
import { Eye, Edit2, Contact, Trash2 } from 'lucide-react';
import { Student } from '../../types';
import {
  getStatusBadgeClass,
  getFeeStatusBadgeClass,
  formatCurrency,
} from '../../utils/helpers';
import { Avatar } from '../common/Avatar';

interface StudentCardsProps {
  students: Student[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onViewProfile: (student: Student) => void;
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (student: Student) => void;
  onGenerateIdCard: (student: Student) => void;
}

export const StudentCards: React.FC<StudentCardsProps> = ({
  students,
  selectedIds,
  onToggleSelect,
  onViewProfile,
  onEditStudent,
  onDeleteStudent,
  onGenerateIdCard,
}) => {
  if (students.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400">
        No students found matching your criteria.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {students.map((student) => {
        const isSelected = selectedIds.includes(student.id);

        return (
          <div
            key={student.id}
            onClick={() => onViewProfile(student)}
            className={`bg-white rounded-xl border transition-all duration-200 p-5 shadow-xs hover:shadow-md hover:border-blue-200 cursor-pointer relative group ${
              isSelected ? 'border-blue-500 ring-2 ring-blue-500/10' : 'border-slate-200'
            }`}
          >
            {/* Header with avatar, selection and status */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar
                    firstName={student.firstName}
                    lastName={student.lastName}
                    size="lg"
                  />
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      e.stopPropagation();
                      onToggleSelect(student.id);
                    }}
                    className="absolute -top-1.5 -left-1.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer bg-white"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                    {student.firstName} {student.lastName}
                  </h3>
                  <p className="font-mono text-xs text-slate-500">{student.rollNo}</p>
                </div>
              </div>

              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadgeClass(
                  student.status
                )}`}
              >
                {student.status}
              </span>
            </div>

            {/* Department info */}
            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
              <div className="text-xs">
                <span className="text-slate-400 block">Department & Program:</span>
                <span className="font-semibold text-slate-800 truncate block mt-0.5">
                  {student.department}
                </span>
                <span className="text-[11px] text-slate-500">{student.program}</span>
              </div>

              {/* Key metrics grid */}
              <div className="grid grid-cols-3 gap-2 pt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">GPA</span>
                  <span className="text-xs font-bold text-slate-800">{student.gpa.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Attendance</span>
                  <span className="text-xs font-bold text-slate-800">{student.attendanceRate}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Year / Sem</span>
                  <span className="text-xs font-bold text-slate-800">Y{student.year} · S{student.semester}</span>
                </div>
              </div>

              {/* Tuition overview */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500">Tuition Status:</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${getFeeStatusBadgeClass(
                    student.feeStatus
                  )}`}
                >
                  {student.feeStatus} ({formatCurrency(student.paidFee)} / {formatCurrency(student.totalFee)})
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div
              className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => onViewProfile(student)}
                className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Full Profile</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => onGenerateIdCard(student)}
                  className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md"
                  title="Generate ID Card"
                >
                  <Contact className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onEditStudent(student)}
                  className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md"
                  title="Edit Student"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDeleteStudent(student)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md"
                  title="Delete Student"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
