import React from 'react';
import {
  Users,
  GraduationCap,
  CalendarCheck,
  CreditCard,
  ArrowUpRight,
  UserPlus,
  Award,
  AlertCircle,
} from 'lucide-react';
import { Student, Department, FeeTransaction } from '../../types';
import { formatCurrency, formatDate, getStatusBadgeClass } from '../../utils/helpers';
import { ActiveTab } from '../common/Sidebar';
import { Avatar } from '../common/Avatar';

interface DashboardViewProps {
  students: Student[];
  departments: Department[];
  transactions: FeeTransaction[];
  onNavigate: (tab: ActiveTab) => void;
  onOpenAddModal: () => void;
  onSelectStudent: (student: Student) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  students,
  departments,
  transactions,
  onNavigate,
  onOpenAddModal,
  onSelectStudent,
}) => {
  // Metric calculations
  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === 'Active').length;
  const avgGpa = totalStudents > 0
    ? (students.reduce((acc, curr) => acc + curr.gpa, 0) / totalStudents).toFixed(2)
    : '0.00';
  const avgAttendance = totalStudents > 0
    ? Math.round(students.reduce((acc, curr) => acc + curr.attendanceRate, 0) / totalStudents)
    : 0;

  const totalTuitionReceivable = students.reduce((acc, s) => acc + s.totalFee, 0);
  const totalTuitionCollected = students.reduce((acc, s) => acc + s.paidFee, 0);
  const tuitionProgress = totalTuitionReceivable > 0
    ? Math.round((totalTuitionCollected / totalTuitionReceivable) * 100)
    : 0;

  // Academic alerts
  const atRiskStudents = students.filter((s) => s.attendanceRate < 75 || s.gpa < 2.5);
  const overdueFeeCount = students.filter((s) => s.feeStatus === 'Overdue').length;
  const deansListCount = students.filter((s) => s.gpa >= 3.8 && s.status === 'Active').length;

  return (
    <div className="space-y-6">
      {/* Page Title & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Academic Overview</h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time enrollment statistics, academic performance, and department metrics.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('attendance')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
          >
            <CalendarCheck className="w-3.5 h-3.5 text-slate-500" />
            <span>Mark Attendance</span>
          </button>
          <button
            onClick={onOpenAddModal}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs shadow-blue-500/20 transition-all flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Enroll Student</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Enrolled Students */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Enrolled Students
            </span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">{totalStudents}</span>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              +{activeStudents} Active
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>In Good Standing: {students.filter(s => s.status === 'Active' && s.gpa >= 3.0).length}</span>
            <span className="text-blue-600 font-semibold cursor-pointer hover:underline" onClick={() => onNavigate('students')}>
              Directory &rarr;
            </span>
          </div>
        </div>

        {/* KPI 2: Average Cumulative GPA */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Average Cum. GPA
            </span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-100">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">{avgGpa}</span>
            <span className="text-xs font-medium text-slate-500">/ 4.00 Max</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <Award className="w-3.5 h-3.5" />
              {deansListCount} Dean's List
            </span>
            <span className="text-blue-600 font-semibold cursor-pointer hover:underline" onClick={() => onNavigate('academics')}>
              Grades &rarr;
            </span>
          </div>
        </div>

        {/* KPI 3: Attendance Average */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Avg. Attendance Rate
            </span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">{avgAttendance}%</span>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              Optimal
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>Minimum Target: 75%</span>
            <span className="text-blue-600 font-semibold cursor-pointer hover:underline" onClick={() => onNavigate('attendance')}>
              Register &rarr;
            </span>
          </div>
        </div>

        {/* KPI 4: Tuition Fee Collection */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Tuition Collected
            </span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg border border-amber-100">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              {formatCurrency(totalTuitionCollected)}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {tuitionProgress}%
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden border border-slate-200/50">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${tuitionProgress}%` }}
            ></div>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>Due: {formatCurrency(totalTuitionReceivable - totalTuitionCollected)}</span>
            <span className="text-blue-600 font-semibold cursor-pointer hover:underline" onClick={() => onNavigate('fees')}>
              Ledger &rarr;
            </span>
          </div>
        </div>
      </div>

      {/* Academic Alerts Banner (if any) */}
      {(atRiskStudents.length > 0 || overdueFeeCount > 0) && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-amber-900">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-lg shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">
                Attention Required: Academic & Financial Compliance Alerts
              </p>
              <p className="text-xs text-amber-700 mt-0.5">
                {atRiskStudents.length} student(s) currently below standard attendance or GPA thresholds;{' '}
                {overdueFeeCount} student account(s) have overdue tuition balances.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              onClick={() => onNavigate('students')}
              className="px-3 py-1.5 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-xs transition-colors"
            >
              Review Affected Students
            </button>
          </div>
        </div>
      )}

      {/* Main Grid: Recent Registrations & Department Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Recent Students Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Student Profiles</h2>
              <p className="text-xs text-slate-500 mt-0.5">Latest enrollments and active academic status</p>
            </div>
            <button
              onClick={() => onNavigate('students')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
            >
              View Full Directory <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Roll No</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">GPA</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {students.slice(0, 6).map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => onSelectStudent(student)}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar
                          firstName={student.firstName}
                          lastName={student.lastName}
                          size="sm"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                            {student.firstName} {student.lastName}
                          </p>
                          <p className="text-xs text-slate-500 truncate">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-slate-600">{student.rollNo}</td>
                    <td className="py-3 px-4 text-xs text-slate-600 max-w-[160px] truncate">
                      {student.department}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                        {student.gpa.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadgeClass(
                          student.status
                        )}`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectStudent(student);
                        }}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                      >
                        Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Department Capacity & Recent Fee Transactions */}
        <div className="space-y-6">
          {/* Department Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900">Department Roster</h2>
              <button
                onClick={() => onNavigate('departments')}
                className="text-xs text-blue-600 font-semibold hover:underline"
              >
                View all
              </button>
            </div>

            <div className="mt-4 space-y-3.5">
              {departments.slice(0, 4).map((dept) => {
                const count = students.filter((s) => s.department === dept.name).length;
                const percentage = Math.min(100, Math.round((count / Math.max(1, students.length)) * 100));

                return (
                  <div key={dept.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700 truncate max-w-[180px]">
                        {dept.name}
                      </span>
                      <span className="text-slate-500 font-mono font-medium">
                        {count} enrolled ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Financial Transactions Log */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900">Recent Fee Receipts</h2>
              <button
                onClick={() => onNavigate('fees')}
                className="text-xs text-blue-600 font-semibold hover:underline"
              >
                Ledger
              </button>
            </div>

            <div className="mt-3 divide-y divide-slate-100">
              {transactions.slice(0, 4).map((tx) => (
                <div key={tx.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 truncate">{tx.studentName}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
                      {tx.invoiceNo} • {formatDate(tx.date)}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-slate-900">{formatCurrency(tx.amount)}</p>
                    <span className="inline-block text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 font-medium">
                      {tx.paymentMethod}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
