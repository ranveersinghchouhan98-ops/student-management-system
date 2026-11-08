import { Student, Department, Course, GradeRecord, FeeTransaction, AttendanceRecord } from '../types';

export const DEPARTMENTS: Department[] = [
  {
    id: 'dept-cse',
    code: 'CSE',
    name: 'Computer Science & Engineering',
    headOfDepartment: 'Dr. Arthur Vance',
    studentCount: 142,
    facultyCount: 16,
    avgGpa: 3.62,
    room: 'Turing Hall, Room 401',
  },
  {
    id: 'dept-ece',
    code: 'ECE',
    name: 'Electronics & Communication',
    headOfDepartment: 'Prof. Helen Ross',
    studentCount: 98,
    facultyCount: 12,
    avgGpa: 3.48,
    room: 'Maxwell Pavilion, Room 210',
  },
  {
    id: 'dept-ds',
    code: 'DS',
    name: 'Data Science & Artificial Intelligence',
    headOfDepartment: 'Dr. Rajesh Patel',
    studentCount: 110,
    facultyCount: 14,
    avgGpa: 3.71,
    room: 'Ada Lovelace Building, Room 102',
  },
  {
    id: 'dept-me',
    code: 'ME',
    name: 'Mechanical Engineering',
    headOfDepartment: 'Prof. Marcus Brody',
    studentCount: 84,
    facultyCount: 10,
    avgGpa: 3.35,
    room: 'Watt Mechanics Wing, Room 105',
  },
  {
    id: 'dept-ba',
    code: 'BA',
    name: 'Business Administration & Management',
    headOfDepartment: 'Dr. Evelyn Sinclair',
    studentCount: 130,
    facultyCount: 15,
    avgGpa: 3.55,
    room: 'Drucker Business Center, Room 303',
  },
  {
    id: 'dept-bio',
    code: 'BIO',
    name: 'Biotechnology & Bioinformatics',
    headOfDepartment: 'Dr. Kenneth Craig',
    studentCount: 65,
    facultyCount: 9,
    avgGpa: 3.68,
    room: 'Franklin Bio Center, Room 118',
  },
];

export const COURSES: Course[] = [
  {
    id: 'crs-101',
    code: 'CS-301',
    title: 'Data Structures & Algorithms',
    department: 'Computer Science & Engineering',
    credits: 4,
    instructor: 'Dr. Arthur Vance',
    semester: 5,
    enrolledStudentsCount: 42,
  },
  {
    id: 'crs-102',
    code: 'CS-304',
    title: 'Database Management Systems',
    department: 'Computer Science & Engineering',
    credits: 3,
    instructor: 'Prof. Sarah Jennings',
    semester: 5,
    enrolledStudentsCount: 38,
  },
  {
    id: 'crs-103',
    code: 'DS-202',
    title: 'Applied Machine Learning',
    department: 'Data Science & Artificial Intelligence',
    credits: 4,
    instructor: 'Dr. Rajesh Patel',
    semester: 3,
    enrolledStudentsCount: 45,
  },
  {
    id: 'crs-104',
    code: 'EC-201',
    title: 'Digital Signal Processing',
    department: 'Electronics & Communication',
    credits: 4,
    instructor: 'Prof. Helen Ross',
    semester: 3,
    enrolledStudentsCount: 32,
  },
  {
    id: 'crs-105',
    code: 'BA-401',
    title: 'Strategic Corporate Finance',
    department: 'Business Administration & Management',
    credits: 3,
    instructor: 'Dr. Evelyn Sinclair',
    semester: 7,
    enrolledStudentsCount: 50,
  },
  {
    id: 'crs-106',
    code: 'ME-302',
    title: 'Thermodynamics & Heat Transfer',
    department: 'Mechanical Engineering',
    credits: 4,
    instructor: 'Prof. Marcus Brody',
    semester: 5,
    enrolledStudentsCount: 28,
  },
  {
    id: 'crs-107',
    code: 'BIO-201',
    title: 'Genomics & Molecular Biology',
    department: 'Biotechnology & Bioinformatics',
    credits: 4,
    instructor: 'Dr. Kenneth Craig',
    semester: 3,
    enrolledStudentsCount: 24,
  },
  {
    id: 'crs-108',
    code: 'CS-402',
    title: 'Cloud Computing & Distributed Systems',
    department: 'Computer Science & Engineering',
    credits: 3,
    instructor: 'Prof. David Miller',
    semester: 7,
    enrolledStudentsCount: 36,
  },
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'stu-001',
    rollNo: 'STU-2024-001',
    firstName: 'Alexander',
    lastName: 'Wright',
    email: 'alexander.wright@university.edu',
    phone: '+1 (555) 234-8901',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    department: 'Computer Science & Engineering',
    program: 'B.Tech Computer Science',
    year: 3,
    semester: 5,
    gpa: 3.88,
    attendanceRate: 94,
    enrollmentDate: '2024-08-15',
    status: 'Active',
    feeStatus: 'Paid',
    totalFee: 8500,
    paidFee: 8500,
    gender: 'Male',
    dateOfBirth: '2004-03-14',
    bloodGroup: 'O+',
    emergencyContact: {
      name: 'Robert Wright',
      relationship: 'Father',
      phone: '+1 (555) 902-1144',
    },
    address: {
      street: '742 Evergreen Terrace',
      city: 'Boston',
      state: 'MA',
      zipCode: '02115',
    },
  },
  {
    id: 'stu-002',
    rollNo: 'STU-2024-002',
    firstName: 'Sophia',
    lastName: 'Chen',
    email: 'sophia.chen@university.edu',
    phone: '+1 (555) 345-9012',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256',
    department: 'Data Science & Artificial Intelligence',
    program: 'B.S. Data Science & AI',
    year: 2,
    semester: 3,
    gpa: 3.95,
    attendanceRate: 98,
    enrollmentDate: '2025-08-20',
    status: 'Active',
    feeStatus: 'Paid',
    totalFee: 8800,
    paidFee: 8800,
    gender: 'Female',
    dateOfBirth: '2005-06-22',
    bloodGroup: 'A+',
    emergencyContact: {
      name: 'Li Wei Chen',
      relationship: 'Mother',
      phone: '+1 (555) 883-2210',
    },
    address: {
      street: '124 Beacon Street, Apt 4B',
      city: 'Cambridge',
      state: 'MA',
      zipCode: '02138',
    },
  },
  {
    id: 'stu-003',
    rollNo: 'STU-2024-003',
    firstName: 'Marcus',
    lastName: 'Johnson',
    email: 'marcus.j@university.edu',
    phone: '+1 (555) 456-0123',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
    department: 'Business Administration & Management',
    program: 'Bachelor of Business Administration',
    year: 4,
    semester: 7,
    gpa: 3.42,
    attendanceRate: 88,
    enrollmentDate: '2023-08-10',
    status: 'Active',
    feeStatus: 'Partial',
    totalFee: 7800,
    paidFee: 5000,
    gender: 'Male',
    dateOfBirth: '2003-11-05',
    bloodGroup: 'B+',
    emergencyContact: {
      name: 'Denise Johnson',
      relationship: 'Mother',
      phone: '+1 (555) 774-9912',
    },
    address: {
      street: '450 Lexington Avenue',
      city: 'New York',
      state: 'NY',
      zipCode: '10017',
    },
  },
  {
    id: 'stu-004',
    rollNo: 'STU-2024-004',
    firstName: 'Emma',
    lastName: 'Watson-Baker',
    email: 'emma.wb@university.edu',
    phone: '+1 (555) 567-1234',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256',
    department: 'Biotechnology & Bioinformatics',
    program: 'B.S. Biotechnology',
    year: 2,
    semester: 3,
    gpa: 3.76,
    attendanceRate: 91,
    enrollmentDate: '2025-08-18',
    status: 'Active',
    feeStatus: 'Paid',
    totalFee: 8200,
    paidFee: 8200,
    gender: 'Female',
    dateOfBirth: '2005-02-17',
    bloodGroup: 'AB+',
    emergencyContact: {
      name: 'Clara Baker',
      relationship: 'Guardian',
      phone: '+1 (555) 321-7654',
    },
    address: {
      street: '88 Oakridge Lane',
      city: 'New Haven',
      state: 'CT',
      zipCode: '06511',
    },
  },
  {
    id: 'stu-005',
    rollNo: 'STU-2024-005',
    firstName: 'Devon',
    lastName: 'Vance',
    email: 'devon.vance@university.edu',
    phone: '+1 (555) 678-2345',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256',
    department: 'Electronics & Communication',
    program: 'B.Tech ECE',
    year: 3,
    semester: 5,
    gpa: 3.15,
    attendanceRate: 72,
    enrollmentDate: '2024-08-15',
    status: 'Active',
    feeStatus: 'Overdue',
    totalFee: 8400,
    paidFee: 2000,
    gender: 'Male',
    dateOfBirth: '2004-09-30',
    bloodGroup: 'O-',
    emergencyContact: {
      name: 'George Vance',
      relationship: 'Father',
      phone: '+1 (555) 612-4433',
    },
    address: {
      street: '312 Industrial Parkway',
      city: 'Providence',
      state: 'RI',
      zipCode: '02903',
    },
  },
  {
    id: 'stu-006',
    rollNo: 'STU-2024-006',
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@university.edu',
    phone: '+1 (555) 789-3456',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    department: 'Computer Science & Engineering',
    program: 'B.Tech Computer Science',
    year: 4,
    semester: 7,
    gpa: 3.92,
    attendanceRate: 96,
    enrollmentDate: '2023-08-12',
    status: 'Active',
    feeStatus: 'Paid',
    totalFee: 8500,
    paidFee: 8500,
    gender: 'Female',
    dateOfBirth: '2003-08-14',
    bloodGroup: 'B-',
    emergencyContact: {
      name: 'Anil Sharma',
      relationship: 'Father',
      phone: '+1 (555) 432-8877',
    },
    address: {
      street: '15 Maple Valley Road',
      city: 'Belmont',
      state: 'MA',
      zipCode: '02478',
    },
  },
  {
    id: 'stu-007',
    rollNo: 'STU-2024-007',
    firstName: 'Liam',
    lastName: 'O\'Connor',
    email: 'liam.oc@university.edu',
    phone: '+1 (555) 890-4567',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=256',
    department: 'Mechanical Engineering',
    program: 'B.Tech Mechanical Engineering',
    year: 3,
    semester: 5,
    gpa: 3.28,
    attendanceRate: 85,
    enrollmentDate: '2024-08-15',
    status: 'Active',
    feeStatus: 'Paid',
    totalFee: 8100,
    paidFee: 8100,
    gender: 'Male',
    dateOfBirth: '2004-12-01',
    bloodGroup: 'A-',
    emergencyContact: {
      name: 'Fiona O\'Connor',
      relationship: 'Mother',
      phone: '+1 (555) 911-3344',
    },
    address: {
      street: '52 Harborside Way',
      city: 'Portland',
      state: 'ME',
      zipCode: '04101',
    },
  },
  {
    id: 'stu-008',
    rollNo: 'STU-2024-008',
    firstName: 'Aaliyah',
    lastName: 'Al-Mansoor',
    email: 'aaliyah.am@university.edu',
    phone: '+1 (555) 901-5678',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=256',
    department: 'Data Science & Artificial Intelligence',
    program: 'B.S. Data Science & AI',
    year: 1,
    semester: 1,
    gpa: 3.82,
    attendanceRate: 97,
    enrollmentDate: '2026-08-22',
    status: 'Active',
    feeStatus: 'Paid',
    totalFee: 8800,
    paidFee: 8800,
    gender: 'Female',
    dateOfBirth: '2006-04-19',
    bloodGroup: 'O+',
    emergencyContact: {
      name: 'Tariq Al-Mansoor',
      relationship: 'Father',
      phone: '+1 (555) 543-9900',
    },
    address: {
      street: '700 Boylston St',
      city: 'Boston',
      state: 'MA',
      zipCode: '02116',
    },
  },
  {
    id: 'stu-009',
    rollNo: 'STU-2024-009',
    firstName: 'Carlos',
    lastName: 'Mendoza',
    email: 'carlos.m@university.edu',
    phone: '+1 (555) 012-6789',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=256',
    department: 'Business Administration & Management',
    program: 'Bachelor of Business Administration',
    year: 2,
    semester: 3,
    gpa: 3.49,
    attendanceRate: 83,
    enrollmentDate: '2025-08-16',
    status: 'On Leave',
    feeStatus: 'Partial',
    totalFee: 7800,
    paidFee: 4000,
    gender: 'Male',
    dateOfBirth: '2005-07-08',
    bloodGroup: 'AB-',
    emergencyContact: {
      name: 'Maria Mendoza',
      relationship: 'Sister',
      phone: '+1 (555) 678-0099',
    },
    address: {
      street: '22 South Street',
      city: 'Hartford',
      state: 'CT',
      zipCode: '06103',
    },
  },
  {
    id: 'stu-010',
    rollNo: 'STU-2024-010',
    firstName: 'Hanna',
    lastName: 'Lindqvist',
    email: 'hanna.l@university.edu',
    phone: '+1 (555) 123-7890',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=256',
    department: 'Biotechnology & Bioinformatics',
    program: 'B.S. Biotechnology',
    year: 4,
    semester: 8,
    gpa: 3.91,
    attendanceRate: 95,
    enrollmentDate: '2023-08-12',
    status: 'Graduated',
    feeStatus: 'Paid',
    totalFee: 8200,
    paidFee: 8200,
    gender: 'Female',
    dateOfBirth: '2003-01-25',
    bloodGroup: 'O+',
    emergencyContact: {
      name: 'Stefan Lindqvist',
      relationship: 'Father',
      phone: '+1 (555) 234-7711',
    },
    address: {
      street: '19 Elmwood Terrace',
      city: 'Newton',
      state: 'MA',
      zipCode: '02458',
    },
  },
  {
    id: 'stu-011',
    rollNo: 'STU-2024-011',
    firstName: 'Lucas',
    lastName: 'Silva',
    email: 'lucas.silva@university.edu',
    phone: '+1 (555) 234-9810',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256',
    department: 'Computer Science & Engineering',
    program: 'B.Tech Computer Science',
    year: 1,
    semester: 1,
    gpa: 3.58,
    attendanceRate: 89,
    enrollmentDate: '2026-08-25',
    status: 'Active',
    feeStatus: 'Overdue',
    totalFee: 8500,
    paidFee: 0,
    gender: 'Male',
    dateOfBirth: '2006-10-11',
    bloodGroup: 'A+',
    emergencyContact: {
      name: 'Camila Silva',
      relationship: 'Mother',
      phone: '+1 (555) 890-1234',
    },
    address: {
      street: '14 Pinckney Street',
      city: 'Boston',
      state: 'MA',
      zipCode: '02114',
    },
  },
  {
    id: 'stu-012',
    rollNo: 'STU-2024-012',
    firstName: 'Zoe',
    lastName: 'Kowalski',
    email: 'zoe.k@university.edu',
    phone: '+1 (555) 345-0921',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256',
    department: 'Electronics & Communication',
    program: 'B.Tech ECE',
    year: 2,
    semester: 3,
    gpa: 3.64,
    attendanceRate: 92,
    enrollmentDate: '2025-08-19',
    status: 'Active',
    feeStatus: 'Paid',
    totalFee: 8400,
    paidFee: 8400,
    gender: 'Female',
    dateOfBirth: '2005-05-14',
    bloodGroup: 'B+',
    emergencyContact: {
      name: 'Jan Kowalski',
      relationship: 'Father',
      phone: '+1 (555) 456-7890',
    },
    address: {
      street: '63 Commonwealth Avenue',
      city: 'Boston',
      state: 'MA',
      zipCode: '02116',
    },
  },
];

export const INITIAL_GRADES: GradeRecord[] = [
  {
    id: 'grd-001',
    studentId: 'stu-001',
    studentName: 'Alexander Wright',
    courseCode: 'CS-301',
    courseTitle: 'Data Structures & Algorithms',
    midterm1: 24,
    midterm2: 23,
    assignments: 19,
    finalExam: 29,
    totalScore: 95,
    letterGrade: 'A+',
    gradePoints: 4.0,
  },
  {
    id: 'grd-002',
    studentId: 'stu-001',
    studentName: 'Alexander Wright',
    courseCode: 'CS-304',
    courseTitle: 'Database Management Systems',
    midterm1: 22,
    midterm2: 24,
    assignments: 18,
    finalExam: 28,
    totalScore: 92,
    letterGrade: 'A',
    gradePoints: 3.9,
  },
  {
    id: 'grd-003',
    studentId: 'stu-002',
    studentName: 'Sophia Chen',
    courseCode: 'DS-202',
    courseTitle: 'Applied Machine Learning',
    midterm1: 25,
    midterm2: 25,
    assignments: 20,
    finalExam: 29,
    totalScore: 99,
    letterGrade: 'A+',
    gradePoints: 4.0,
  },
  {
    id: 'grd-004',
    studentId: 'stu-003',
    studentName: 'Marcus Johnson',
    courseCode: 'BA-401',
    courseTitle: 'Strategic Corporate Finance',
    midterm1: 20,
    midterm2: 21,
    assignments: 17,
    finalExam: 24,
    totalScore: 82,
    letterGrade: 'B',
    gradePoints: 3.2,
  },
  {
    id: 'grd-005',
    studentId: 'stu-005',
    studentName: 'Devon Vance',
    courseCode: 'EC-201',
    courseTitle: 'Digital Signal Processing',
    midterm1: 17,
    midterm2: 18,
    assignments: 14,
    finalExam: 20,
    totalScore: 69,
    letterGrade: 'C',
    gradePoints: 2.3,
  },
  {
    id: 'grd-006',
    studentId: 'stu-006',
    studentName: 'Priya Sharma',
    courseCode: 'CS-402',
    courseTitle: 'Cloud Computing & Distributed Systems',
    midterm1: 24,
    midterm2: 24,
    assignments: 20,
    finalExam: 28,
    totalScore: 96,
    letterGrade: 'A+',
    gradePoints: 4.0,
  },
];

export const INITIAL_TRANSACTIONS: FeeTransaction[] = [
  {
    id: 'tx-101',
    invoiceNo: 'INV-2026-9041',
    studentId: 'stu-001',
    studentName: 'Alexander Wright',
    rollNo: 'STU-2024-001',
    date: '2026-09-02',
    amount: 8500,
    type: 'Tuition',
    paymentMethod: 'Bank Transfer',
    status: 'Completed',
  },
  {
    id: 'tx-102',
    invoiceNo: 'INV-2026-9042',
    studentId: 'stu-002',
    studentName: 'Sophia Chen',
    rollNo: 'STU-2024-002',
    date: '2026-09-05',
    amount: 8800,
    type: 'Tuition',
    paymentMethod: 'Credit Card',
    status: 'Completed',
  },
  {
    id: 'tx-103',
    invoiceNo: 'INV-2026-9043',
    studentId: 'stu-003',
    studentName: 'Marcus Johnson',
    rollNo: 'STU-2024-003',
    date: '2026-09-10',
    amount: 5000,
    type: 'Tuition',
    paymentMethod: 'Online Portal',
    status: 'Completed',
  },
  {
    id: 'tx-104',
    invoiceNo: 'INV-2026-9044',
    studentId: 'stu-004',
    studentName: 'Emma Watson-Baker',
    rollNo: 'STU-2024-004',
    date: '2026-09-12',
    amount: 8200,
    type: 'Tuition',
    paymentMethod: 'Bank Transfer',
    status: 'Completed',
  },
  {
    id: 'tx-105',
    invoiceNo: 'INV-2026-9045',
    studentId: 'stu-005',
    studentName: 'Devon Vance',
    rollNo: 'STU-2024-005',
    date: '2026-09-15',
    amount: 2000,
    type: 'Tuition',
    paymentMethod: 'Cashier Desk',
    status: 'Completed',
  },
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: 'att-1', studentId: 'stu-001', studentName: 'Alexander Wright', rollNo: 'STU-2024-001', department: 'Computer Science & Engineering', courseCode: 'CS-301', date: '2026-11-06', status: 'Present' },
  { id: 'att-2', studentId: 'stu-002', studentName: 'Sophia Chen', rollNo: 'STU-2024-002', department: 'Data Science & Artificial Intelligence', courseCode: 'DS-202', date: '2026-11-06', status: 'Present' },
  { id: 'att-3', studentId: 'stu-003', studentName: 'Marcus Johnson', rollNo: 'STU-2024-003', department: 'Business Administration & Management', courseCode: 'BA-401', date: '2026-11-06', status: 'Present' },
  { id: 'att-4', studentId: 'stu-004', studentName: 'Emma Watson-Baker', rollNo: 'STU-2024-004', department: 'Biotechnology & Bioinformatics', courseCode: 'BIO-201', date: '2026-11-06', status: 'Present' },
  { id: 'att-5', studentId: 'stu-005', studentName: 'Devon Vance', rollNo: 'STU-2024-005', department: 'Electronics & Communication', courseCode: 'EC-201', date: '2026-11-06', status: 'Absent' },
  { id: 'att-6', studentId: 'stu-006', studentName: 'Priya Sharma', rollNo: 'STU-2024-006', department: 'Computer Science & Engineering', courseCode: 'CS-301', date: '2026-11-06', status: 'Present' },
  { id: 'att-7', studentId: 'stu-007', studentName: 'Liam O\'Connor', rollNo: 'STU-2024-007', department: 'Mechanical Engineering', courseCode: 'ME-302', date: '2026-11-06', status: 'Late' },
  { id: 'att-8', studentId: 'stu-008', studentName: 'Aaliyah Al-Mansoor', rollNo: 'STU-2024-008', department: 'Data Science & Artificial Intelligence', courseCode: 'DS-202', date: '2026-11-06', status: 'Present' },
];

const STORAGE_KEYS = {
  STUDENTS: 'academiapulse_students_v1',
  GRADES: 'academiapulse_grades_v1',
  TRANSACTIONS: 'academiapulse_transactions_v1',
  ATTENDANCE: 'academiapulse_attendance_v1',
};

export const getStoredStudents = (): Student[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
      return INITIAL_STUDENTS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_STUDENTS;
  }
};

export const saveStoredStudents = (students: Student[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  } catch (err) {
    console.error('Failed to save students to localStorage', err);
  }
};

export const getStoredGrades = (): GradeRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.GRADES);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.GRADES, JSON.stringify(INITIAL_GRADES));
      return INITIAL_GRADES;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_GRADES;
  }
};

export const saveStoredGrades = (grades: GradeRecord[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.GRADES, JSON.stringify(grades));
  } catch (err) {
    console.error('Failed to save grades to localStorage', err);
  }
};

export const getStoredTransactions = (): FeeTransaction[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(INITIAL_TRANSACTIONS));
      return INITIAL_TRANSACTIONS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_TRANSACTIONS;
  }
};

export const saveStoredTransactions = (transactions: FeeTransaction[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  } catch (err) {
    console.error('Failed to save transactions to localStorage', err);
  }
};

export const getStoredAttendance = (): AttendanceRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(INITIAL_ATTENDANCE));
      return INITIAL_ATTENDANCE;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_ATTENDANCE;
  }
};

export const saveStoredAttendance = (attendance: AttendanceRecord[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendance));
  } catch (err) {
    console.error('Failed to save attendance to localStorage', err);
  }
};

export const resetAllData = (): void => {
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
  localStorage.setItem(STORAGE_KEYS.GRADES, JSON.stringify(INITIAL_GRADES));
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(INITIAL_TRANSACTIONS));
  localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(INITIAL_ATTENDANCE));
};
