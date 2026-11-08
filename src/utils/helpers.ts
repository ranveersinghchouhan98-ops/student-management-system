import { EnrollmentStatus, FeeStatus, AttendanceStatus, Student } from '../types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return '-';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
};

export const getStatusBadgeClass = (status: EnrollmentStatus): string => {
  switch (status) {
    case 'Active':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-600/20';
    case 'On Leave':
      return 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-600/20';
    case 'Graduated':
      return 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-600/20';
    case 'Suspended':
      return 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-600/20';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200 ring-slate-600/20';
  }
};

export const getFeeStatusBadgeClass = (status: FeeStatus): string => {
  switch (status) {
    case 'Paid':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Partial':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Overdue':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200';
  }
};

export const getAttendanceStatusBadgeClass = (status: AttendanceStatus): string => {
  switch (status) {
    case 'Present':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Late':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Absent':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    case 'Excused':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200';
  }
};

export const calculateGrade = (m1: number, m2: number, assign: number, final: number) => {
  const total = Math.min(100, Math.round(m1 + m2 + assign + final));
  let letter = 'F';
  let points = 0.0;

  if (total >= 93) {
    letter = 'A+';
    points = 4.0;
  } else if (total >= 90) {
    letter = 'A';
    points = 3.9;
  } else if (total >= 85) {
    letter = 'B+';
    points = 3.5;
  } else if (total >= 80) {
    letter = 'B';
    points = 3.0;
  } else if (total >= 75) {
    letter = 'C+';
    points = 2.5;
  } else if (total >= 70) {
    letter = 'C';
    points = 2.0;
  } else if (total >= 60) {
    letter = 'D';
    points = 1.0;
  } else {
    letter = 'F';
    points = 0.0;
  }

  return { total, letter, points };
};

export const exportStudentsToCsv = (students: Student[]): void => {
  const headers = [
    'Student ID',
    'First Name',
    'Last Name',
    'Email',
    'Phone',
    'Department',
    'Program',
    'Year',
    'Semester',
    'GPA',
    'Attendance %',
    'Status',
    'Fee Status',
    'Total Tuition (INR)',
    'Paid Tuition (INR)',
    'Enrollment Date',
  ];

  const rows = students.map((s) => [
    `"${s.rollNo}"`,
    `"${s.firstName}"`,
    `"${s.lastName}"`,
    `"${s.email}"`,
    `"${s.phone}"`,
    `"${s.department}"`,
    `"${s.program}"`,
    s.year,
    s.semester,
    s.gpa.toFixed(2),
    `${s.attendanceRate}%`,
    `"${s.status}"`,
    `"${s.feeStatus}"`,
    s.totalFee,
    s.paidFee,
    `"${s.enrollmentDate}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Students_Roster_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
