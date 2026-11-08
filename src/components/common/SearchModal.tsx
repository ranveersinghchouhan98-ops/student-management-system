import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Student } from '../../types';
import { getStatusBadgeClass } from '../../utils/helpers';
import { Avatar } from './Avatar';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  onSelectStudent: (student: Student) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  students,
  onSelectStudent,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim() === ''
    ? students.slice(0, 5)
    : students.filter((s) => {
        const q = query.toLowerCase();
        return (
          s.firstName.toLowerCase().includes(q) ||
          s.lastName.toLowerCase().includes(q) ||
          s.rollNo.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.department.toLowerCase().includes(q)
        );
      });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0 ml-1" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by student name, roll number, email, or department..."
            className="w-full pl-3 pr-10 text-sm bg-transparent border-none text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-0"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/60"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>{query ? 'Matching Students' : 'Recent Students'}</span>
            <span className="text-[10px] font-normal lowercase">{filtered.length} results</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              No students found matching <span className="font-semibold text-slate-600">"{query}"</span>
            </div>
          ) : (
            <div className="space-y-1">
              {filtered.map((student) => (
                <button
                  key={student.id}
                  onClick={() => {
                    onSelectStudent(student);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-blue-50/70 border border-transparent hover:border-blue-200 text-left transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar
                      firstName={student.firstName}
                      lastName={student.lastName}
                      size="sm"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-700">
                          {student.firstName} {student.lastName}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">
                          {student.rollNo}
                        </span>
                        <span className={`px-1.5 py-0.2 rounded text-[10px] font-semibold border ${getStatusBadgeClass(student.status)}`}>
                          {student.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {student.department} • GPA: <span className="font-semibold text-slate-700">{student.gpa.toFixed(2)}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 group-hover:text-blue-600 shrink-0">
                    <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Open Profile
                    </span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Use keyboard arrows or mouse to navigate</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
