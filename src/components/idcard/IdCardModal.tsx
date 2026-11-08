import React, { useState } from 'react';
import { Contact, Printer, X, ShieldCheck, QrCode } from 'lucide-react';
import { Student } from '../../types';
import { Avatar } from '../common/Avatar';

interface IdCardModalProps {
  students: Student[];
  initialStudent?: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

export const IdCardModal: React.FC<IdCardModalProps> = ({
  students,
  initialStudent,
  isOpen,
  onClose,
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    initialStudent?.id || students[0]?.id || ''
  );
  const [cardSide, setCardSide] = useState<'front' | 'back'>('front');

  if (!isOpen) return null;

  const currentStudent =
    students.find((s) => s.id === selectedStudentId) || initialStudent || students[0];

  if (!currentStudent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between no-print">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
              <Contact className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Official Student ID Studio</h2>
              <p className="text-xs text-slate-500">ISO-7810 Standard University Identification Card</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Card</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Studio Controls */}
        <div className="px-6 py-3 border-b border-slate-100 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
          <div className="flex items-center gap-2 flex-1 max-w-xs">
            <label className="text-xs font-semibold text-slate-500">Student:</label>
            <select
              value={currentStudent.id}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="flex-1 text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-800 font-medium"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.firstName} {s.lastName} ({s.rollNo})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 self-end sm:self-auto">
            <button
              onClick={() => setCardSide('front')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                cardSide === 'front'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Front Side
            </button>
            <button
              onClick={() => setCardSide('back')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                cardSide === 'back'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Back Side
            </button>
          </div>
        </div>

        {/* Card Display Area */}
        <div className="p-8 flex items-center justify-center bg-slate-100/70 overflow-hidden">
          {/* Physical ID Card Container */}
          {cardSide === 'front' ? (
            <div className="w-[420px] h-[260px] bg-white rounded-2xl shadow-xl border border-slate-300 relative overflow-hidden flex flex-col justify-between font-sans print:shadow-none print:border">
              {/* Top Institutional Header */}
              <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-bold text-xs tracking-wider">
                    AP
                  </div>
                  <div>
                    <h3 className="text-xs font-black tracking-wider uppercase text-white leading-none">
                      AcademiaPulse University
                    </h3>
                    <p className="text-[9px] text-blue-200 uppercase tracking-widest mt-0.5">
                      Student Identity Card • 2026-2027
                    </p>
                  </div>
                </div>
                <ShieldCheck className="w-5 h-5 text-blue-300 shrink-0" />
              </div>

              {/* Card Body */}
              <div className="px-5 py-3 flex items-start gap-4 flex-1">
                {/* Vector Avatar Photo & IC Chip */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="relative">
                    <Avatar
                      firstName={currentStudent.firstName}
                      lastName={currentStudent.lastName}
                      size="idcard"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[10px] text-white">
                      ✓
                    </div>
                  </div>
                  {/* Smart Chip representation */}
                  <div className="w-9 h-6 mt-2 bg-gradient-to-tr from-amber-400 to-amber-200 rounded border border-amber-500/50 flex items-center justify-center opacity-85">
                    <div className="w-5 h-3 border border-amber-600/60 rounded-xs" />
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1 pt-0.5 text-xs">
                  <div>
                    <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Student Name
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-sm leading-tight truncate">
                      {currentStudent.firstName} {currentStudent.lastName}
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 pt-1 text-[11px]">
                    <div>
                      <span className="text-[8px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Student ID
                      </span>
                      <span className="font-mono font-bold text-blue-700">
                        {currentStudent.rollNo}
                      </span>
                    </div>

                    <div>
                      <span className="text-[8px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Blood Group
                      </span>
                      <span className="font-bold text-slate-800">{currentStudent.bloodGroup}</span>
                    </div>

                    <div className="col-span-2">
                      <span className="text-[8px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Program & Department
                      </span>
                      <span className="font-semibold text-slate-800 truncate block">
                        {currentStudent.department}
                      </span>
                      <span className="text-[10px] text-slate-500 truncate block">
                        {currentStudent.program}
                      </span>
                    </div>

                    <div>
                      <span className="text-[8px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Valid Thru
                      </span>
                      <span className="font-mono text-slate-700">06/2028</span>
                    </div>

                    <div>
                      <span className="text-[8px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Status
                      </span>
                      <span className="font-bold text-emerald-700">ACTIVE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Bar with Barcode */}
              <div className="px-5 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                {/* CSS Barcode simulation */}
                <div className="flex items-center gap-0.5 h-6">
                  {[2, 4, 1, 3, 2, 5, 1, 4, 2, 3, 1, 4, 3, 2, 4, 1, 3, 2, 4, 2, 1, 4].map(
                    (w, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-800 h-full rounded-xs"
                        style={{ width: `${w}px` }}
                      />
                    )
                  )}
                </div>
                <div className="text-[9px] font-mono text-slate-500 font-semibold tracking-wider">
                  AUTH CODE: {currentStudent.id.toUpperCase()}
                </div>
              </div>
            </div>
          ) : (
            /* Card Back Side */
            <div className="w-[420px] h-[260px] bg-white rounded-2xl shadow-xl border border-slate-300 relative overflow-hidden flex flex-col justify-between font-sans print:shadow-none print:border p-5">
              {/* Magnetic Strip simulation */}
              <div className="-mx-5 -mt-5 h-10 bg-slate-900 border-b border-slate-800 mb-2" />

              <div className="space-y-2 text-[10px] text-slate-600 flex-1">
                <p className="font-semibold text-slate-800">
                  TERMS & EMERGENCY CONDITIONS:
                </p>
                <p className="leading-relaxed text-slate-500">
                  This card is the property of AcademiaPulse University and must be surrendered upon graduation or termination.
                  Found cards should be dropped in any mailbox or returned to University Security.
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-semibold text-slate-400 uppercase block">
                      Emergency Contact
                    </span>
                    <span className="font-bold text-slate-800">
                      {currentStudent.emergencyContact.name} ({currentStudent.emergencyContact.phone})
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-semibold text-slate-400 uppercase block">
                      Campus Security Helpline
                    </span>
                    <span className="font-mono font-bold text-blue-700">+91 1800-425-ACAD</span>
                  </div>
                </div>
              </div>

              {/* Bottom: Signature & QR Simulation */}
              <div className="pt-2 border-t border-slate-200 flex items-end justify-between">
                <div>
                  <div className="w-32 h-6 border-b border-slate-400 flex items-end justify-center text-[10px] italic font-serif text-slate-700">
                    Dr. Arvind Swaminathan
                  </div>
                  <span className="text-[8px] text-slate-400 uppercase tracking-wider block mt-0.5">
                    Authorized Registrar Signature
                  </span>
                </div>

                <div className="w-12 h-12 bg-slate-100 border border-slate-300 rounded flex items-center justify-center">
                  <QrCode className="w-9 h-9 text-slate-800" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 no-print">
          <span>Card proportions: Standard CR-80 Specification (85.60 × 53.98 mm)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close Studio
          </button>
        </div>
      </div>
    </div>
  );
};
