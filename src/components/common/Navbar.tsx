import React, { useState } from 'react';
import {
  Search,
  Plus,
  Download,
  Bell,
  Command,
  CheckCircle2,
  Calendar,
  UserCheck,
} from 'lucide-react';
import { Student } from '../../types';
import { exportStudentsToCsv } from '../../utils/helpers';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenAddModal: () => void;
  students: Student[];
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenAddModal,
  students,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeRole, setActiveRole] = useState<'Registrar' | 'Faculty' | 'Dean'>('Registrar');

  const notifications = [
    { id: 1, title: 'Fall 2026 Census Finalized', time: '10m ago', unread: true },
    { id: 2, title: '3 tuition overdue flags generated', time: '1h ago', unread: true },
    { id: 3, title: 'Midterm grade submission deadline in 4 days', time: '3h ago', unread: false },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Search Bar / Spotlight Trigger */}
      <div className="flex items-center gap-4 flex-1 max-w-lg">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-500 transition-all text-left group shadow-xs"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
            <span>Search students, roll numbers, courses...</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-xs">
            <Command className="w-3 h-3" /> K
          </div>
        </button>
      </div>

      {/* Right Tools & Profile */}
      <div className="flex items-center gap-3">
        {/* Academic Term Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-blue-50/70 border border-blue-200/60 rounded-lg text-xs font-medium text-blue-800">
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          <span>Fall Semester 2026</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
        </div>

        {/* Quick CSV Export */}
        <button
          onClick={() => exportStudentsToCsv(students)}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-xs transition-colors"
          title="Export Student Roster to CSV"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export CSV</span>
        </button>

        {/* Enroll Student CTA */}
        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Enroll Student</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 relative transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Notifications
                </span>
                <span className="text-[11px] text-blue-600 font-medium cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`px-4 py-3 hover:bg-slate-50 text-xs transition-colors cursor-pointer ${
                      item.unread ? 'bg-blue-50/40' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <p className="font-semibold text-slate-800">{item.title}</p>
                      {item.unread && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1"></span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">{item.time}</span>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-slate-100 text-center">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Identity / Role Avatar */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs">
            AD
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-xs font-semibold text-slate-800 leading-tight">
              Dr. Marcus Shaw
            </span>
            <select
              value={activeRole}
              onChange={(e) => setActiveRole(e.target.value as any)}
              className="text-[11px] text-slate-500 bg-transparent border-none p-0 cursor-pointer focus:ring-0 leading-tight font-medium"
            >
              <option value="Registrar">Registrar Office</option>
              <option value="Dean">Dean of Academics</option>
              <option value="Faculty">Department Admin</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
