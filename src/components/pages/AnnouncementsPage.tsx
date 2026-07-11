import { useState } from 'react';
import { 
  Megaphone, Plus, Search, Pin, CheckCircle2, 
  Trash2, Users, Clock, Paperclip
} from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  classGroup: string;
  date: string;
  isPinned: boolean;
  readsCount: number;
  totalStudents: number;
  attachmentName?: string;
}

const initialAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Midterm Physics Syllabus Released',
    content: 'The syllabus for our Midterm is now finalized. Please prepare all modules from chapter 1 to 5. We have uploaded slides regarding quantum states to the materials folder. Good luck studying!',
    classGroup: 'Grade 11C Physics',
    date: 'Today, 10:15 AM',
    isPinned: true,
    readsCount: 21,
    totalStudents: 24,
    attachmentName: 'Midterm_Syllabus_Phase1.pdf'
  },
  {
    id: 'ann-2',
    title: 'Tuesday Live Lecture Shifted to 2 PM',
    content: 'Please note that the regular Tuesday morning live stream is shifted to 2 PM to accommodate university exam testing. The session will be recorded for students who cannot attend.',
    classGroup: 'Grade 11C Physics',
    date: 'Yesterday, 4:30 PM',
    isPinned: false,
    readsCount: 18,
    totalStudents: 24,
  },
  {
    id: 'ann-3',
    title: 'Welcome to Advanced Math Grade 10B!',
    content: 'I am excited to kickstart our study journey. Please ensure you have downloaded the online geometric simulation software before our Friday lecture.',
    classGroup: 'Grade 10B Math',
    date: 'July 05, 2026',
    isPinned: false,
    readsCount: 18,
    totalStudents: 18,
  }
];

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Creation States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newClass, setNewClass] = useState('Grade 11C Physics');
  const [newPin, setNewPin] = useState(false);
  const [newAttachment, setNewAttachment] = useState('');

  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;
    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title: newTitle,
      content: newContent,
      classGroup: newClass,
      date: 'Just now',
      isPinned: newPin,
      readsCount: 0,
      totalStudents: newClass.includes('11C') ? 24 : 18,
      attachmentName: newAttachment ? newAttachment : undefined
    };
    setAnnouncements([newAnn, ...announcements]);
    setShowCreateModal(false);
    setNewTitle('');
    setNewContent('');
    setNewPin(false);
    setNewAttachment('');
    showToast(`Announcement broadcasted to ${newClass}!`);
  };

  const handleTogglePin = (id: string) => {
    setAnnouncements(announcements.map(a => a.id === id ? { ...a, isPinned: !a.isPinned } : a));
    const ann = announcements.find(a => a.id === id);
    showToast(ann?.isPinned ? 'Announcement unpinned.' : 'Announcement pinned to top!');
  };

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
    showToast('Announcement removed.');
  };

  const filteredAnnouncements = announcements.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.content.toLowerCase().includes(searchQuery.toLowerCase())
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
        <div className="max-w-[1000px] mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[22px] font-bold text-white tracking-tight">Class Announcements</h1>
              <p className="text-[12px] text-slate-500 mt-0.5">Publish important notices, pin exams guidelines, and monitor student read receipts.</p>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all duration-200 hover:opacity-95"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #06B6D4)' }}>
              <Plus size={15} />
              New Announcement
            </button>
          </div>

          {/* Search bar */}
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-2xl border" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
            <Search size={14} className="text-slate-500" />
            <input
              type="text"
              placeholder="Search announcements content..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent text-white text-[12px] placeholder-slate-600 focus:outline-none w-full"
            />
          </div>

          {/* Bulletins Feed */}
          <div className="space-y-4">
            {filteredAnnouncements.length === 0 ? (
              <div className="text-center py-16 border rounded-2xl border-dashed" style={{ borderColor: '#1C2D42', background: '#080C14' }}>
                <Megaphone size={22} className="text-slate-600 mx-auto mb-2" />
                <p className="text-[13px] text-slate-400 font-medium">No announcements found</p>
                <p className="text-[11px] text-slate-600 mt-0.5 font-normal">Broadcast bulletins to student streams to share notes.</p>
              </div>
            ) : (
              // Pinned first, then remaining
              [...filteredAnnouncements].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0)).map(ann => (
                <div key={ann.id} className="p-5 rounded-2xl border transition-all relative overflow-hidden" 
                  style={{ 
                    background: ann.isPinned ? 'rgba(59,130,246,0.03)' : '#0D1220', 
                    borderColor: ann.isPinned ? '#3B82F640' : '#1C2D42' 
                  }}>
                  
                  {ann.isPinned && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-blue-500" />
                  )}

                  <div className="flex items-start justify-between mb-3.5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                          {ann.classGroup}
                        </span>
                        
                        {ann.isPinned && (
                          <span className="flex items-center gap-1 text-[9px] font-bold text-blue-400">
                            <Pin size={10} fill="#60A5FA" /> PINNED ANNOUNCEMENT
                          </span>
                        )}
                      </div>
                      <h3 className="text-[14.5px] font-bold text-white tracking-tight mt-1">{ann.title}</h3>
                    </div>

                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => handleTogglePin(ann.id)}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5 ${ann.isPinned ? 'text-blue-400' : 'text-slate-500'}`}>
                        <Pin size={13} />
                      </button>
                      <button 
                        onClick={() => handleDelete(ann.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  <p className="text-[11.5px] text-slate-400 leading-relaxed font-normal">{ann.content}</p>

                  {/* Attachment card */}
                  {ann.attachmentName && (
                    <div className="mt-3.5 flex items-center gap-2 p-2.5 rounded-xl border border-dashed border-slate-800 bg-white/2 max-w-sm">
                      <Paperclip size={12} className="text-blue-400" />
                      <span className="text-[10.5px] text-slate-300 font-semibold truncate">{ann.attachmentName}</span>
                    </div>
                  )}

                  {/* Footer status stats */}
                  <div className="flex items-center justify-between mt-5 border-t border-slate-800/60 pt-3 text-[10px] text-slate-500">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Clock size={11} /> Published: {ann.date}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Users size={11} /> Read rate: {ann.readsCount} / {ann.totalStudents}</span>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>

        </div>
      </div>

      {/* Create Announcement Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border p-6 animate-fade-in"
            style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
            <h2 className="text-[16px] font-bold text-white mb-1">New Announcement</h2>
            <p className="text-[11px] text-slate-500 mb-4">Compose messages to broadcast to classroom streams. Pinned bulletins appear at the top.</p>
            
            <form onSubmit={handleCreateAnnouncement} className="space-y-4">
              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1">Target Classroom Stream</label>
                <select
                  value={newClass}
                  onChange={e => setNewClass(e.target.value)}
                  className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none">
                  <option value="Grade 11C Physics">Grade 11C Physics</option>
                  <option value="Grade 10B Math">Grade 10B Math</option>
                  <option value="Grade 9A Calculus">Grade 9A Calculus</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1">Announcement Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rescheduled Lab Assignment Deadline"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1">Message Content</label>
                <textarea
                  required
                  placeholder="Write clear instructions regarding deadlines, slides, simulator updates..."
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  rows={4}
                  className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1">Attach File Link (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Lecture_Slides_V2.pdf"
                  value={newAttachment}
                  onChange={e => setNewAttachment(e.target.value)}
                  className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pin"
                  checked={newPin}
                  onChange={e => setNewPin(e.target.checked)}
                  className="w-4 h-4 accent-blue-500 rounded border-slate-800"
                />
                <label htmlFor="pin" className="text-[11px] text-slate-300 font-medium cursor-pointer">Pin to stream top</label>
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
                  Publish Bulletin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
