import { useState } from 'react';
import { 
  BookOpen, Clock, Video, Users, Plus, 
  Trash2, Copy, CheckCircle2, Play, Eye, Search
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  classGroup: string;
  time: string;
  duration: string;
  status: 'Scheduled' | 'Live' | 'Completed' | 'Canceled';
  participants: number;
  materialsCount: number;
  notes: string;
}

const initialLessons: Lesson[] = [
  {
    id: 'l-1',
    title: 'Intro to Quantum Tunneling & Barriers',
    classGroup: 'Grade 11C Physics',
    time: 'Today, 2:00 PM — 3:30 PM',
    duration: '90 min',
    status: 'Scheduled',
    participants: 24,
    materialsCount: 3,
    notes: 'Brief review of quantum states before opening Bohr barrier equations.',
  },
  {
    id: 'l-2',
    title: 'Superconductivity Fundamentals',
    classGroup: 'Grade 11C Physics',
    time: 'Wednesday, July 15, 10:00 AM',
    duration: '60 min',
    status: 'Scheduled',
    participants: 24,
    materialsCount: 1,
    notes: 'Examine Cooper pairs and Meissner effect. Bring slide deck.',
  },
  {
    id: 'l-3',
    title: 'Quadratic Functions & Parabolas',
    classGroup: 'Grade 10B Math',
    time: 'Yesterday, 10:30 AM',
    duration: '60 min',
    status: 'Completed',
    participants: 18,
    materialsCount: 2,
    notes: 'Covered standard form, vertex formulas, and visual graphing examples.',
  },
  {
    id: 'l-4',
    title: 'Wave-Particle Duality Laboratory',
    classGroup: 'Grade 11C Physics',
    time: 'Friday, July 17, 1:00 PM',
    duration: '120 min',
    status: 'Scheduled',
    participants: 24,
    materialsCount: 5,
    notes: 'Hands-on simulator setup in physical lab or virtual applet.',
  },
];

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'Scheduled' | 'Live' | 'Completed'>('all');
  const [viewMode, setViewMode] = useState<'timeline' | 'calendar'>('timeline');

  // Creation State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newClassGroup, setNewClassGroup] = useState('Grade 11C Physics');
  const [newTime, setNewTime] = useState('');
  const [newDuration, setNewDuration] = useState('60 min');
  const [newNotes, setNewNotes] = useState('');

  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newTime) return;
    const newLsn: Lesson = {
      id: `l-${Date.now()}`,
      title: newTitle,
      classGroup: newClassGroup,
      time: newTime,
      duration: newDuration,
      status: 'Scheduled',
      participants: newClassGroup.includes('11C') ? 24 : 18,
      materialsCount: 0,
      notes: newNotes,
    };
    setLessons([newLsn, ...lessons]);
    setShowCreateModal(false);
    setNewTitle('');
    setNewTime('');
    setNewNotes('');
    showToast(`Lesson "${newTitle}" scheduled!`);
  };

  const handleDuplicate = (lsn: Lesson) => {
    const dup: Lesson = {
      ...lsn,
      id: `l-${Date.now()}`,
      title: `${lsn.title} (Copy)`,
      time: `Next week, same time`,
      status: 'Scheduled',
    };
    setLessons([dup, ...lessons]);
    showToast(`Lesson duplicated successfully!`);
  };

  const handleCancel = (id: string) => {
    setLessons(lessons.map(l => l.id === id ? { ...l, status: 'Canceled' } : l));
    showToast('Lesson canceled.');
  };

  const handleLaunchLive = (id: string) => {
    setLessons(lessons.map(l => l.id === id ? { ...l, status: 'Live' } : l));
    showToast('Virtual Class is now LIVE! Students have been notified.');
  };

  const handleEndLive = (id: string) => {
    setLessons(lessons.map(l => l.id === id ? { ...l, status: 'Completed' } : l));
    showToast('Lesson marked as Completed.');
  };

  const filteredLessons = lessons.filter(l => {
    const matchesSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          l.classGroup.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' ? true : l.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden h-full">
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-2xl text-[13px] font-medium border border-emerald-400 animate-fade-in">
          <CheckCircle2 size={15} />
          {toast}
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[22px] font-bold text-white tracking-tight">Lesson Planner</h1>
              <p className="text-[12px] text-slate-500 mt-0.5">Organize class syllabi, draft lectures, and trigger live video sessions.</p>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all duration-200 hover:opacity-95"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #06B6D4)' }}>
              <Plus size={15} />
              Schedule New Lesson
            </button>
          </div>

          {/* Filters and View Toggles */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl border" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
            <div className="flex items-center gap-2">
              {(['all', 'Scheduled', 'Live', 'Completed'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-3 py-1.5 rounded-xl text-[12px] font-medium transition-all"
                  style={{
                    background: filter === f ? 'rgba(59,130,246,0.12)' : 'transparent',
                    color: filter === f ? '#60A5FA' : '#64748B',
                    border: filter === f ? '1px solid rgba(59,130,246,0.2)' : '1px solid transparent',
                  }}>
                  {f === 'all' ? 'All Lectures' : f}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border w-48"
                style={{ background: 'rgba(255,255,255,0.02)', borderColor: '#1C2D42' }}>
                <Search size={13} className="text-slate-500" />
                <input
                  type="text"
                  placeholder="Search lesson..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="bg-transparent text-white text-[11px] placeholder-slate-600 focus:outline-none w-full"
                />
              </div>

              {/* View toggle */}
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border" style={{ borderColor: '#1C2D42' }}>
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${viewMode === 'timeline' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500'}`}>
                  Timeline
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${viewMode === 'calendar' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500'}`}>
                  Calendar Grid
                </button>
              </div>
            </div>
          </div>

          {/* Schedule Workspace Contents */}
          {viewMode === 'timeline' ? (
            <div className="space-y-4">
              {filteredLessons.length === 0 ? (
                <div className="text-center py-16 border rounded-2xl border-dashed" style={{ borderColor: '#1C2D42', background: '#080C14' }}>
                  <BookOpen size={24} className="text-slate-600 mx-auto mb-2" />
                  <p className="text-[13px] text-slate-400 font-medium">No lessons scheduled</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">Try scheduling a lecture or clearing your filters.</p>
                </div>
              ) : (
                filteredLessons.map(lsn => (
                  <div key={lsn.id} className="card-hover p-5 rounded-2xl border flex items-start gap-5" style={{ background: '#0D1220' }}>
                    
                    {/* Visual indicators */}
                    <div className="flex flex-col items-center justify-center h-16 w-16 rounded-2xl bg-slate-800/50 border flex-shrink-0" style={{ borderColor: '#1C2D42' }}>
                      <BookOpen size={18} className="text-blue-400" />
                      <span className="text-[9px] text-slate-400 font-bold mt-1">{lsn.duration}</span>
                    </div>

                    {/* Lesson core descriptors */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-slate-800">
                          {lsn.classGroup}
                        </span>
                        
                        {lsn.status === 'Live' && (
                          <span className="flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse">
                            <Video size={10} className="live-dot" /> LIVE VIRTUAL CLASS
                          </span>
                        )}

                        {lsn.status === 'Completed' && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                            COMPLETED
                          </span>
                        )}

                        {lsn.status === 'Canceled' && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-red-500/15 text-red-500 line-through">
                            CANCELED
                          </span>
                        )}
                      </div>

                      <h3 className="text-[15px] font-bold text-white mt-1.5 tracking-tight">{lsn.title}</h3>
                      <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
                        <Clock size={12} className="text-slate-600" /> {lsn.time}
                      </p>

                      <p className="text-[11px] text-slate-400 mt-3 border-l-2 border-slate-800 pl-3 italic">
                        {lsn.notes}
                      </p>

                      {/* Stats footer bar */}
                      <div className="flex items-center gap-4 mt-4 text-[10px] text-slate-500">
                        <span className="flex items-center gap-1"><Users size={12} /> {lsn.participants} Students rostered</span>
                        <span>•</span>
                        <span>{lsn.materialsCount} shared study materials</span>
                      </div>
                    </div>

                    {/* Left Actions */}
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      {lsn.status === 'Scheduled' && (
                        <>
                          <button
                            onClick={() => handleLaunchLive(lsn.id)}
                            className="flex items-center justify-center gap-1.5 px-4.5 py-2 rounded-xl text-[11px] font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg">
                            <Play size={12} fill="white" /> Launch Live Class
                          </button>
                          
                          <div className="flex items-center gap-1 justify-end">
                            <button 
                              onClick={() => handleDuplicate(lsn)}
                              title="Duplicate Class"
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 border border-slate-800 transition-all">
                              <Copy size={12} />
                            </button>
                            <button 
                              onClick={() => handleCancel(lsn.id)}
                              title="Cancel Lesson"
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-slate-800 transition-all">
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </>
                      )}

                      {lsn.status === 'Live' && (
                        <button
                          onClick={() => handleEndLive(lsn.id)}
                          className="flex items-center justify-center gap-1.5 px-4.5 py-2 rounded-xl text-[11px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg">
                          End Live Lesson
                        </button>
                      )}

                      {lsn.status === 'Completed' && (
                        <button className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-semibold border border-slate-800 text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                          <Eye size={12} /> View Recap & Attendance
                        </button>
                      )}

                      {lsn.status === 'Canceled' && (
                        <span className="text-[10px] font-semibold text-rose-500 text-right">Lesson Canceled</span>
                      )}
                    </div>

                  </div>
                ))
              )}
            </div>
          ) : (
            /* Mock Calendar Grid view */
            <div className="p-6 rounded-2xl border" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[13px] font-bold text-white">July 2026</span>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span className="w-2.5 h-2.5 rounded bg-blue-500"></span> Active Lectures
                  <span className="w-2.5 h-2.5 rounded bg-emerald-500 ml-3"></span> Finished Lessons
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2.5 text-center text-[11px] text-slate-500 font-bold border-b border-slate-800 pb-2">
                <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
              </div>

              <div className="grid grid-cols-7 gap-2.5 mt-3 text-left">
                {Array.from({ length: 31 }).map((_, index) => {
                  const dayNum = index + 1;
                  const hasLesson = dayNum === 11 || dayNum === 15 || dayNum === 17;
                  const isPast = dayNum < 11;
                  return (
                    <div key={index} className="h-20 p-2 border rounded-xl flex flex-col justify-between transition-all hover:bg-white/5 cursor-pointer"
                      style={{ borderColor: '#1C2D42', background: 'rgba(255,255,255,0.01)' }}>
                      <span className={`text-[11px] font-semibold ${isPast ? 'text-slate-600' : 'text-slate-300'}`}>{dayNum}</span>
                      
                      {hasLesson && (
                        <div className={`text-[8px] font-bold p-1 rounded ${dayNum === 10 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'} truncate`}>
                          {dayNum === 11 ? 'Intro to Quantum' : dayNum === 15 ? 'Superconductors' : 'Lab Simulator'}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Creation Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border p-6 animate-fade-in"
            style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
            <h2 className="text-[16px] font-bold text-white mb-1">Schedule Lesson</h2>
            <p className="text-[11px] text-slate-500 mb-4 font-normal">Add standard syllabi slots, prepare homework slides, and select your target class roster.</p>
            
            <form onSubmit={handleCreateLesson} className="space-y-4">
              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1">Lesson Topic / Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wave Particle Laboratory"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 font-medium mb-1">Target Class</label>
                  <select
                    value={newClassGroup}
                    onChange={e => setNewClassGroup(e.target.value)}
                    className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none focus:border-blue-500 transition-all">
                    <option value="Grade 11C Physics">Grade 11C Physics</option>
                    <option value="Grade 10B Math">Grade 10B Math</option>
                    <option value="Grade 9A Calculus">Grade 9A Calculus</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-medium mb-1">Duration</label>
                  <select
                    value={newDuration}
                    onChange={e => setNewDuration(e.target.value)}
                    className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none focus:border-blue-500 transition-all">
                    <option value="45 min">45 min</option>
                    <option value="60 min">60 min</option>
                    <option value="90 min">90 min</option>
                    <option value="120 min">120 min</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1">Schedule Date & Time</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Today, 2:00 PM — 3:30 PM"
                  value={newTime}
                  onChange={e => setNewTime(e.target.value)}
                  className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1">Teacher Notes / Instructions</label>
                <textarea
                  placeholder="Notes for students or slide lists..."
                  value={newNotes}
                  onChange={e => setNewNotes(e.target.value)}
                  rows={2}
                  className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none focus:border-blue-500 transition-all resize-none"
                />
              </div>

              <div className="flex items-center gap-2.5 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-[12px] font-semibold text-slate-400 hover:bg-white/5 transition-all">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-[12px] font-semibold hover:bg-blue-500 transition-all">
                  Schedule Lesson
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
