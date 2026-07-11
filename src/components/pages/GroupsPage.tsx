import { useState } from 'react';
import { 
  Users, Search, Plus, MoreVertical, Code, Share2, Archive, Trash2, 
  ChevronRight, BookOpen, FileText, CheckCircle2, 
  MessageSquare, Clock, 
  FolderOpen, Calendar, AlertCircle, ArrowLeft, Send, Megaphone
} from 'lucide-react';

interface GroupClass {
  id: string;
  name: string;
  subject: string;
  studentCount: number;
  upcomingLesson: string;
  assignmentCount: number;
  pendingJoinRequests: number;
  code: string;
  color: string;
  isArchived?: boolean;
}

const initialClasses: GroupClass[] = [
  {
    id: 'g-11c',
    name: 'Grade 11C',
    subject: 'Advanced Physics & Calculus',
    studentCount: 24,
    upcomingLesson: 'Today, 2:00 PM — Quantum Mechanics Intro',
    assignmentCount: 4,
    pendingJoinRequests: 3,
    code: 'PHY-11C-X9',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'g-10b',
    name: 'Grade 10B',
    subject: 'Introductory Algebra & Geometry',
    studentCount: 18,
    upcomingLesson: 'Tomorrow, 10:30 AM — Quadratic Equations',
    assignmentCount: 3,
    pendingJoinRequests: 0,
    code: 'MATH-10B-Y2',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'g-9a',
    name: 'Grade 9A',
    subject: 'Fundamental Mathematics',
    studentCount: 22,
    upcomingLesson: 'Monday, 9:00 AM — Ratios & Percentages',
    assignmentCount: 2,
    pendingJoinRequests: 1,
    code: 'MATH-9A-Z1',
    color: 'from-indigo-500 to-purple-600',
  },
];

export default function GroupsPage() {
  const [classes, setClasses] = useState<GroupClass[]>(initialClasses);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'archived'>('all');
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'overview' | 'students' | 'lessons' | 'assignments' | 'materials' | 'attendance' | 'announcements' | 'chat'>('overview');
  
  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassSubject, setNewClassSubject] = useState('');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Notifications or toast simulation
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const selectedClass = classes.find(c => c.id === selectedClassId);

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName || !newClassSubject) return;
    const newClass: GroupClass = {
      id: `g-${Date.now()}`,
      name: newClassName,
      subject: newClassSubject,
      studentCount: 0,
      upcomingLesson: 'No upcoming lessons scheduled',
      assignmentCount: 0,
      pendingJoinRequests: 0,
      code: `CODE-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      color: 'from-purple-500 to-pink-600',
    };
    setClasses([newClass, ...classes]);
    setNewClassName('');
    setNewClassSubject('');
    setShowCreateModal(false);
    triggerToast(`Class "${newClassName}" created successfully!`);
  };

  const handleArchiveClass = (id: string) => {
    setClasses(classes.map(c => c.id === id ? { ...c, isArchived: !c.isArchived } : c));
    setActiveMenuId(null);
    const cls = classes.find(c => c.id === id);
    triggerToast(cls?.isArchived ? `Class restored!` : `Class archived!`);
  };

  const handleDeleteClass = (id: string) => {
    if (confirm('Are you sure you want to delete this class? All class data will be permanently removed.')) {
      setClasses(classes.filter(c => c.id !== id));
      setActiveMenuId(null);
      triggerToast('Class deleted permanently.');
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    triggerToast(`Invitation code "${code}" copied to clipboard!`);
  };

  const handleShareLink = (code: string) => {
    const link = `https://studyfy.edu/join?code=${code}`;
    navigator.clipboard.writeText(link);
    triggerToast(`Shareable join link copied to clipboard!`);
  };

  const filteredClasses = classes.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'archived' ? c.isArchived : !c.isArchived;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden h-full">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-xl shadow-2xl text-[13px] font-medium border border-blue-400 animate-fade-in">
          <CheckCircle2 size={15} />
          {toastMsg}
        </div>
      )}

      {/* Main Container */}
      {!selectedClassId ? (
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-[1400px] mx-auto space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[22px] font-bold text-white tracking-tight">Classes & Groups</h1>
                <p className="text-[12px] text-slate-500 mt-0.5">Manage your active student rosters, course spaces, and invitations.</p>
              </div>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all duration-200 hover:opacity-95"
                style={{ background: 'linear-gradient(135deg, #3B82F6, #06B6D4)' }}>
                <Plus size={15} />
                Create New Class
              </button>
            </div>

            {/* Filters Row */}
            <div className="flex items-center justify-between gap-4 p-4 rounded-2xl border" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setFilter('all')}
                  className="px-4 py-1.5 rounded-xl text-[12px] font-medium transition-all"
                  style={{
                    background: filter === 'all' ? 'rgba(59,130,246,0.12)' : 'transparent',
                    color: filter === 'all' ? '#60A5FA' : '#64748B',
                    border: filter === 'all' ? '1px solid rgba(59,130,246,0.2)' : '1px solid transparent',
                  }}>
                  Active Classes ({classes.filter(c => !c.isArchived).length})
                </button>
                <button
                  onClick={() => setFilter('archived')}
                  className="px-4 py-1.5 rounded-xl text-[12px] font-medium transition-all"
                  style={{
                    background: filter === 'archived' ? 'rgba(59,130,246,0.12)' : 'transparent',
                    color: filter === 'archived' ? '#60A5FA' : '#64748B',
                    border: filter === 'archived' ? '1px solid rgba(59,130,246,0.2)' : '1px solid transparent',
                  }}>
                  Archived ({classes.filter(c => c.isArchived).length})
                </button>
              </div>

              {/* Search */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border max-w-xs w-full"
                style={{ background: 'rgba(255,255,255,0.02)', borderColor: '#1C2D42' }}>
                <Search size={14} className="text-slate-500 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search classes..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="bg-transparent text-white text-[12px] placeholder-slate-600 focus:outline-none w-full"
                />
              </div>
            </div>

            {/* Classes Grid */}
            {filteredClasses.length === 0 ? (
              <div className="text-center py-16 border rounded-2xl border-dashed" style={{ borderColor: '#1C2D42', background: '#080C14' }}>
                <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-3">
                  <Users size={20} className="text-slate-500" />
                </div>
                <h3 className="text-[14px] font-semibold text-white">No classes found</h3>
                <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto">
                  {searchQuery ? 'Adjust your search query or filters to find what you are looking for.' : 'Get started by creating your very first academic class group.'}
                </p>
                {!searchQuery && (
                  <button 
                    onClick={() => setShowCreateModal(true)}
                    className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-medium text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 transition-all">
                    Create class <ChevronRight size={12} />
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredClasses.map(cls => (
                  <div key={cls.id} className="card-hover rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between"
                    style={{ background: '#0D1220' }}>
                    
                    {/* Header bar styled gradient bar */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
                    <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${cls.color}`} />

                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br ${cls.color} text-white font-bold text-sm shadow-md`}>
                            {cls.name.split(' ').pop()}
                          </div>
                          <div>
                            <h3 className="text-[15px] font-bold text-white tracking-tight">{cls.name}</h3>
                            <p className="text-[10px] text-slate-400 truncate max-w-[160px]">{cls.subject}</p>
                          </div>
                        </div>

                        {/* More menu */}
                        <div className="relative">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === cls.id ? null : cls.id); }}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                            <MoreVertical size={14} />
                          </button>
                          
                          {activeMenuId === cls.id && (
                            <div className="absolute right-0 mt-1.5 w-40 rounded-xl border shadow-2xl z-20 py-1.5"
                              style={{ background: '#121829', borderColor: '#1C2D42' }}>
                              <button 
                                onClick={() => handleCopyCode(cls.code)}
                                className="w-full flex items-center gap-2 px-3 py-1.5 text-left text-[11px] text-slate-300 hover:bg-white/5 hover:text-white transition-all">
                                <Code size={12} /> Copy Invitation Code
                              </button>
                              <button 
                                onClick={() => handleShareLink(cls.code)}
                                className="w-full flex items-center gap-2 px-3 py-1.5 text-left text-[11px] text-slate-300 hover:bg-white/5 hover:text-white transition-all">
                                <Share2 size={12} /> Share Invite Link
                              </button>
                              <button 
                                onClick={() => handleArchiveClass(cls.id)}
                                className="w-full flex items-center gap-2 px-3 py-1.5 text-left text-[11px] text-slate-300 hover:bg-white/5 hover:text-white transition-all border-t border-slate-800">
                                <Archive size={12} /> {cls.isArchived ? 'Restore Class' : 'Archive Class'}
                              </button>
                              <button 
                                onClick={() => handleDeleteClass(cls.id)}
                                className="w-full flex items-center gap-2 px-3 py-1.5 text-left text-[11px] text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all">
                                <Trash2 size={12} /> Delete Class
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Stats list */}
                      <div className="space-y-2 py-3 border-y my-3" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500 flex items-center gap-1.5"><Users size={12} /> Student Count</span>
                          <span className="text-slate-300 font-semibold">{cls.studentCount} students</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500 flex items-center gap-1.5"><FileText size={12} /> Active Assignments</span>
                          <span className="text-slate-300 font-semibold">{cls.assignmentCount} published</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500 flex items-center gap-1.5"><Clock size={12} /> Next Lesson</span>
                          <span className="text-slate-300 truncate max-w-[140px]" title={cls.upcomingLesson}>{cls.upcomingLesson.split(' — ')[1] || 'None'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {cls.pendingJoinRequests > 0 ? (
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20">
                          <AlertCircle size={10} />
                          {cls.pendingJoinRequests} join requests
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-600"> Rostered class </span>
                      )}

                      <button 
                        onClick={() => setSelectedClassId(cls.id)}
                        className="flex items-center gap-1 text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-all">
                        Enter Workspace
                        <ChevronRight size={12} />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Workspace Class Details View */
        <div className="flex-1 flex flex-col overflow-hidden h-full">
          
          {/* Top workspace nav details */}
          <div className="px-8 py-4 border-b flex flex-col gap-3" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSelectedClassId(null)}
                className="w-8 h-8 rounded-xl border flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                style={{ borderColor: '#1C2D42' }}>
                <ArrowLeft size={14} />
              </button>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="text-[18px] font-bold text-white tracking-tight truncate">{selectedClass?.name}</h1>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {selectedClass?.code}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 truncate">{selectedClass?.subject}</p>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleCopyCode(selectedClass?.code || '')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                  style={{ borderColor: '#1C2D42' }}>
                  <Code size={12} /> Copy Code
                </button>
                <button 
                  onClick={() => handleShareLink(selectedClass?.code || '')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                  style={{ borderColor: '#1C2D42' }}>
                  <Share2 size={12} /> Share Invite
                </button>
              </div>
            </div>

            {/* Sub-tabs workspace */}
            <div className="flex items-center gap-1 mt-1 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'overview', label: 'Overview', icon: BookOpen },
                { id: 'students', label: 'Students', icon: Users, count: selectedClass?.pendingJoinRequests },
                { id: 'lessons', label: 'Lessons Schedule', icon: Calendar },
                { id: 'assignments', label: 'Assignments', icon: FileText, count: selectedClass?.assignmentCount },
                { id: 'materials', label: 'Resources / Files', icon: FolderOpen },
                { id: 'attendance', label: 'Attendance Tracker', icon: CheckCircle2 },
                { id: 'announcements', label: 'Announcements', icon: Megaphone },
                { id: 'chat', label: 'Class Chat', icon: MessageSquare },
              ].map(tab => {
                const isTabActive = activeWorkspaceTab === tab.id;
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveWorkspaceTab(tab.id as 'overview' | 'students' | 'lessons' | 'assignments' | 'materials' | 'attendance' | 'announcements' | 'chat')}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-[12px] font-medium transition-all whitespace-nowrap"
                    style={{
                      background: isTabActive ? 'rgba(59,130,246,0.12)' : 'transparent',
                      color: isTabActive ? '#60A5FA' : '#64748B',
                      border: isTabActive ? '1px solid rgba(59,130,246,0.2)' : '1px solid transparent',
                    }}>
                    <TabIcon size={13} />
                    {tab.label}
                    {tab.count !== undefined && tab.count > 0 && (
                      <span className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold bg-blue-500 text-white animate-pulse">
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Workspace Tab Content */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            <div className="max-w-[1400px] mx-auto space-y-6 animate-fade-in">
              
              {activeWorkspaceTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {/* Left stats cards */}
                  <div className="lg:col-span-2 space-y-5">
                    <div className="p-5 rounded-2xl border" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
                      <h3 className="text-[14px] font-bold text-white mb-3">Class Performance Overview</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl border text-center" style={{ background: 'rgba(255,255,255,0.01)', borderColor: '#1C2D42' }}>
                          <p className="text-[10px] text-slate-500">Average Class Score</p>
                          <p className="text-[20px] font-bold text-emerald-400 mt-1">87.5%</p>
                        </div>
                        <div className="p-4 rounded-xl border text-center" style={{ background: 'rgba(255,255,255,0.01)', borderColor: '#1C2D42' }}>
                          <p className="text-[10px] text-slate-500">Attendance Rate</p>
                          <p className="text-[20px] font-bold text-blue-400 mt-1">94.8%</p>
                        </div>
                        <div className="p-4 rounded-xl border text-center" style={{ background: 'rgba(255,255,255,0.01)', borderColor: '#1C2D42' }}>
                          <p className="text-[10px] text-slate-500">Assignment Complete</p>
                          <p className="text-[20px] font-bold text-cyan-400 mt-1">91.2%</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl border" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
                      <h3 className="text-[14px] font-bold text-white mb-3">Upcoming Schedules & Deadlines</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 rounded-xl border" style={{ background: 'rgba(255,255,255,0.01)', borderColor: '#1C2D42' }}>
                          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 text-xs font-bold">
                            MON
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-semibold text-slate-200">Quantum Tunneling Deep Dive</p>
                            <p className="text-[10px] text-slate-500">Lesson — 9:00 AM to 10:30 AM</p>
                          </div>
                          <button className="text-[11px] text-blue-400 font-semibold hover:underline">Prepare</button>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-xl border" style={{ background: 'rgba(255,255,255,0.01)', borderColor: '#1C2D42' }}>
                          <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 text-xs font-bold">
                            WED
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-semibold text-slate-200">Electromagnetism Equations Homework</p>
                            <p className="text-[10px] text-slate-500">Due — 11:59 PM</p>
                          </div>
                          <button className="text-[11px] text-blue-400 font-semibold hover:underline">Review</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side activity feed */}
                  <div className="p-5 rounded-2xl border flex flex-col justify-between" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
                    <div>
                      <h3 className="text-[14px] font-bold text-white mb-3">Class Announcements</h3>
                      <div className="space-y-4">
                        <div className="p-3.5 rounded-xl border relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.01)', borderColor: '#1C2D42' }}>
                          <span className="absolute top-0 right-0 bg-blue-500/15 text-blue-400 text-[8px] font-bold px-1.5 py-0.5 rounded-bl">PINNED</span>
                          <p className="text-[12px] font-bold text-slate-200">Midterm details posted</p>
                          <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">Please read the materials folder for details on modules covered on July 20th midterm.</p>
                        </div>

                        <div className="p-3.5 rounded-xl border" style={{ background: 'rgba(255,255,255,0.01)', borderColor: '#1C2D42' }}>
                          <p className="text-[12px] font-bold text-slate-200">Live lecture rescheduled</p>
                          <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">The Tuesday morning lecture will be shifted to 2 PM. Recording will be available afterwards.</p>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setActiveWorkspaceTab('announcements')}
                      className="w-full text-center py-2 text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors mt-4">
                      View all Announcements
                    </button>
                  </div>
                </div>
              )}

              {activeWorkspaceTab === 'students' && (
                <div className="space-y-4">
                  {/* Requests banner if pending */}
                  {selectedClass?.pendingJoinRequests && selectedClass.pendingJoinRequests > 0 ? (
                    <div className="p-4 rounded-xl border bg-blue-500/5 border-blue-500/20 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                          <Users size={18} />
                        </div>
                        <div>
                          <p className="text-[12px] font-bold text-white">Pending Membership Requests</p>
                          <p className="text-[11px] text-slate-400">You have {selectedClass.pendingJoinRequests} students waiting for verification to enter this class room.</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            setClasses(classes.map(c => c.id === selectedClassId ? { ...c, pendingJoinRequests: 0, studentCount: c.studentCount + c.pendingJoinRequests } : c));
                            triggerToast('Accepted all pending students successfully!');
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-blue-500 text-white text-[11px] font-semibold hover:bg-blue-600 transition-all">
                          Accept All
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {/* Student list */}
                  <div className="p-5 rounded-2xl border" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[14px] font-bold text-white">Student Roster ({selectedClass?.studentCount || 0})</h3>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Search students..."
                          className="bg-white/5 border border-slate-800 text-white text-[11px] px-3 py-1.5 rounded-xl focus:outline-none w-48"
                        />
                      </div>
                    </div>

                    <div className="divide-y divide-slate-800">
                      {[
                        { name: 'Emma Johnson', score: 96, attendance: 98, status: 'Active' },
                        { name: 'Lucas Rivera', score: 85, attendance: 92, status: 'Active' },
                        { name: 'Sophia Patel', score: 84, attendance: 96, status: 'Active' },
                        { name: 'Alex Morrison', score: 58, attendance: 71, status: 'At Risk' },
                      ].map((std, i) => (
                        <div key={i} className="py-3 flex items-center justify-between text-[12px] group">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-bold text-xs flex items-center justify-center">
                              {std.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-semibold text-white">{std.name}</p>
                              <p className="text-[10px] text-slate-500">Student ID: #ST-982{i}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <p className="text-[11px] text-slate-400">Score</p>
                              <p className={`font-semibold ${std.score >= 90 ? 'text-emerald-400' : std.score >= 75 ? 'text-blue-400' : 'text-amber-400'}`}>
                                {std.score}%
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-[11px] text-slate-400">Attendance</p>
                              <p className="font-semibold text-slate-300">{std.attendance}%</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[11px] text-slate-400">Status</p>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${std.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                {std.status}
                              </span>
                            </div>

                            <button className="text-[11px] text-red-400 font-medium opacity-0 group-hover:opacity-100 transition-all hover:underline pl-4">
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeWorkspaceTab === 'lessons' && (
                <div className="p-5 rounded-2xl border" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
                  <h3 className="text-[14px] font-bold text-white mb-4">Lesson Scheduling Workspace</h3>
                  <div className="border rounded-xl divide-y divide-slate-800" style={{ borderColor: '#1C2D42' }}>
                    {[
                      { title: 'Intro to Quantum Physics', time: 'Monday, 10:00 AM — 11:30 AM', status: 'Completed' },
                      { title: 'Superconductivity & Wavefunctions', time: 'Wednesday, 2:00 PM — 3:30 PM', status: 'Scheduled' },
                      { title: 'Midterm Preparation Workshop', time: 'Friday, 1:00 PM — 2:30 PM', status: 'Scheduled' },
                    ].map((lsn, index) => (
                      <div key={index} className="p-4 flex items-center justify-between">
                        <div>
                          <p className="text-[13px] font-semibold text-white">{lsn.title}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1.5">
                            <Clock size={11} /> {lsn.time}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full ${lsn.status === 'Completed' ? 'bg-slate-800 text-slate-400' : 'bg-blue-500/10 text-blue-400'}`}>
                            {lsn.status}
                          </span>
                          <button className="px-3 py-1.5 rounded-xl border border-slate-800 hover:bg-white/5 text-[11px] font-medium text-slate-300">
                            {lsn.status === 'Completed' ? 'View Materials' : 'Launch Live'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeWorkspaceTab === 'assignments' && (
                <div className="p-5 rounded-2xl border" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
                  <h3 className="text-[14px] font-bold text-white mb-4">Assignments & Homeworks</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: 'Electromagnetics Equations HW 2', due: 'July 15, 2026', submissions: '18/24 submitted', score: '100 points' },
                      { title: 'Quantum Superposition Short Essay', due: 'July 22, 2026', submissions: '5/24 submitted', score: '50 points' },
                    ].map((asm, i) => (
                      <div key={i} className="p-4 rounded-xl border" style={{ background: 'rgba(255,255,255,0.01)', borderColor: '#1C2D42' }}>
                        <p className="text-[13px] font-bold text-white">{asm.title}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">Due: {asm.due}</p>
                        
                        <div className="flex items-center justify-between mt-4 text-[11px]">
                          <span className="text-slate-400 font-medium">{asm.submissions}</span>
                          <span className="text-blue-400 font-semibold">{asm.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeWorkspaceTab === 'materials' && (
                <div className="p-5 rounded-2xl border" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
                  <h3 className="text-[14px] font-bold text-white mb-4">Class Materials & Shared Documents</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { name: 'Quantum Physics Guide.pdf', size: '4.2 MB', type: 'PDF' },
                      { name: 'Midterm Modules.docx', size: '120 KB', type: 'Word' },
                      { name: 'Syllabus Phase 1.pdf', size: '1.5 MB', type: 'PDF' },
                      { name: 'Class Slides - Lecture 1.pptx', size: '12.8 MB', type: 'Powerpoint' },
                    ].map((mat, i) => (
                      <div key={i} className="p-3 border rounded-xl hover:bg-white/5 transition-all cursor-pointer" style={{ borderColor: '#1C2D42' }}>
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-xs mb-3">
                          {mat.type}
                        </div>
                        <p className="text-[11px] font-semibold text-white truncate">{mat.name}</p>
                        <p className="text-[9px] text-slate-500 mt-0.5">{mat.size}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeWorkspaceTab === 'attendance' && (
                <div className="p-5 rounded-2xl border" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
                  <h3 className="text-[14px] font-bold text-white mb-4">Attendance Sheet</h3>
                  <table className="w-full text-left text-[11px]">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-500">
                        <th className="pb-2">Student Name</th>
                        <th className="pb-2">Monday (Jul 6)</th>
                        <th className="pb-2">Wednesday (Jul 8)</th>
                        <th className="pb-2">Friday (Jul 10)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40">
                      {[
                        { name: 'Emma Johnson', mon: 'Present', wed: 'Present', fri: 'Present' },
                        { name: 'Lucas Rivera', mon: 'Present', wed: 'Absent', fri: 'Present' },
                        { name: 'Sophia Patel', mon: 'Present', wed: 'Present', fri: 'Present' },
                        { name: 'Alex Morrison', mon: 'Excused', wed: 'Present', fri: 'Absent' },
                      ].map((att, i) => (
                        <tr key={i} className="text-slate-300">
                          <td className="py-2.5 font-medium text-white">{att.name}</td>
                          <td>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${att.mon === 'Present' ? 'bg-emerald-500/10 text-emerald-400' : att.mon === 'Absent' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'}`}>
                              {att.mon}
                            </span>
                          </td>
                          <td>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${att.wed === 'Present' ? 'bg-emerald-500/10 text-emerald-400' : att.wed === 'Absent' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'}`}>
                              {att.wed}
                            </span>
                          </td>
                          <td>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${att.fri === 'Present' ? 'bg-emerald-500/10 text-emerald-400' : att.fri === 'Absent' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'}`}>
                              {att.fri}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeWorkspaceTab === 'announcements' && (
                <div className="p-5 rounded-2xl border" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
                  <h3 className="text-[14px] font-bold text-white mb-4">Class Announcements Board</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-xl" style={{ borderColor: '#1C2D42' }}>
                      <p className="text-[13px] font-bold text-white">Quantum mechanics workbook download is live</p>
                      <p className="text-[11px] text-slate-400 mt-1">Please download the chapter workbook from resources area, complete equations 1-5, and bring it to Monday class.</p>
                      <span className="text-[9px] text-slate-500 mt-2 block">Published by Sarah Chen • 2 days ago</span>
                    </div>
                  </div>
                </div>
              )}

              {activeWorkspaceTab === 'chat' && (
                <div className="p-5 rounded-2xl border flex flex-col h-[400px]" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
                  <div className="flex-1 overflow-y-auto space-y-3.5 pr-2">
                    <div className="p-3 rounded-xl max-w-[80%] border" style={{ background: 'rgba(255,255,255,0.01)', borderColor: '#1C2D42' }}>
                      <p className="text-[10px] text-blue-400 font-bold mb-0.5">Emma Johnson</p>
                      <p className="text-[11px] text-slate-300">Miss Chen, is the midterm paper multiple choice or written equation solving?</p>
                    </div>
                    <div className="p-3 rounded-xl max-w-[80%] border ml-auto" style={{ background: 'rgba(59,130,246,0.1)', borderColor: 'rgba(59,130,246,0.2)' }}>
                      <p className="text-[10px] text-cyan-400 font-bold mb-0.5">Sarah Chen (You)</p>
                      <p className="text-[11px] text-slate-300">It is 40% multiple choice definitions and 60% written formula solving problems. Make sure to study the lecture notebooks.</p>
                    </div>
                  </div>

                  <div className="flex gap-2.5 pt-3 border-t border-slate-800">
                    <input
                      type="text"
                      placeholder="Type class-wide message..."
                      className="flex-1 bg-white/5 border border-slate-800 rounded-xl text-[11px] px-3 py-2 text-white focus:outline-none"
                    />
                    <button className="px-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center transition-colors">
                      <Send size={13} />
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Class Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border p-6 animate-fade-in"
            style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
            <h2 className="text-[16px] font-bold text-white mb-1">Create New Class Group</h2>
            <p className="text-[11px] text-slate-500 mb-4">Set up a secure study container where you can coordinate assignments, files, and chats.</p>
            
            <form onSubmit={handleCreateClass} className="space-y-4">
              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1">Class Grade & Section</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grade 11C"
                  value={newClassName}
                  onChange={e => setNewClassName(e.target.value)}
                  className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1">Subject & Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced Physics & Calculus"
                  value={newClassSubject}
                  onChange={e => setNewClassSubject(e.target.value)}
                  className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
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
                  Create Class Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
