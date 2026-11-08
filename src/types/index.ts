export type EnrollmentStatus = 'Active' | 'On Leave' | 'Graduated' | 'Suspended';
export type FeeStatus = 'Paid' | 'Partial' | 'Overdue';
export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Excused';

export interface Student {
  id: string;
  rollNo: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  department: string;
  program: string;
  year: number; // 1, 2, 3, 4
  semester: number; // 1 to 8
  gpa: number;
  attendanceRate: number; // percentage e.g. 92
  enrollmentDate: string;
  status: EnrollmentStatus;
  feeStatus: FeeStatus;
  totalFee: number;
  paidFee: number;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  bloodGroup: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface Department {
  id: string;
  code: string;
  name: string;
  headOfDepartment: string;
  studentCount: number;
  facultyCount: number;
  avgGpa: number;
  room: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  department: string;
  credits: number;
  instructor: string;
  semester: number;
  enrolledStudentsCount: number;
}

export interface GradeRecord {
  id: string;
  studentId: string;
  studentName: string;
  courseCode: string;
  courseTitle: string;
  midterm1: number; // max 25
  midterm2: number; // max 25
  assignments: number; // max 20
  finalExam: number; // max 30
  totalScore: number; // max 100
  letterGrade: string; // A+, A, B+, B, C, D, F
  gradePoints: number; // 4.0 scale
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  department: string;
  courseCode: string;
  date: string;
  status: AttendanceStatus;
}

export interface FeeTransaction {
  id: string;
  invoiceNo: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  date: string;
  amount: number;
  type: 'Tuition' | 'Lab Fee' | 'Library' | 'Hostel' | 'Examination';
  paymentMethod: 'Credit Card' | 'Bank Transfer' | 'Cashier Desk' | 'Online Portal';
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description?: string;
}
