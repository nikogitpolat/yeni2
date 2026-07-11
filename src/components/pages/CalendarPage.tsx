import { useState } from 'react';
import { 
  Calendar, ChevronLeft, ChevronRight, Plus, CheckCircle2 
} from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  type: 'lecture' | 'deadline' | 'meeting' | 'holiday';
  classGroup?: string;
  day: number;
}

const initialEvents: CalendarEvent[] = [
  { id: 'e-1', title: 'Intro to Quantum Physics', time: '10:00 AM — 11:30 AM', type: 'lecture', classGroup: 'Grade 11C Physics', day: 11 },
  { id: 'e-2', title: 'Electromagnetics Equations Due', time: '11:59 PM', type: 'deadline', classGroup: 'Grade 11C Physics', day: 15 },
  { id: 'e-3', title: 'Curriculum Review Meeting', time: '4:00 PM', type: 'meeting', day: 15 },
  { id: 'e-4', title: 'Wave Duality Laboratory', time: '1:00 PM — 3:00 PM', type: 'lecture', classGroup: 'Grade 11C Physics', day: 17 },
  { id: 'e-5', title: 'Summer Academic Break Day', time: 'All Day', type: 'holiday', day: 24 }
];

export default function CalendarPage() {
  const [currentView, setCurrentView] = useState<'month' | 'week' | 'day'>('month');
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Event Forms
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newType, setNewType] = useState<CalendarEvent['type']>('lecture');
  const [newDay, setNewDay] = useState(15);
  const newClass = 'Grade 11C Physics';

  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newTime) return;

    const newEv: CalendarEvent = {
      id: `e-${Date.now()}`,
      title: newTitle,
      time: newTime,
      type: newType,
      classGroup: newType === 'lecture' || newType === 'deadline' ? newClass : undefined,
      day: Number(newDay)
    };

    setEvents([...events, newEv]);
    setShowAddModal(false);
    setNewTitle('');
    setNewTime('');
    showToast(`Event "${newTitle}" added to planner!`);
  };

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
              <h1 className="text-[22px] font-bold text-white tracking-tight">Academic Calendar</h1>
              <p className="text-[12px] text-slate-500 mt-0.5">Manage schedules, lectures, parent meetings, and homework milestones from a single calendar.</p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all duration-200 hover:opacity-95"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #06B6D4)' }}>
              <Plus size={15} />
              Add Event / Reminder
            </button>
          </div>

          {/* View switches */}
          <div className="flex items-center justify-between p-4 rounded-2xl border" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
            <div className="flex items-center gap-4">
              <span className="text-[14px] font-bold text-white">July 2026</span>
              <div className="flex items-center gap-1 border border-slate-800 rounded-lg p-0.5 bg-white/2">
                <button className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-white transition-all"><ChevronLeft size={13} /></button>
                <button className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-white transition-all"><ChevronRight size={13} /></button>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border" style={{ borderColor: '#1C2D42' }}>
              {(['month', 'week', 'day'] as const).map(v => (
                <button
                  key={v}
                  onClick={() => setCurrentView(v)}
                  className={`px-3.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                    currentView === v ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-400'
                  }`}>
                  {v.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Views Layout */}
          {currentView === 'month' ? (
            <div className="grid grid-cols-7 gap-2">
              {/* Day Headers */}
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                <div key={day} className="text-center text-[10px] text-slate-500 font-bold py-1 border-b border-slate-800">{day}</div>
              ))}

              {/* Month Grid */}
              {Array.from({ length: 31 }).map((_, index) => {
                const dayNum = index + 1;
                const dayEvents = events.filter(e => e.day === dayNum);
                return (
                  <div key={index} className="h-28 p-2 border rounded-xl flex flex-col justify-between hover:bg-white/5 transition-all cursor-pointer"
                    style={{ background: 'rgba(255,255,255,0.01)', borderColor: '#1C2D42' }}>
                    <span className="text-[11px] font-semibold text-slate-400">{dayNum}</span>

                    <div className="space-y-1 overflow-y-auto max-h-20 scrollbar-none">
                      {dayEvents.map(e => (
                        <div 
                          key={e.id} 
                          title={e.title}
                          className={`text-[8.5px] font-semibold p-1 rounded truncate border ${
                            e.type === 'lecture' ? 'bg-blue-500/10 text-blue-400 border-blue-500/10' :
                            e.type === 'deadline' ? 'bg-rose-500/10 text-rose-400 border-rose-500/10' :
                            e.type === 'meeting' ? 'bg-amber-500/10 text-amber-400 border-amber-500/10' : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}>
                          {e.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Weekly / Daily timeline mockup */
            <div className="p-5 rounded-2xl border text-center" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
              <Calendar size={24} className="text-slate-600 mx-auto mb-2.5" />
              <p className="text-[13px] text-slate-400 font-medium">Timeline View Available</p>
              <p className="text-[11px] text-slate-600 mt-1">Schedules are fully synced. Switch to Month View to add, edit, or customize events.</p>
            </div>
          )}

        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border p-6 animate-fade-in"
            style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
            <h2 className="text-[15px] font-bold text-white mb-4">Add Calendar Event</h2>
            
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1.5">Event Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Quantum Exam Prep"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1.5">Event Category</label>
                <select
                  value={newType}
                  onChange={e => setNewType(e.target.value as CalendarEvent['type'])}
                  className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3 py-2">
                  <option value="lecture">Lecture / Class</option>
                  <option value="deadline">Homework Deadline</option>
                  <option value="meeting">Meeting / Faculty Slot</option>
                  <option value="holiday">Holiday / Vacation Day</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] text-slate-400 font-medium mb-1.5">Day (July)</label>
                  <input
                    type="number"
                    min={1}
                    max={31}
                    value={newDay}
                    onChange={e => setNewDay(Number(e.target.value))}
                    className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-medium mb-1.5">Time / Slot</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10:00 AM"
                    value={newTime}
                    onChange={e => setNewTime(e.target.value)}
                    className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-[12px] font-semibold text-slate-400 hover:bg-white/5 transition-all">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-[12px] font-semibold hover:bg-blue-500 transition-all">
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
