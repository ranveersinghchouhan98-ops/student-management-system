import React, { useState, useEffect } from 'react';
import {
  Student,
  GradeRecord,
  FeeTransaction,
  AttendanceRecord,
  ToastMessage,
  EnrollmentStatus,
  FeeStatus,
} from './types';
import {
  getStoredStudents,
  saveStoredStudents,
  getStoredGrades,
  saveStoredGrades,
  getStoredTransactions,
  saveStoredTransactions,
  getStoredAttendance,
  saveStoredAttendance,
  resetAllData,
  DEPARTMENTS,
} from './data/mockData';
import { Sidebar, ActiveTab } from './components/common/Sidebar';
import { Navbar } from './components/common/Navbar';
import { ToastContainer } from './components/common/Toast';
import { SearchModal } from './components/common/SearchModal';
import { ConfirmationModal } from './components/common/ConfirmationModal';
import { DashboardView } from './components/dashboard/DashboardView';
import { StudentsView } from './components/students/StudentsView';
import { StudentFormModal } from './components/students/StudentFormModal';
import { StudentDetailModal } from './components/students/StudentDetailModal';
import { AttendanceView } from './components/attendance/AttendanceView';
import { AcademicsView } from './components/academics/AcademicsView';
import { FeesView } from './components/fees/FeesView';
import { DepartmentsView } from './components/departments/DepartmentsView';
import { IdCardModal } from './components/idcard/IdCardModal';
import { ReportsView } from './components/reports/ReportsView';

export function App() {
  // Navigation & Layout
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Core Data States
  const [students, setStudents] = useState<Student[]>(() => getStoredStudents());
  const [grades, setGrades] = useState<GradeRecord[]>(() => getStoredGrades());
  const [transactions, setTransactions] = useState<FeeTransaction[]>(() => getStoredTransactions());
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => getStoredAttendance());
  const departments = DEPARTMENTS;

  // Modals & Drawers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<Student | null>(null);
  const [idCardStudent, setIdCardStudent] = useState<Student | null>(null);
  const [isIdCardOpen, setIsIdCardOpen] = useState(false);

  // Confirmation Modals
  const [confirmDeleteStudent, setConfirmDeleteStudent] = useState<Student | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'info' | 'warning' | 'error', title: string, description?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Keyboard shortcut Ctrl+K / Cmd+K for Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    saveStoredStudents(students);
  }, [students]);

  useEffect(() => {
    saveStoredGrades(grades);
  }, [grades]);

  useEffect(() => {
    saveStoredTransactions(transactions);
  }, [transactions]);

  useEffect(() => {
    saveStoredAttendance(attendance);
  }, [attendance]);

  // CRUD Handlers
  const handleSaveStudent = (studentData: Student) => {
    const exists = students.some((s) => s.id === studentData.id);
    if (exists) {
      setStudents((prev) => prev.map((s) => (s.id === studentData.id ? studentData : s)));
      addToast('success', 'Profile Updated', `Changes for ${studentData.firstName} ${studentData.lastName} saved.`);
    } else {
      setStudents((prev) => [studentData, ...prev]);
      addToast('success', 'Student Enrolled', `${studentData.firstName} ${studentData.lastName} enrolled with ID ${studentData.rollNo}.`);
    }

    if (selectedStudentForDetail?.id === studentData.id) {
      setSelectedStudentForDetail(studentData);
    }
    setEditingStudent(null);
  };

  const handleDeleteStudent = (student: Student) => {
    setStudents((prev) => prev.filter((s) => s.id !== student.id));
    if (selectedStudentForDetail?.id === student.id) {
      setSelectedStudentForDetail(null);
    }
    addToast('info', 'Student Record Removed', `${student.firstName} ${student.lastName} was deleted.`);
  };

  const handleBatchDelete = (ids: string[]) => {
    setStudents((prev) => prev.filter((s) => !ids.includes(s.id)));
    addToast('warning', 'Batch Deletion Completed', `Removed ${ids.length} student record(s).`);
  };

  const handleBatchUpdateStatus = (ids: string[], status: EnrollmentStatus) => {
    setStudents((prev) =>
      prev.map((s) => (ids.includes(s.id) ? { ...s, status } : s))
    );
    addToast('success', 'Status Updated', `Updated status to "${status}" for ${ids.length} students.`);
  };

  const handleSaveGrade = (grade: GradeRecord) => {
    setGrades((prev) => [grade, ...prev]);
    addToast('success', 'Grade Posted', `Recorded ${grade.courseCode} grade for ${grade.studentName}.`);
  };

  const handleUpdateStudentGpa = (studentId: string, newGpa: number) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, gpa: newGpa } : s))
    );
  };

  const handleSaveAttendanceBatch = (newRecords: AttendanceRecord[]) => {
    setAttendance((prev) => [...newRecords, ...prev]);
    addToast('success', 'Attendance Submitted', `Recorded session with ${newRecords.length} student entries.`);
  };

  const handleUpdateStudentAttendanceRates = (updatedStudents: Student[]) => {
    setStudents(updatedStudents);
  };

  const handleRecordPayment = (tx: FeeTransaction) => {
    setTransactions((prev) => [tx, ...prev]);
    addToast('success', 'Payment Received', `Recorded ${tx.paymentMethod} of $${tx.amount.toLocaleString()} for ${tx.studentName}.`);
  };

  const handleUpdateStudentFee = (studentId: string, paidAmount: number) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        const newPaid = s.paidFee + paidAmount;
        let newStatus: FeeStatus = 'Paid';
        if (newPaid === 0) newStatus = 'Overdue';
        else if (newPaid < s.totalFee) newStatus = 'Partial';
        return {
          ...s,
          paidFee: newPaid,
          feeStatus: newStatus,
        };
      })
    );
  };

  const handleResetAllData = () => {
    resetAllData();
    setStudents(getStoredStudents());
    setGrades(getStoredGrades());
    setTransactions(getStoredTransactions());
    setAttendance(getStoredAttendance());
    addToast('info', 'System Reset', 'All records restored to standard university seed data.');
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans antialiased overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* Toast Notification Stream */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        studentCount={students.length}
      />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <Navbar
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenAddModal={() => {
            setEditingStudent(null);
            setIsFormModalOpen(true);
          }}
          students={students}
        />

        {/* Content Body Container */}
        <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && (
              <DashboardView
                students={students}
                departments={departments}
                transactions={transactions}
                onNavigate={setActiveTab}
                onOpenAddModal={() => {
                  setEditingStudent(null);
                  setIsFormModalOpen(true);
                }}
                onSelectStudent={(s) => setSelectedStudentForDetail(s)}
              />
            )}

            {activeTab === 'students' && (
              <StudentsView
                students={students}
                onOpenAddModal={() => {
                  setEditingStudent(null);
                  setIsFormModalOpen(true);
                }}
                onEditStudent={(s) => {
                  setEditingStudent(s);
                  setIsFormModalOpen(true);
                }}
                onDeleteStudent={(s) => setConfirmDeleteStudent(s)}
                onBatchDelete={handleBatchDelete}
                onBatchUpdateStatus={handleBatchUpdateStatus}
                onViewProfile={(s) => setSelectedStudentForDetail(s)}
                onGenerateIdCard={(s) => {
                  setIdCardStudent(s);
                  setIsIdCardOpen(true);
                }}
              />
            )}

            {activeTab === 'attendance' && (
              <AttendanceView
                students={students}
                attendanceRecords={attendance}
                onSaveAttendanceBatch={handleSaveAttendanceBatch}
                onUpdateStudentAttendanceRates={handleUpdateStudentAttendanceRates}
              />
            )}

            {activeTab === 'academics' && (
              <AcademicsView
                students={students}
                grades={grades}
                onSaveGrade={handleSaveGrade}
                onUpdateStudentGpa={handleUpdateStudentGpa}
              />
            )}

            {activeTab === 'fees' && (
              <FeesView
                students={students}
                transactions={transactions}
                onRecordPayment={handleRecordPayment}
                onUpdateStudentFee={handleUpdateStudentFee}
              />
            )}

            {activeTab === 'departments' && (
              <DepartmentsView
                departments={departments}
                students={students}
                onSelectDepartmentStudents={(deptName) => {
                  setActiveTab('students');
                }}
              />
            )}

            {activeTab === 'idcard' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                      Student Identity Card Studio
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                      Render, configure and print official University Student ID Cards.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIdCardStudent(students[0]);
                      setIsIdCardOpen(true);
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs"
                  >
                    Launch Fullscreen Studio &rarr;
                  </button>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-4 shadow-xs">
                  <div className="max-w-md mx-auto space-y-2">
                    <h3 className="text-base font-bold text-slate-900">
                      Standard ISO-7810 Compliant Card Studio
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Select any student from the directory to inspect their smart credential card, barcode signatures, and official emergency routing.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setIdCardStudent(students[0]);
                        setIsIdCardOpen(true);
                      }}
                      className="px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
                    >
                      Open ID Studio
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <ReportsView
                students={students}
                grades={grades}
                transactions={transactions}
                attendance={attendance}
                onResetData={handleResetAllData}
                onRequestConfirmReset={() => setIsResetConfirmOpen(true)}
              />
            )}
          </div>
        </main>
      </div>

      {/* Global Search Modal (Ctrl+K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        students={students}
        onSelectStudent={(s) => setSelectedStudentForDetail(s)}
      />

      {/* Add / Edit Student Modal */}
      <StudentFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingStudent(null);
        }}
        onSave={handleSaveStudent}
        initialData={editingStudent}
      />

      {/* Student 360 Detail Drawer / Modal */}
      <StudentDetailModal
        isOpen={!!selectedStudentForDetail}
        student={selectedStudentForDetail}
        grades={grades}
        transactions={transactions}
        attendance={attendance}
        onClose={() => setSelectedStudentForDetail(null)}
        onEdit={(s) => {
          setEditingStudent(s);
          setIsFormModalOpen(true);
        }}
        onGenerateIdCard={(s) => {
          setIdCardStudent(s);
          setIsIdCardOpen(true);
        }}
        onRecordPayment={(studentId, amount) => {
          const st = students.find((s) => s.id === studentId);
          if (!st) return;
          const tx: FeeTransaction = {
            id: `tx-${Date.now()}`,
            invoiceNo: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
            studentId: st.id,
            studentName: `${st.firstName} ${st.lastName}`,
            rollNo: st.rollNo,
            date: new Date().toISOString().split('T')[0],
            amount,
            type: 'Tuition',
            paymentMethod: 'Online Portal',
            status: 'Completed',
          };
          handleRecordPayment(tx);
          handleUpdateStudentFee(st.id, amount);
        }}
      />

      {/* ID Card Studio Modal */}
      <IdCardModal
        isOpen={isIdCardOpen}
        students={students}
        initialStudent={idCardStudent}
        onClose={() => setIsIdCardOpen(false)}
      />

      {/* Confirmation Modal: Delete Student */}
      <ConfirmationModal
        isOpen={!!confirmDeleteStudent}
        title="Delete Student Record"
        message={`Are you sure you want to delete ${confirmDeleteStudent?.firstName} ${confirmDeleteStudent?.lastName} (${confirmDeleteStudent?.rollNo})? This will remove all associated institutional files.`}
        confirmLabel="Delete Student"
        isDestructive={true}
        onConfirm={() => {
          if (confirmDeleteStudent) {
            handleDeleteStudent(confirmDeleteStudent);
            setConfirmDeleteStudent(null);
          }
        }}
        onClose={() => setConfirmDeleteStudent(null)}
      />

      {/* Confirmation Modal: Reset All Data */}
      <ConfirmationModal
        isOpen={isResetConfirmOpen}
        title="Restore Default University Data"
        message="This will reset all student records, attendance logs, and fee receipts back to factory defaults. Any customized student records will be replaced."
        confirmLabel="Reset System Data"
        isDestructive={true}
        onConfirm={handleResetAllData}
        onClose={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
}

export default App;
