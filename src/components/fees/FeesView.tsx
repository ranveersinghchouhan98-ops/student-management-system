import React, { useState } from 'react';
import {
  CreditCard,
  Plus,
  Receipt,
  Search,
  Printer,
  X,
} from 'lucide-react';
import { Student, FeeTransaction } from '../../types';
import {
  formatCurrency,
  formatDate,
  getFeeStatusBadgeClass,
} from '../../utils/helpers';
import { Avatar } from '../common/Avatar';

interface FeesViewProps {
  students: Student[];
  transactions: FeeTransaction[];
  onRecordPayment: (tx: FeeTransaction) => void;
  onUpdateStudentFee: (studentId: string, paidAmount: number) => void;
}

export const FeesView: React.FC<FeesViewProps> = ({
  students,
  transactions,
  onRecordPayment,
  onUpdateStudentFee,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [receiptTx, setReceiptTx] = useState<FeeTransaction | null>(null);

  // New payment form
  const [newPayment, setNewPayment] = useState({
    studentId: students[0]?.id || '',
    amount: 15000,
    type: 'Tuition' as const,
    paymentMethod: 'UPI / NetBanking' as const,
  });

  const totalReceivable = students.reduce((acc, s) => acc + s.totalFee, 0);
  const totalCollected = students.reduce((acc, s) => acc + s.paidFee, 0);
  const totalOutstanding = Math.max(0, totalReceivable - totalCollected);
  const collectionPercentage = totalReceivable > 0
    ? Math.round((totalCollected / totalReceivable) * 100)
    : 0;

  const filteredStudents = students.filter((s) => {
    const matchesFilter = filterStatus === 'All' || s.feeStatus === filterStatus;
    const matchesSearch =
      searchQuery.trim() === '' ||
      s.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCreatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find((s) => s.id === newPayment.studentId);
    if (!st || newPayment.amount <= 0) return;

    const tx: FeeTransaction = {
      id: `tx-${Date.now()}`,
      invoiceNo: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      studentId: st.id,
      studentName: `${st.firstName} ${st.lastName}`,
      rollNo: st.rollNo,
      date: new Date().toISOString().split('T')[0],
      amount: newPayment.amount,
      type: newPayment.type,
      paymentMethod: newPayment.paymentMethod,
      status: 'Completed',
    };

    onRecordPayment(tx);
    onUpdateStudentFee(st.id, newPayment.amount);
    setIsRecordModalOpen(false);
    setReceiptTx(tx);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tuition & Financial Ledger</h1>
          <p className="text-sm text-slate-500 mt-1">
            Student fee assessments, institutional receipts, collection rates, and billing history.
          </p>
        </div>

        <button
          onClick={() => setIsRecordModalOpen(true)}
          className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs shadow-blue-500/20 transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Record New Payment</span>
        </button>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Total Assessed Tuition
          </span>
          <span className="text-2xl font-bold text-slate-900 mt-1 block">
            {formatCurrency(totalReceivable)}
          </span>
          <span className="text-xs text-slate-500 mt-1 block">Across {students.length} student accounts</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider block">
            Total Collected to Date
          </span>
          <span className="text-2xl font-bold text-emerald-700 mt-1 block">
            {formatCurrency(totalCollected)}
          </span>
          <span className="text-xs text-emerald-600 font-medium mt-1 block">
            {collectionPercentage}% collected
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider block">
            Outstanding Receivables
          </span>
          <span className="text-2xl font-bold text-rose-700 mt-1 block">
            {formatCurrency(totalOutstanding)}
          </span>
          <span className="text-xs text-slate-500 mt-1 block">
            {students.filter((s) => s.feeStatus !== 'Paid').length} accounts pending
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block">
            Collection Efficiency
          </span>
          <div className="mt-2 w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${collectionPercentage}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>Target: 95%</span>
            <span className="font-bold text-slate-800">{collectionPercentage}% Achieved</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student or roll number..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 font-medium"
          >
            <option value="All">All Fee Statuses</option>
            <option value="Paid">Fully Paid</option>
            <option value="Partial">Partial Dues</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Student Billing Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-900">Student Tuition Ledger Roster</h2>
          <span className="text-xs text-slate-500">
            Showing {filteredStudents.length} accounts
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Total Tuition</th>
                <th className="py-3 px-4">Paid to Date</th>
                <th className="py-3 px-4">Balance Due</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((st) => {
                const bal = Math.max(0, st.totalFee - st.paidFee);

                return (
                  <tr key={st.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar
                          firstName={st.firstName}
                          lastName={st.lastName}
                          size="sm"
                        />
                        <div>
                          <p className="font-semibold text-slate-900">
                            {st.firstName} {st.lastName}
                          </p>
                          <p className="text-[11px] text-slate-500">{st.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-slate-600">{st.rollNo}</td>
                    <td className="py-3 px-4 text-slate-600 truncate max-w-[180px]">
                      {st.department}
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-slate-800">
                      {formatCurrency(st.totalFee)}
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-emerald-700">
                      {formatCurrency(st.paidFee)}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {formatCurrency(bal)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getFeeStatusBadgeClass(
                          st.feeStatus
                        )}`}
                      >
                        {st.feeStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {bal > 0 ? (
                        <button
                          onClick={() => {
                            setNewPayment({
                              studentId: st.id,
                              amount: bal,
                              type: 'Tuition',
                              paymentMethod: 'UPI / NetBanking',
                            });
                            setIsRecordModalOpen(true);
                          }}
                          className="text-xs font-semibold text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50"
                        >
                          Pay Due
                        </button>
                      ) : (
                        <span className="text-slate-400 text-xs">Settled</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Transactions List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-sm font-bold text-slate-900">Payment Audit Trail & Receipts</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-2.5 px-4">Receipt #</th>
                <th className="py-2.5 px-4">Student</th>
                <th className="py-2.5 px-4">Roll No</th>
                <th className="py-2.5 px-4">Date</th>
                <th className="py-2.5 px-4">Fee Type</th>
                <th className="py-2.5 px-4">Payment Method</th>
                <th className="py-2.5 px-4 text-right">Amount</th>
                <th className="py-2.5 px-4 text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4 font-mono font-semibold text-blue-600">
                    {tx.invoiceNo}
                  </td>
                  <td className="py-2.5 px-4 font-semibold text-slate-800">{tx.studentName}</td>
                  <td className="py-2.5 px-4 font-mono text-slate-500">{tx.rollNo}</td>
                  <td className="py-2.5 px-4 text-slate-600">{formatDate(tx.date)}</td>
                  <td className="py-2.5 px-4 text-slate-700 font-medium">{tx.type}</td>
                  <td className="py-2.5 px-4 text-slate-600">{tx.paymentMethod}</td>
                  <td className="py-2.5 px-4 text-right font-bold text-slate-900 font-mono">
                    {formatCurrency(tx.amount)}
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    <button
                      onClick={() => setReceiptTx(tx)}
                      className="p-1 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                      title="View Official University Receipt"
                    >
                      <Receipt className="w-4 h-4 mx-auto" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {isRecordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="text-base font-bold text-slate-900">Record Fee Payment</h3>
              <button
                onClick={() => setIsRecordModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreatePayment} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Select Student Account
                </label>
                <select
                  value={newPayment.studentId}
                  onChange={(e) => setNewPayment({ ...newPayment, studentId: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.firstName} {s.lastName} ({s.rollNo}) - Due: {formatCurrency(Math.max(0, s.totalFee - s.paidFee))}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Payment Amount (₹)
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={newPayment.amount}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, amount: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Fee Type</label>
                <select
                  value={newPayment.type}
                  onChange={(e) => setNewPayment({ ...newPayment, type: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                >
                  <option value="Tuition">Tuition Fee</option>
                  <option value="Lab Fee">Laboratory Fee</option>
                  <option value="Library">Library Fee</option>
                  <option value="Hostel">Hostel & Housing</option>
                  <option value="Examination">Examination Fee</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Payment Channel
                </label>
                <select
                  value={newPayment.paymentMethod}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, paymentMethod: e.target.value as any })
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                >
                  <option value="UPI / NetBanking">UPI / Net Banking</option>
                  <option value="Debit Card">Debit / Credit Card</option>
                  <option value="Bank Wire">Direct NEFT / RTGS Wire</option>
                  <option value="Cashier Desk">University Cashier Window</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsRecordModalOpen(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Generate Receipt & Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official Printable Fee Receipt Modal */}
      {receiptTx && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between no-print">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Official University Receipt
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={() => setReceiptTx(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {/* Receipt Header */}
              <div className="text-center border-b border-slate-200 pb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-600 mx-auto flex items-center justify-center text-white font-bold text-lg mb-2">
                  AP
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  AcademiaPulse University
                </h3>
                <p className="text-xs text-slate-500">Office of the University Finance & Accounts</p>
                <div className="mt-2 inline-block px-2.5 py-0.5 bg-blue-50 text-blue-800 text-[11px] font-mono rounded border border-blue-200 font-semibold">
                  {receiptTx.invoiceNo}
                </div>
              </div>

              {/* Receipt Body */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Student Name:</span>
                  <span className="font-bold text-slate-800">{receiptTx.studentName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Student ID / Roll No:</span>
                  <span className="font-mono font-semibold text-slate-800">{receiptTx.rollNo}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Date of Payment:</span>
                  <span className="text-slate-800">{formatDate(receiptTx.date)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Payment Category:</span>
                  <span className="text-slate-800">{receiptTx.type}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Method:</span>
                  <span className="text-slate-800">{receiptTx.paymentMethod}</span>
                </div>
                <div className="flex justify-between py-2 border-t-2 border-slate-900 text-sm font-bold">
                  <span className="text-slate-900">Total Paid Amount:</span>
                  <span className="text-blue-600 font-mono">{formatCurrency(receiptTx.amount)}</span>
                </div>
              </div>

              {/* Stamp and Footer */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
                <div>
                  <p className="font-semibold text-slate-700">STATUS: VERIFIED & CLEARED</p>
                  <p>Computer-generated official audit receipt</p>
                </div>
                <div className="text-right">
                  <div className="w-24 h-8 border border-dashed border-slate-300 rounded flex items-center justify-center text-[10px] text-slate-400 font-serif italic">
                    Accounts Stamp
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
