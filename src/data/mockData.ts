import { Student, Department, Course, GradeRecord, FeeTransaction, AttendanceRecord } from '../types';

export const DEPARTMENTS: Department[] = [
  {
    id: 'dept-cse',
    code: 'CSE',
    name: 'Computer Science & Engineering',
    headOfDepartment: 'Dr. K. S. Ramanujam',
    studentCount: 142,
    facultyCount: 16,
    avgGpa: 3.65,
    room: 'Aryabhata Block, Room 401',
  },
  {
    id: 'dept-ece',
    code: 'ECE',
    name: 'Electronics & Communication',
    headOfDepartment: 'Prof. Sunita Deshmukh',
    studentCount: 98,
    facultyCount: 12,
    avgGpa: 3.48,
    room: 'J.C. Bose Hall, Room 210',
  },
  {
    id: 'dept-ds',
    code: 'DS',
    name: 'Data Science & Artificial Intelligence',
    headOfDepartment: 'Dr. Arvind Swaminathan',
    studentCount: 110,
    facultyCount: 14,
    avgGpa: 3.74,
    room: 'Turing-Ramanujan Center, Room 102',
  },
  {
    id: 'dept-me',
    code: 'ME',
    name: 'Mechanical Engineering',
    headOfDepartment: 'Prof. Rajeshwar Rao',
    studentCount: 84,
    facultyCount: 10,
    avgGpa: 3.38,
    room: 'Visvesvaraya Mechanics Complex, Room 105',
  },
  {
    id: 'dept-ba',
    code: 'BA',
    name: 'Business Administration & Management',
    headOfDepartment: 'Dr. Malini Banerjee',
    studentCount: 130,
    facultyCount: 15,
    avgGpa: 3.56,
    room: 'Chanakya Management Wing, Room 303',
  },
  {
    id: 'dept-bio',
    code: 'BIO',
    name: 'Biotechnology & Bioinformatics',
    headOfDepartment: 'Dr. Venkatachalam Pillai',
    studentCount: 65,
    facultyCount: 9,
    avgGpa: 3.69,
    room: 'Khorana Life Sciences Wing, Room 118',
  },
];

export const COURSES: Course[] = [
  {
    id: 'crs-101',
    code: 'CS-301',
    title: 'Data Structures & Algorithms',
    department: 'Computer Science & Engineering',
    credits: 4,
    instructor: 'Dr. K. S. Ramanujam',
    semester: 5,
    enrolledStudentsCount: 42,
  },
  {
    id: 'crs-102',
    code: 'CS-304',
    title: 'Database Management Systems',
    department: 'Computer Science & Engineering',
    credits: 3,
    instructor: 'Prof. Sneha Kulkarni',
    semester: 5,
    enrolledStudentsCount: 38,
  },
  {
    id: 'crs-103',
    code: 'DS-202',
    title: 'Applied Machine Learning',
    department: 'Data Science & Artificial Intelligence',
    credits: 4,
    instructor: 'Dr. Arvind Swaminathan',
    semester: 3,
    enrolledStudentsCount: 45,
  },
  {
    id: 'crs-104',
    code: 'EC-201',
    title: 'Digital Signal Processing',
    department: 'Electronics & Communication',
    credits: 4,
    instructor: 'Prof. Sunita Deshmukh',
    semester: 3,
    enrolledStudentsCount: 32,
  },
  {
    id: 'crs-105',
    code: 'BA-401',
    title: 'Strategic Corporate Finance',
    department: 'Business Administration & Management',
    credits: 3,
    instructor: 'Dr. Malini Banerjee',
    semester: 7,
    enrolledStudentsCount: 50,
  },
  {
    id: 'crs-106',
    code: 'ME-302',
    title: 'Thermodynamics & Heat Transfer',
    department: 'Mechanical Engineering',
    credits: 4,
    instructor: 'Prof. Rajeshwar Rao',
    semester: 5,
    enrolledStudentsCount: 28,
  },
  {
    id: 'crs-107',
    code: 'BIO-201',
    title: 'Genomics & Molecular Biology',
    department: 'Biotechnology & Bioinformatics',
    credits: 4,
    instructor: 'Dr. Venkatachalam Pillai',
    semester: 3,
    enrolledStudentsCount: 24,
  },
  {
    id: 'crs-108',
    code: 'CS-402',
    title: 'Cloud Computing & Distributed Systems',
    department: 'Computer Science & Engineering',
    credits: 3,
    instructor: 'Prof. Amitava Mukherjee',
    semester: 7,
    enrolledStudentsCount: 36,
  },
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'stu-001',
    rollNo: 'STU-2024-101',
    firstName: 'Aarav',
    lastName: 'Sharma',
    email: 'aarav.sharma@university.ac.in',
    phone: '+91 98450 12345',
    department: 'Computer Science & Engineering',
    program: 'B.Tech Computer Science',
    year: 3,
    semester: 5,
    gpa: 3.89,
    attendanceRate: 94,
    enrollmentDate: '2024-08-10',
    status: 'Active',
    feeStatus: 'Paid',
    totalFee: 85000,
    paidFee: 85000,
    gender: 'Male',
    dateOfBirth: '2004-03-14',
    bloodGroup: 'O+',
    emergencyContact: {
      name: 'Rajesh Sharma',
      relationship: 'Father',
      phone: '+91 98450 99881',
    },
    address: {
      street: 'Flat 402, Shanti Vihar, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      zipCode: '560038',
    },
  },
  {
    id: 'stu-002',
    rollNo: 'STU-2024-102',
    firstName: 'Ananya',
    lastName: 'Iyer',
    email: 'ananya.iyer@university.ac.in',
    phone: '+91 97110 23456',
    department: 'Data Science & Artificial Intelligence',
    program: 'B.Tech Data Science & AI',
    year: 2,
    semester: 3,
    gpa: 3.96,
    attendanceRate: 98,
    enrollmentDate: '2025-08-16',
    status: 'Active',
    feeStatus: 'Paid',
    totalFee: 92000,
    paidFee: 92000,
    gender: 'Female',
    dateOfBirth: '2005-06-22',
    bloodGroup: 'A+',
    emergencyContact: {
      name: 'V. Sundaram Iyer',
      relationship: 'Father',
      phone: '+91 97110 88210',
    },
    address: {
      street: '14, Karpagam Avenue, R.A. Puram',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600028',
    },
  },
  {
    id: 'stu-003',
    rollNo: 'STU-2024-103',
    firstName: 'Rohan',
    lastName: 'Verma',
    email: 'rohan.verma@university.ac.in',
    phone: '+91 98101 34567',
    department: 'Business Administration & Management',
    program: 'Bachelor of Business Administration',
    year: 4,
    semester: 7,
    gpa: 3.42,
    attendanceRate: 88,
    enrollmentDate: '2023-08-12',
    status: 'Active',
    feeStatus: 'Partial',
    totalFee: 78000,
    paidFee: 50000,
    gender: 'Male',
    dateOfBirth: '2003-11-05',
    bloodGroup: 'B+',
    emergencyContact: {
      name: 'Sunita Verma',
      relationship: 'Mother',
      phone: '+91 98101 77412',
    },
    address: {
      street: 'B-12, Green Park Extension',
      city: 'New Delhi',
      state: 'Delhi',
      zipCode: '110016',
    },
  },
  {
    id: 'stu-004',
    rollNo: 'STU-2024-104',
    firstName: 'Pooja',
    lastName: 'Nair',
    email: 'pooja.nair@university.ac.in',
    phone: '+91 94470 45678',
    department: 'Biotechnology & Bioinformatics',
    program: 'B.Tech Biotechnology',
    year: 2,
    semester: 3,
    gpa: 3.76,
    attendanceRate: 92,
    enrollmentDate: '2025-08-18',
    status: 'Active',
    feeStatus: 'Paid',
    totalFee: 82000,
    paidFee: 82000,
    gender: 'Female',
    dateOfBirth: '2005-02-17',
    bloodGroup: 'AB+',
    emergencyContact: {
      name: 'K. Madhavan Nair',
      relationship: 'Father',
      phone: '+91 94470 32176',
    },
    address: {
      street: 'Pranavam, Panampilly Nagar',
      city: 'Kochi',
      state: 'Kerala',
      zipCode: '682036',
    },
  },
  {
    id: 'stu-005',
    rollNo: 'STU-2024-105',
    firstName: 'Devendra',
    lastName: 'Patel',
    email: 'devendra.patel@university.ac.in',
    phone: '+91 98250 56789',
    department: 'Electronics & Communication',
    program: 'B.Tech ECE',
    year: 3,
    semester: 5,
    gpa: 3.12,
    attendanceRate: 71,
    enrollmentDate: '2024-08-14',
    status: 'Active',
    feeStatus: 'Overdue',
    totalFee: 84000,
    paidFee: 20000,
    gender: 'Male',
    dateOfBirth: '2004-09-30',
    bloodGroup: 'O-',
    emergencyContact: {
      name: 'Bhavesh Patel',
      relationship: 'Father',
      phone: '+91 98250 61244',
    },
    address: {
      street: '7, Shivalik Residency, Bodakdev',
      city: 'Ahmedabad',
      state: 'Gujarat',
      zipCode: '380054',
    },
  },
  {
    id: 'stu-006',
    rollNo: 'STU-2024-106',
    firstName: 'Priya',
    lastName: 'Sengupta',
    email: 'priya.sengupta@university.ac.in',
    phone: '+91 98300 67890',
    department: 'Computer Science & Engineering',
    program: 'B.Tech Computer Science',
    year: 4,
    semester: 7,
    gpa: 3.94,
    attendanceRate: 96,
    enrollmentDate: '2023-08-11',
    status: 'Active',
    feeStatus: 'Paid',
    totalFee: 85000,
    paidFee: 85000,
    gender: 'Female',
    dateOfBirth: '2003-08-14',
    bloodGroup: 'B-',
    emergencyContact: {
      name: 'Subhash Sengupta',
      relationship: 'Father',
      phone: '+91 98300 43288',
    },
    address: {
      street: '54/2 Southern Avenue',
      city: 'Kolkata',
      state: 'West Bengal',
      zipCode: '700029',
    },
  },
  {
    id: 'stu-007',
    rollNo: 'STU-2024-107',
    firstName: 'Aditya',
    lastName: 'Singhania',
    email: 'aditya.singhania@university.ac.in',
    phone: '+91 94140 78901',
    department: 'Mechanical Engineering',
    program: 'B.Tech Mechanical Engineering',
    year: 3,
    semester: 5,
    gpa: 3.32,
    attendanceRate: 86,
    enrollmentDate: '2024-08-12',
    status: 'Active',
    feeStatus: 'Paid',
    totalFee: 81000,
    paidFee: 81000,
    gender: 'Male',
    dateOfBirth: '2004-12-01',
    bloodGroup: 'A-',
    emergencyContact: {
      name: 'Vikram Singhania',
      relationship: 'Father',
      phone: '+91 94140 91133',
    },
    address: {
      street: 'C-44, Tilak Nagar',
      city: 'Jaipur',
      state: 'Rajasthan',
      zipCode: '302004',
    },
  },
  {
    id: 'stu-008',
    rollNo: 'STU-2024-108',
    firstName: 'Kavya',
    lastName: 'Reddy',
    email: 'kavya.reddy@university.ac.in',
    phone: '+91 98490 89012',
    department: 'Data Science & Artificial Intelligence',
    program: 'B.Tech Data Science & AI',
    year: 1,
    semester: 1,
    gpa: 3.84,
    attendanceRate: 97,
    enrollmentDate: '2026-08-20',
    status: 'Active',
    feeStatus: 'Paid',
    totalFee: 92000,
    paidFee: 92000,
    gender: 'Female',
    dateOfBirth: '2006-04-19',
    bloodGroup: 'O+',
    emergencyContact: {
      name: 'M. Venkat Reddy',
      relationship: 'Father',
      phone: '+91 98490 54399',
    },
    address: {
      street: 'Plot 88, Jubilee Hills Road No. 36',
      city: 'Hyderabad',
      state: 'Telangana',
      zipCode: '500033',
    },
  },
  {
    id: 'stu-009',
    rollNo: 'STU-2024-109',
    firstName: 'Siddharth',
    lastName: 'Rao',
    email: 'siddharth.rao@university.ac.in',
    phone: '+91 98200 90123',
    department: 'Business Administration & Management',
    program: 'Bachelor of Business Administration',
    year: 2,
    semester: 3,
    gpa: 3.48,
    attendanceRate: 84,
    enrollmentDate: '2025-08-15',
    status: 'On Leave',
    feeStatus: 'Partial',
    totalFee: 78000,
    paidFee: 40000,
    gender: 'Male',
    dateOfBirth: '2005-07-08',
    bloodGroup: 'AB-',
    emergencyContact: {
      name: 'Gauri Rao',
      relationship: 'Mother',
      phone: '+91 98200 67800',
    },
    address: {
      street: '12, Sea Face Enclave, Worli',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400018',
    },
  },
  {
    id: 'stu-010',
    rollNo: 'STU-2024-110',
    firstName: 'Meera',
    lastName: 'Kulkarni',
    email: 'meera.kulkarni@university.ac.in',
    phone: '+91 98500 01234',
    department: 'Biotechnology & Bioinformatics',
    program: 'B.Tech Biotechnology',
    year: 4,
    semester: 8,
    gpa: 3.91,
    attendanceRate: 95,
    enrollmentDate: '2023-08-10',
    status: 'Graduated',
    feeStatus: 'Paid',
    totalFee: 82000,
    paidFee: 82000,
    gender: 'Female',
    dateOfBirth: '2003-01-25',
    bloodGroup: 'O+',
    emergencyContact: {
      name: 'Prakash Kulkarni',
      relationship: 'Father',
      phone: '+91 98500 23477',
    },
    address: {
      street: 'B-4, Mayur Colony, Kothrud',
      city: 'Pune',
      state: 'Maharashtra',
      zipCode: '411038',
    },
  },
  {
    id: 'stu-011',
    rollNo: 'STU-2024-111',
    firstName: 'Kabir',
    lastName: 'Sen',
    email: 'kabir.sen@university.ac.in',
    phone: '+91 97480 12340',
    department: 'Computer Science & Engineering',
    program: 'B.Tech Computer Science',
    year: 1,
    semester: 1,
    gpa: 3.56,
    attendanceRate: 89,
    enrollmentDate: '2026-08-22',
    status: 'Active',
    feeStatus: 'Overdue',
    totalFee: 85000,
    paidFee: 0,
    gender: 'Male',
    dateOfBirth: '2006-10-11',
    bloodGroup: 'A+',
    emergencyContact: {
      name: 'Nandini Sen',
      relationship: 'Mother',
      phone: '+91 97480 89012',
    },
    address: {
      street: '88, Salt Lake Sector 1',
      city: 'Kolkata',
      state: 'West Bengal',
      zipCode: '700064',
    },
  },
  {
    id: 'stu-012',
    rollNo: 'STU-2024-112',
    firstName: 'Diya',
    lastName: 'Deshmukh',
    email: 'diya.deshmukh@university.ac.in',
    phone: '+91 98900 23451',
    department: 'Electronics & Communication',
    program: 'B.Tech ECE',
    year: 2,
    semester: 3,
    gpa: 3.67,
    attendanceRate: 93,
    enrollmentDate: '2025-08-17',
    status: 'Active',
    feeStatus: 'Paid',
    totalFee: 84000,
    paidFee: 84000,
    gender: 'Female',
    dateOfBirth: '2005-05-14',
    bloodGroup: 'B+',
    emergencyContact: {
      name: 'Shrikant Deshmukh',
      relationship: 'Father',
      phone: '+91 98900 45678',
    },
    address: {
      street: '18, Prabhat Road, Lane 4',
      city: 'Pune',
      state: 'Maharashtra',
      zipCode: '411004',
    },
  },
];

export const INITIAL_GRADES: GradeRecord[] = [
  {
    id: 'grd-001',
    studentId: 'stu-001',
    studentName: 'Aarav Sharma',
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
    studentName: 'Aarav Sharma',
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
    studentName: 'Ananya Iyer',
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
    studentName: 'Rohan Verma',
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
    studentName: 'Devendra Patel',
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
    studentName: 'Priya Sengupta',
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
    studentName: 'Aarav Sharma',
    rollNo: 'STU-2024-101',
    date: '2026-09-02',
    amount: 85000,
    type: 'Tuition',
    paymentMethod: 'UPI / NetBanking',
    status: 'Completed',
  },
  {
    id: 'tx-102',
    invoiceNo: 'INV-2026-9042',
    studentId: 'stu-002',
    studentName: 'Ananya Iyer',
    rollNo: 'STU-2024-102',
    date: '2026-09-05',
    amount: 92000,
    type: 'Tuition',
    paymentMethod: 'Debit Card',
    status: 'Completed',
  },
  {
    id: 'tx-103',
    invoiceNo: 'INV-2026-9043',
    studentId: 'stu-003',
    studentName: 'Rohan Verma',
    rollNo: 'STU-2024-103',
    date: '2026-09-10',
    amount: 50000,
    type: 'Tuition',
    paymentMethod: 'UPI / NetBanking',
    status: 'Completed',
  },
  {
    id: 'tx-104',
    invoiceNo: 'INV-2026-9044',
    studentId: 'stu-004',
    studentName: 'Pooja Nair',
    rollNo: 'STU-2024-104',
    date: '2026-09-12',
    amount: 82000,
    type: 'Tuition',
    paymentMethod: 'Bank Wire',
    status: 'Completed',
  },
  {
    id: 'tx-105',
    invoiceNo: 'INV-2026-9045',
    studentId: 'stu-005',
    studentName: 'Devendra Patel',
    rollNo: 'STU-2024-105',
    date: '2026-09-15',
    amount: 20000,
    type: 'Tuition',
    paymentMethod: 'Cashier Desk',
    status: 'Completed',
  },
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: 'att-1', studentId: 'stu-001', studentName: 'Aarav Sharma', rollNo: 'STU-2024-101', department: 'Computer Science & Engineering', courseCode: 'CS-301', date: '2026-11-06', status: 'Present' },
  { id: 'att-2', studentId: 'stu-002', studentName: 'Ananya Iyer', rollNo: 'STU-2024-102', department: 'Data Science & Artificial Intelligence', courseCode: 'DS-202', date: '2026-11-06', status: 'Present' },
  { id: 'att-3', studentId: 'stu-003', studentName: 'Rohan Verma', rollNo: 'STU-2024-103', department: 'Business Administration & Management', courseCode: 'BA-401', date: '2026-11-06', status: 'Present' },
  { id: 'att-4', studentId: 'stu-004', studentName: 'Pooja Nair', rollNo: 'STU-2024-104', department: 'Biotechnology & Bioinformatics', courseCode: 'BIO-201', date: '2026-11-06', status: 'Present' },
  { id: 'att-5', studentId: 'stu-005', studentName: 'Devendra Patel', rollNo: 'STU-2024-105', department: 'Electronics & Communication', courseCode: 'EC-201', date: '2026-11-06', status: 'Absent' },
  { id: 'att-6', studentId: 'stu-006', studentName: 'Priya Sengupta', rollNo: 'STU-2024-106', department: 'Computer Science & Engineering', courseCode: 'CS-301', date: '2026-11-06', status: 'Present' },
  { id: 'att-7', studentId: 'stu-007', studentName: 'Aditya Singhania', rollNo: 'STU-2024-107', department: 'Mechanical Engineering', courseCode: 'ME-302', date: '2026-11-06', status: 'Late' },
  { id: 'att-8', studentId: 'stu-008', studentName: 'Kavya Reddy', rollNo: 'STU-2024-108', department: 'Data Science & Artificial Intelligence', courseCode: 'DS-202', date: '2026-11-06', status: 'Present' },
];

const STORAGE_KEYS = {
  STUDENTS: 'academiapulse_students_v2_in',
  GRADES: 'academiapulse_grades_v2_in',
  TRANSACTIONS: 'academiapulse_transactions_v2_in',
  ATTENDANCE: 'academiapulse_attendance_v2_in',
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
