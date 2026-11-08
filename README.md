# AcademiaPulse — Enterprise Student Information & Management Portal

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

An enterprise-grade, high-density **Student Information & Academic Management System (SIS)** engineered for modern universities, colleges, and higher-education institutions. Designed with a clean **white and institutional royal/navy blue** aesthetic, **AcademiaPulse** delivers a crisp, production-grade SaaS experience without distracting neon glow or "vibe-coded" aesthetics.

---

## 🌟 Key Modules & Capabilities

### 1. 📊 Executive Academic Dashboard
- **Executive KPIs**: Real-time tracking of Total Enrolled Students, Average Cumulative GPA, Attendance Compliance, and Tuition Receivables with trend badges.
- **Academic Risk Alerts**: Automated flags for students with low attendance (<75%) or critical GPA thresholds.
- **Department Capacity**: Visual capacity and headcount allocation across academic disciplines.
- **Financial Audit Strip**: Quick summary of tuition collected vs pending accounts.

### 2. 👥 Comprehensive Student Directory
- **Dual View Modes**: High-density enterprise Data Table view with sortable columns and a responsive Card Grid view.
- **Multi-Facet Search & Filters**: Search across Name, Roll Number, Email, Department, Academic Year (Freshman to Senior), Enrollment Status, and Tuition Status.
- **Batch Operations**: Multi-select actions to export selected students to CSV, perform bulk status transitions (Active / On Leave), or batch purge.
- **Full Student Profile Drawer (360° View)**:
  - **Overview**: Personal demographics, contact info, blood group, emergency contact, and residential address.
  - **Academics & Transcripts**: Enrolled courses with detailed breakdown of Midterm 1, Midterm 2, Assignments, Final Exam, Letter Grade, and GPA points.
  - **Attendance Log**: Historical attendance logs with compliance calculation.
  - **Tuition & Ledger**: Outstanding balance tracker, payment receipts history, and in-drawer **"Record Tuition Payment"** flow.

### 3. 📅 Attendance Register & Session Logger
- Course module and session date picker.
- Rapid 1-click status actions: **Present**, **Late**, **Absent**, **Excused**.
- Bulk actions: **"Mark All Present"** and **"Mark All Absent"**.
- Real-time session compliance percentage calculation with persistence.

### 4. 🎓 Academics & Gradebook Engine
- Weighted multi-component assessment tracking:
  - Midterm 1 (max 25)
  - Midterm 2 (max 25)
  - Assignments & Quizzes (max 20)
  - Final Comprehensive Exam (max 30)
- Auto-calculated totals (100-point scale), letter grades (`A+` down to `F`), and 4.0 GPA points.
- Grade distribution metrics (`A`, `B`, `C`, and remediation counts).

### 5. 💳 Tuition & Financial Billing Ledger
- Institutional receivables overview with collection efficiency gauge.
- Student billing roster with real-time balance calculations.
- **Record Payment Modal**: Support for Bank Wire, Credit Card, Student Portal, and Cashier Window.
- **Official University Fee Receipt**: Formatted printable receipt with unique invoice number, timestamp, and bursar audit stamp.

### 6. 🪪 Student ID Card Studio (ISO-7810 Compliant)
- Realistic CR-80 form factor (85.60 × 53.98 mm) identification card renderer.
- **Front Side**: Institutional header, student portrait, smart IC chip, student ID, blood group, validity period, and barcode simulation.
- **Back Side**: Magnetic stripe simulation, campus security hotline, terms, registrar signature, and campus QR access code.
- Dedicated print stylesheet for clean physical printing.

### 7. 📁 Reports, CSV Export & Data Persistence
- **Official CSV Exports**: 1-click export of Student Rosters, Gradebook Transcripts, and Tuition Invoices.
- **Full JSON Database Backup**: Complete snapshot of the local database.
- **Seeded University Dataset**: Pre-populated with 12+ realistic student profiles across 6 academic departments, active course schedules, and transactions.
- **Local Storage Synchronization**: Zero backend required to test; changes persist across browser refreshes.

---

## 🎨 Enterprise Design Language

| Attribute | Specification |
| :--- | :--- |
| **Primary Theme** | Crisp White (`#FFFFFF`) with cool slate backgrounds (`#F8FAFC`, `#F1F5F9`) |
| **Accent & Brand** | Institutional Royal Blue (`#2563EB`) and Deep Navy (`#0F172A`, `#1E3A8A`) |
| **Status Indicators** | Semantic emerald green (Active/Paid), amber (On Leave/Partial), rose (Overdue/Absent) |
| **Typography** | System UI / Inter font stack with tabular numeric figures for clean financial alignment |
| **Aesthetic Philosophy** | Mature higher-education administration (Ellucian / Workday Student / Canvas LMS style) |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** v18+ (tested on Node.js v24.x)
- **npm** v9+ (or pnpm / yarn)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/student-management-system.git
cd student-management-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory, ready to deploy to Vercel, Netlify, or GitHub Pages.

---

## ⌨️ Shortcuts & Productivity Features

- <kbd>Ctrl</kbd> + <kbd>K</kbd> (or <kbd>Cmd</kbd> + <kbd>K</kbd>): Opens the Spotlight Search to instantly jump to any student by name, roll number, or department.
- <kbd>Esc</kbd>: Closes active drawers and modals.
- **Collapsible Sidebar**: Click the toggle icon to switch between full and compact navigation.
- **Print Preview**: Built-in `@media print` rules ensure ID Cards, Receipts, and Transcripts print cleanly without UI chrome.

---

## 🏗️ Project Architecture

```
├── src/
│   ├── components/
│   │   ├── academics/       # Gradebook & evaluation components
│   │   ├── attendance/      # Lecture attendance register
│   │   ├── common/          # Navbar, Sidebar, SearchModal, Toast, Confirmation
│   │   ├── dashboard/       # Executive KPI dashboard & risk alerts
│   │   ├── departments/     # Department capacity & curriculum cards
│   │   ├── fees/            # Tuition ledger, payments, & printable receipts
│   │   ├── idcard/          # ISO-7810 printable ID card studio
│   │   ├── reports/         # CSV / JSON export engine & data reset
│   │   └── students/        # Student directory, table, cards, form & detail modal
│   ├── data/
│   │   └── mockData.ts      # Seeded university dataset & storage adapters
│   ├── types/
│   │   └── index.ts         # TypeScript data interfaces & union types
│   ├── utils/
│   │   └── helpers.ts       # CSV exporters, formatters, & grade calculators
│   ├── App.tsx              # Application state coordination
│   ├── index.css            # Tailwind CSS v4 directives & print styles
│   └── main.tsx             # Application entry point
├── package.json             # Scripts & dependencies
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite + Tailwind build configuration
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
