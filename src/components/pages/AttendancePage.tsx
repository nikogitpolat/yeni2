import { useState } from 'react';
import { 
  Check, AlertTriangle, X, HelpCircle, Save, 
  Download, Users, CheckCircle2, Search
} from 'lucide-react';

interface AttendanceStudent {
  id: string;
  name: string;
  avatar: string;
  status: 'Present' | 'Late' | 'Absent' | 'Excused' | 'Unmarked';
  rate: number;
}

const initialStudents: AttendanceStudent[] = [
  { id: 's-1', name: 'Emma Johnson', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2', status: 'Unmarked', rate: 98 },
  { id: 's-2', name: 'Lucas Rivera', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2', status: 'Unmarked', rate: 92 },
  { id: 's-3', name: 'Sophia Patel', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2', status: 'Unmarked', rate: 96 },
  { id: 's-4', name: 'Alex Morrison', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2', status: 'Unmarked', rate: 71 },
  { id: 's-5', name: 'James Carter', avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2', status: 'Unmarked', rate: 89 },
];

export default function AttendancePage() {
  const [selectedClass, setSelectedClass] = useState('Grade 11C Physics');
  const [selectedLesson, setSelectedLesson] = useState('Quantum Tunneling Introduction');
  const [students, setStudents] = useState<AttendanceStudent[]>(initialStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSetStatus = (id: string, status: AttendanceStudent['status']) => {
    setStudents(students.map(s => s.id === id ? { ...s, status } : s));
  };

  const handleBulkMark = (status: AttendanceStudent['status']) => {
    setStudents(students.map(s => ({ ...s, status })));
    triggerToast(`Bulk-marked all students as "${status}"`);
  };

  const handleSaveAttendance = () => {
    const unmarkedCount = students.filter(s => s.status === 'Unmarked').length;
    if (unmarkedCount > 0) {
      alert(`Please mark attendance for all students. ${unmarkedCount} students remaining.`);
      return;
    }
    triggerToast('Attendance records saved and synched to parent portal!');
  };

  const handleExport = () => {
    triggerToast('CSV Attendance Report compiled and downloading...');
  };

  // Stats calculation
  const presentCount = students.filter(s => s.status === 'Present').length;
  const lateCount = students.filter(s => s.status === 'Late').length;
  const absentCount = students.filter(s => s.status === 'Absent').length;
  const unmarkedCount = students.filter(s => s.status === 'Unmarked').length;

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden h-full">
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-xl shadow-2xl text-[13px] font-medium border border-blue-400 animate-fade-in">
          <CheckCircle2 size={15} />
          {toast}
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[22px] font-bold text-white tracking-tight">Attendance Tracker</h1>
              <p className="text-[12px] text-slate-500 mt-0.5">Quick-mark student presence, log late registers, and export compliant school logs.</p>
            </div>

            <div className="flex items-center gap-2.5">
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl border text-[11px] font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                style={{ borderColor: '#1C2D42' }}>
                <Download size={13} />
                Export CSV
              </button>
              <button 
                onClick={handleSaveAttendance}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-semibold text-white transition-all hover:opacity-95"
                style={{ background: 'linear-gradient(135deg, #3B82F6, #06B6D4)' }}>
                <Save size={13} />
                Save Attendance
              </button>
            </div>
          </div>

          {/* Quick Context Picker & Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Pickers */}
            <div className="lg:col-span-2 p-5 rounded-2xl border flex flex-col justify-between gap-4" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-slate-400 font-medium mb-1.5">Selected Class Group</label>
                  <select
                    value={selectedClass}
                    onChange={e => setSelectedClass(e.target.value)}
                    className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none focus:border-blue-500 transition-colors">
                    <option value="Grade 11C Physics">Grade 11C Physics</option>
                    <option value="Grade 10B Math">Grade 10B Math</option>
                    <option value="Grade 9A Calculus">Grade 9A Calculus</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-medium mb-1.5">Lecture / Slot</label>
                  <select
                    value={selectedLesson}
                    onChange={e => setSelectedLesson(e.target.value)}
                    className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none focus:border-blue-500 transition-colors">
                    <option value="Quantum Tunneling Introduction">Quantum Tunneling Introduction</option>
                    <option value="Superconductor Dynamics">Superconductor Dynamics</option>
                    <option value="Weekly Review Workshop">Weekly Review Workshop</option>
                  </select>
                </div>
              </div>

              {/* Bulk operations bar */}
              <div className="flex items-center justify-between border-t border-slate-800/60 pt-4">
                <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
                  <Users size={12} /> Bulk Mark:
                </span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleBulkMark('Present')}
                    className="px-3 py-1.5 rounded-xl text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all border border-emerald-500/20">
                    All Present
                  </button>
                  <button 
                    onClick={() => handleBulkMark('Excused')}
                    className="px-3 py-1.5 rounded-xl text-[11px] font-semibold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 transition-all border border-amber-500/20">
                    All Excused
                  </button>
                  <button 
                    onClick={() => {
                      setStudents(students.map(s => ({ ...s, status: 'Unmarked' })));
                      triggerToast('Cleared all attendance markers.');
                    }}
                    className="px-3 py-1.5 rounded-xl text-[11px] font-semibold text-slate-400 bg-white/5 hover:bg-white/10 transition-all border border-slate-800">
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Quick stats distribution summary */}
            <div className="p-5 rounded-2xl border flex flex-col justify-between" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
              <h3 className="text-[13px] font-bold text-white mb-3">Live Roster Count</h3>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-3 rounded-xl border" style={{ background: 'rgba(255,255,255,0.01)', borderColor: '#1C2D42' }}>
                  <p className="text-[10px] text-slate-500">Present</p>
                  <p className="text-[16px] font-bold text-emerald-400 mt-0.5">{presentCount}</p>
                </div>
                <div className="p-3 rounded-xl border" style={{ background: 'rgba(255,255,255,0.01)', borderColor: '#1C2D42' }}>
                  <p className="text-[10px] text-slate-500">Late</p>
                  <p className="text-[16px] font-bold text-amber-400 mt-0.5">{lateCount}</p>
                </div>
                <div className="p-3 rounded-xl border" style={{ background: 'rgba(255,255,255,0.01)', borderColor: '#1C2D42' }}>
                  <p className="text-[10px] text-slate-500">Absent</p>
                  <p className="text-[16px] font-bold text-rose-400 mt-0.5">{absentCount}</p>
                </div>
                <div className="p-3 rounded-xl border" style={{ background: 'rgba(255,255,255,0.01)', borderColor: '#1C2D42' }}>
                  <p className="text-[10px] text-slate-500">Unmarked</p>
                  <p className="text-[16px] font-bold text-slate-400 mt-0.5">{unmarkedCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Student attendance marker panel */}
          <div className="p-5 rounded-2xl border" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-bold text-white">Student Presence Roll Call</h3>
              <div className="flex items-center gap-2 border border-slate-800 bg-white/5 rounded-xl px-3 py-1.5 w-48">
                <Search size={12} className="text-slate-500" />
                <input
                  type="text"
                  placeholder="Filter student..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="bg-transparent text-white text-[11px] focus:outline-none w-full"
                />
              </div>
            </div>

            <div className="divide-y divide-slate-800">
              {filteredStudents.map(std => (
                <div key={std.id} className="py-4.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                      <img src={std.avatar} alt={std.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-[12.5px] font-semibold text-white">{std.name}</h4>
                      <p className="text-[10px] text-slate-500">Yearly attendance rate: <span className="text-emerald-400 font-medium">{std.rate}%</span></p>
                    </div>
                  </div>

                  {/* Marker buttons */}
                  <div className="flex items-center gap-1.5">
                    {[
                      { type: 'Present', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', activeColor: 'bg-emerald-500 text-white', icon: Check },
                      { type: 'Late', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', activeColor: 'bg-amber-500 text-white', icon: AlertTriangle },
                      { type: 'Absent', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20', activeColor: 'bg-rose-500 text-white', icon: X },
                      { type: 'Excused', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', activeColor: 'bg-blue-500 text-white', icon: HelpCircle },
                    ].map(btn => {
                      const isActive = std.status === btn.type;
                      const Icon = btn.icon;
                      return (
                        <button
                          key={btn.type}
                          onClick={() => handleSetStatus(std.id, btn.type as AttendanceStudent['status'])}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-semibold border transition-all ${
                            isActive ? btn.activeColor + ' border-transparent scale-[1.03]' : btn.color + ' hover:opacity-85'
                          }`}>
                          <Icon size={12} />
                          {btn.type}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
