import React from 'react';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  GraduationCap,
  CreditCard,
  Building2,
  Contact,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export type ActiveTab =
  | 'dashboard'
  | 'students'
  | 'attendance'
  | 'academics'
  | 'fees'
  | 'departments'
  | 'idcard'
  | 'reports';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  studentCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  studentCount,
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Student Directory', icon: Users, badge: studentCount },
    { id: 'attendance', label: 'Attendance Tracker', icon: CalendarCheck },
    { id: 'academics', label: 'Academics & Grades', icon: GraduationCap },
    { id: 'fees', label: 'Fees & Billing', icon: CreditCard },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'idcard', label: 'ID Card Studio', icon: Contact },
    { id: 'reports', label: 'Reports & Export', icon: FileSpreadsheet },
  ];

  return (
    <aside
      className={`relative flex flex-col bg-white border-r border-slate-200 transition-all duration-300 z-30 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 bg-white">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 font-bold text-lg tracking-wider">
              AP
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-base leading-none tracking-tight">
                Academia<span className="text-blue-600">Pulse</span>
              </span>
              <span className="text-[11px] font-medium text-slate-500 tracking-wider uppercase mt-1">
                Student Information
              </span>
            </div>
          </div>
        ) : (
          <div className="w-10 h-10 mx-auto rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            AP
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors ${
            collapsed ? 'mx-auto mt-2 hidden' : ''
          }`}
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label="Toggle Sidebar"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Collapse Toggle for Mini Sidebar */}
      {collapsed && (
        <div className="px-2 pt-2 pb-1 border-b border-slate-100 flex justify-center">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Expand Sidebar"
            aria-label="Expand Sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Nav Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className={`px-2 pb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider ${collapsed ? 'text-center' : ''}`}>
          {collapsed ? '•••' : 'Main Modules'}
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as ActiveTab)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs ring-1 ring-blue-600/10'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              } ${collapsed ? 'justify-center px-0' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-blue-600' : 'text-slate-500 group-hover:text-slate-700'
                }`}
              />

              {!collapsed && (
                <span className="flex-1 text-left truncate tracking-tight">{item.label}</span>
              )}

              {!collapsed && item.badge !== undefined && (
                <span
                  className={`px-1.5 py-0.5 text-xs font-semibold rounded-full ${
                    isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {/* Active Indicator Bar */}
              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-blue-600 rounded-r-md" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Institutional Info & System Status */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/60">
        {!collapsed ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-2 py-1.5 bg-white rounded-md border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-800 leading-none truncate">
                  SIS Verified
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5 truncate">Academic Year 2026-27</p>
              </div>
            </div>
            <div className="px-2 pt-1 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                System Online
              </span>
              <span>v2.4.0</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center" title="System Online: Academic Year 2026-27">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
        )}
      </div>
    </aside>
  );
};
