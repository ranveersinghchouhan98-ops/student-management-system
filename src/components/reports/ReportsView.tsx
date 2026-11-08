import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Printer,
  RotateCcw,
  ShieldAlert,
  Database,
  FileCheck2,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { Student, GradeRecord, FeeTransaction, AttendanceRecord } from '../../types';
import { exportStudentsToCsv, formatCurrency, formatDate } from '../../utils/helpers';

interface ReportsViewProps {
  students: Student[];
  grades: GradeRecord[];
  transactions: FeeTransaction[];
  attendance: AttendanceRecord[];
  onResetData: () => void;
  onRequestConfirmReset: () => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  students,
  grades,
  transactions,
  attendance,
  onRequestConfirmReset,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const showFeedback = (name: string) => {
    setDownloadSuccess(name);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const exportGradesCsv = () => {
    const headers = [
      'Record ID',
      'Student Name',
      'Course Code',
      'Course Title',
      'Midterm 1',
      'Midterm 2',
      'Assignments',
      'Final Exam',
      'Total Score',
      'Letter Grade',
      'Grade Points',
    ];
    const rows = grades.map((g) => [
      `"${g.id}"`,
      `"${g.studentName}"`,
      `"${g.courseCode}"`,
      `"${g.courseTitle}"`,
      g.midterm1,
      g.midterm2,
      g.assignments,
      g.finalExam,
      g.totalScore,
      `"${g.letterGrade}"`,
      g.gradePoints,
    ]);
    const content = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    downloadBlob(content, `Academic_Grades_Report_${getToday()}.csv`);
    showFeedback('Grades CSV');
  };

  const exportFeesCsv = () => {
    const headers = [
      'Invoice No',
      'Student ID',
      'Student Name',
      'Date',
      'Category',
      'Payment Method',
      'Amount',
      'Status',
    ];
    const rows = transactions.map((t) => [
      `"${t.invoiceNo}"`,
      `"${t.studentId}"`,
      `"${t.studentName}"`,
      `"${t.date}"`,
      `"${t.type}"`,
      `"${t.paymentMethod}"`,
      t.amount,
      `"${t.status}"`,
    ]);
    const content = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    downloadBlob(content, `Tuition_Fee_Ledger_${getToday()}.csv`);
    showFeedback('Fees Ledger CSV');
  };

  const exportFullJsonBackup = () => {
    const backup = {
      timestamp: new Date().toISOString(),
      version: '2.4.0',
      system: 'AcademiaPulse SIS',
      students,
      grades,
      transactions,
      attendance,
    };
    downloadBlob(
      JSON.stringify(backup, null, 2),
      `AcademiaPulse_Full_Backup_${getToday()}.json`,
      'application/json'
    );
    showFeedback('Full Database JSON Backup');
  };

  const downloadBlob = (
    content: string,
    filename: string,
    type = 'text/csv;charset=utf-8;'
  ) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getToday = () => new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Reports, Exports & System Data
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Export official accreditation reports, generate data backups, and manage local storage cache.
        </p>
      </div>

      {downloadSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Successfully exported {downloadSuccess} to your downloads!</span>
        </div>
      )}

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card 1: Students Roster */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Official Student Roster</h3>
            <p className="text-xs text-slate-500 mt-1">
              Full demographic roster including roll number, program, GPA, and enrollment dates.
            </p>
            <div className="mt-3 text-[11px] text-slate-400 font-mono">
              Total records: {students.length} students
            </div>
          </div>

          <button
            onClick={() => {
              exportStudentsToCsv(students);
              showFeedback('Student Roster CSV');
            }}
            className="w-full py-2 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV Roster</span>
          </button>
        </div>

        {/* Card 2: Gradebook Transcript */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center mb-3">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Academic Gradebook Ledger</h3>
            <p className="text-xs text-slate-500 mt-1">
              Course-wise assessment marks (Midterms, Assignments, Finals), letter grades, and GPA points.
            </p>
            <div className="mt-3 text-[11px] text-slate-400 font-mono">
              Total records: {grades.length} evaluated courses
            </div>
          </div>

          <button
            onClick={exportGradesCsv}
            className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Grades CSV</span>
          </button>
        </div>

        {/* Card 3: Financial & Fees */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Tuition & Financial Receipts</h3>
            <p className="text-xs text-slate-500 mt-1">
              Bursar financial transaction trail, invoices, payment methods, and revenue totals.
            </p>
            <div className="mt-3 text-[11px] text-slate-400 font-mono">
              Total records: {transactions.length} payment receipts
            </div>
          </div>

          <button
            onClick={exportFeesCsv}
            className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Billing CSV</span>
          </button>
        </div>
      </div>

      {/* Database Backup & Maintenance Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-100 text-slate-700 rounded-lg">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              System Backup & Local Storage Management
            </h3>
            <p className="text-xs text-slate-500">
              Data is preserved locally in the browser's localStorage. You can export a full JSON dump or reset to demo data.
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={exportFullJsonBackup}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export Full JSON Database</span>
            </button>
          </div>

          <button
            onClick={onRequestConfirmReset}
            className="px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Official Sample Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
