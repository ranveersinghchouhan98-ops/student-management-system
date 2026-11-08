import React, { useState } from 'react';
import {
  X,
  User,
  GraduationCap,
  CalendarCheck,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Contact,
  Printer,
  Edit2,
  FileText,
  DollarSign,
  PlusCircle,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { Student, GradeRecord, FeeTransaction, AttendanceRecord } from '../../types';
import {
  formatCurrency,
  formatDate,
  getStatusBadgeClass,
  getFeeStatusBadgeClass,
  getAttendanceStatusBadgeClass,
} from '../../utils/helpers';

interface StudentDetailModalProps {
  student: Student | null;
  grades: GradeRecord[];
  transactions: FeeTransaction[];
  attendance: AttendanceRecord[];
  isOpen: boolean;
  onClose: () => void;
  onEdit: (student: Student) => void;
  onGenerateIdCard: (student: Student) => void;
  onRecordPayment: (studentId: string, amount: number) => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  grades,
  transactions,
  attendance,
  isOpen,
  onClose,
  onEdit,
  onGenerateIdCard,
  onRecordPayment,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'academics' | 'attendance' | 'fees'>('overview');
  const [payAmount, setPayAmount] = useState<number>(1000);
  const [showPayModal, setShowPayModal] = useState(false);

  if (!isOpen || !student) return null;

  const studentGrades = grades.filter((g) => g.studentId === student.id);
  const studentTransactions = transactions.filter((t) => t.studentId === student.id);
  const studentAttendance = attendance.filter((a) => a.studentId === student.id);

  const outstandingBalance = Math.max(0, student.totalFee - student.paidFee);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (payAmount <= 0) return;
    onRecordPayment(student.id, payAmount);
    setShowPayModal(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Profile Section */}
        <div className="bg-slate-900 text-white p-6 relative overflow-hidden">
          {/* Subtle institutional pattern */}
          <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-blue-900/40 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={student.avatarUrl}
                alt={student.firstName}
                className="w-16 h-16 rounded-xl object-cover border-2 border-white/20 shadow-md shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xl font-bold tracking-tight text-white">
                    {student.firstName} {student.lastName}
                  </h1>
                  <span className="font-mono text-xs bg-white/10 text-slate-200 px-2 py-0.5 rounded border border-white/10">
                    {student.rollNo}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${getStatusBadgeClass(
                      student.status
                    )}`}
                  >
                    {student.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  {student.program} • {student.department}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Academic Year {student.year} (Semester {student.semester}) • Enrolled{' '}
                  {formatDate(student.enrollmentDate)}
                </p>
              </div>
            </div>

            {/* Quick action buttons in header */}
            <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
              <button
                onClick={() => onGenerateIdCard(student)}
                className="px-3 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Student ID Card"
              >
                <Contact className="w-3.5 h-3.5" />
                <span>ID Card</span>
              </button>
              <button
                onClick={() => onEdit(student)}
                className="px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Edit Student"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={handlePrint}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                title="Print Profile"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors ml-1"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-white px-6 gap-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Overview & Bio</span>
          </button>

          <button
            onClick={() => setActiveTab('academics')}
            className={`py-3.5 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'academics'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academics & Grades</span>
          </button>

          <button
            onClick={() => setActiveTab('attendance')}
            className={`py-3.5 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'attendance'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Attendance Log</span>
          </button>

          <button
            onClick={() => setActiveTab('fees')}
            className={`py-3.5 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'fees'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Tuition & Ledger</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {/* TAB 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Highlight Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Cumulative GPA
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-bold text-slate-900">{student.gpa.toFixed(2)}</span>
                    <span className="text-xs text-slate-400">/ 4.00</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold block mt-1">
                    {student.gpa >= 3.8 ? "Dean's Honor List" : 'Good Standing'}
                  </span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Attendance Rate
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-bold text-slate-900">{student.attendanceRate}%</span>
                  </div>
                  <span
                    className={`text-[10px] font-semibold block mt-1 ${
                      student.attendanceRate >= 85 ? 'text-emerald-600' : 'text-amber-600'
                    }`}
                  >
                    {student.attendanceRate >= 85 ? 'Compliant' : 'Warning Level'}
                  </span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Tuition Status
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-lg font-bold text-slate-900">{student.feeStatus}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono block mt-1">
                    {formatCurrency(student.paidFee)} / {formatCurrency(student.totalFee)}
                  </span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Current Term
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-lg font-bold text-slate-900">Semester {student.semester}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Year {student.year} Undergraduate
                  </span>
                </div>
              </div>

              {/* Bio & Demographics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                    Demographic Details
                  </h3>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                    <div>
                      <span className="text-slate-400 block">Date of Birth:</span>
                      <span className="font-semibold text-slate-800">{formatDate(student.dateOfBirth)}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Gender:</span>
                      <span className="font-semibold text-slate-800">{student.gender}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Blood Group:</span>
                      <span className="font-semibold text-slate-800">{student.bloodGroup}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Enrollment Date:</span>
                      <span className="font-semibold text-slate-800">{formatDate(student.enrollmentDate)}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400 block">Official Email:</span>
                      <span className="font-semibold text-slate-800 break-all">{student.email}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400 block">Phone Contact:</span>
                      <span className="font-semibold text-slate-800">{student.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                    Address & Emergency Contact
                  </h3>
                  <div className="text-xs space-y-3">
                    <div>
                      <span className="text-slate-400 block">Residential Address:</span>
                      <p className="font-semibold text-slate-800 mt-0.5">
                        {student.address.street}, {student.address.city}, {student.address.state} {student.address.zipCode}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-slate-400 block">Emergency Contact:</span>
                      <p className="font-bold text-slate-800 mt-0.5">
                        {student.emergencyContact.name}{' '}
                        <span className="font-normal text-slate-500">
                          ({student.emergencyContact.relationship})
                        </span>
                      </p>
                      <p className="text-slate-600 mt-0.5 font-mono">
                        {student.emergencyContact.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Academics */}
          {activeTab === 'academics' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Enrolled Courses & Grade Transcript</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Official semester grade breakdown</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
                  Semester GPA: {student.gpa.toFixed(2)}
                </span>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-2.5 px-4">Course</th>
                      <th className="py-2.5 px-3 text-center">Midterm 1 (25)</th>
                      <th className="py-2.5 px-3 text-center">Midterm 2 (25)</th>
                      <th className="py-2.5 px-3 text-center">Assignments (20)</th>
                      <th className="py-2.5 px-3 text-center">Final (30)</th>
                      <th className="py-2.5 px-3 text-center">Total (100)</th>
                      <th className="py-2.5 px-4 text-center">Grade</th>
                      <th className="py-2.5 px-4 text-right">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {studentGrades.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-slate-400">
                          No grades recorded yet for the current semester.
                        </td>
                      </tr>
                    ) : (
                      studentGrades.map((grade) => (
                        <tr key={grade.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-semibold text-slate-800">
                            <div>{grade.courseTitle}</div>
                            <span className="font-mono text-[10px] text-slate-400">
                              {grade.courseCode}
                            </span>
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
          )}

          {/* TAB 3: Attendance */}
          {activeTab === 'attendance' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Attendance Compliance Log</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Requirement: Minimum 75% attendance for examination eligibility
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-slate-900">{student.attendanceRate}%</span>
                  <span className="text-xs text-slate-400 block">Overall Cumulative</span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-2.5 px-4">Date</th>
                      <th className="py-2.5 px-4">Course</th>
                      <th className="py-2.5 px-4">Department</th>
                      <th className="py-2.5 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {studentAttendance.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-slate-400">
                          No logged attendance sessions found for this student.
                        </td>
                      </tr>
                    ) : (
                      studentAttendance.map((rec) => (
                        <tr key={rec.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-medium text-slate-800">{formatDate(rec.date)}</td>
                          <td className="py-3 px-4 font-mono text-slate-600">{rec.courseCode}</td>
                          <td className="py-3 px-4 text-slate-600">{rec.department}</td>
                          <td className="py-3 px-4 text-right">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getAttendanceStatusBadgeClass(
                                rec.status
                              )}`}
                            >
                              {rec.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: Fees & Ledger */}
          {activeTab === 'fees' && (
            <div className="space-y-4">
              {/* Financial Summary Card */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Outstanding Tuition Balance
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold text-slate-900">
                      {formatCurrency(outstandingBalance)}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-semibold border ${getFeeStatusBadgeClass(
                        student.feeStatus
                      )}`}
                    >
                      {student.feeStatus}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Total: {formatCurrency(student.totalFee)} • Paid: {formatCurrency(student.paidFee)}
                  </p>
                </div>

                {outstandingBalance > 0 && (
                  <button
                    onClick={() => setShowPayModal(true)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-center"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Record Tuition Payment</span>
                  </button>
                )}
              </div>

              {/* Transactions Ledger */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Payment Receipts History
                  </h4>
                  <span className="text-xs text-slate-400">{studentTransactions.length} transaction(s)</span>
                </div>

                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-2.5 px-4">Receipt #</th>
                      <th className="py-2.5 px-4">Date</th>
                      <th className="py-2.5 px-4">Fee Type</th>
                      <th className="py-2.5 px-4">Payment Method</th>
                      <th className="py-2.5 px-4 text-right">Amount</th>
                      <th className="py-2.5 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {studentTransactions.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">
                          No transactions recorded yet.
                        </td>
                      </tr>
                    ) : (
                      studentTransactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-mono font-semibold text-blue-600">
                            {tx.invoiceNo}
                          </td>
                          <td className="py-3 px-4 text-slate-600">{formatDate(tx.date)}</td>
                          <td className="py-3 px-4 text-slate-700 font-medium">{tx.type}</td>
                          <td className="py-3 px-4 text-slate-600">{tx.paymentMethod}</td>
                          <td className="py-3 px-4 text-right font-bold text-slate-900 font-mono">
                            {formatCurrency(tx.amount)}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-white border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>SIS System ID:</span>
            <span className="font-mono text-slate-600">{student.id}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-xs transition-colors"
          >
            Close Profile
          </button>
        </div>
      </div>

      {/* Record Payment Sub-modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 p-6 max-w-sm w-full">
            <h3 className="text-base font-bold text-slate-900">Record Fee Payment</h3>
            <p className="text-xs text-slate-500 mt-1">
              Outstanding: <span className="font-bold">{formatCurrency(outstandingBalance)}</span>
            </p>

            <form onSubmit={handlePay} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Payment Amount ($)
                </label>
                <input
                  type="number"
                  min="1"
                  max={outstandingBalance}
                  value={payAmount}
                  onChange={(e) => setPayAmount(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPayModal(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Confirm Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
