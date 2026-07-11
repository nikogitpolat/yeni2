import { useState } from 'react';
import { 
  Bell, Check, Trash2, BookOpen, MessageSquare, 
  CheckCircle2, Play 
} from 'lucide-react';

interface AlertNotification {
  id: string;
  title: string;
  desc: string;
  type: 'assignment' | 'message' | 'system' | 'announcement';
  time: string;
  read: boolean;
}

const initialNotifications: AlertNotification[] = [
  { id: 'n-1', title: 'New Homework Uploaded', desc: 'Emma Johnson has submitted: Electromagnetic Field Theory Problem Set.', type: 'assignment', time: '5 minutes ago', read: false },
  { id: 'n-2', title: 'Message from Sophia Patel', desc: '“Can we schedule a 10-minute help call?”', type: 'message', time: '1 hour ago', read: false },
  { id: 'n-3', title: 'System Security Update', desc: 'Academic backup successfully compiled to secure cloud nodes.', type: 'system', time: 'Yesterday', read: true },
];

export default function NotificationsPage() {
  const [alerts, setAlerts] = useState<AlertNotification[]>(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleMarkAllRead = () => {
    setAlerts(alerts.map(a => ({ ...a, read: true })));
    showToast('All notifications marked as read.');
  };

  const handleDelete = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
    showToast('Notification deleted.');
  };

  const handleSimulateAlert = () => {
    const simulationPool: AlertNotification[] = [
      { id: `sim-${Date.now()}-1`, title: 'Assignment Submission Received', desc: 'Lucas Rivera submitted: Quantum Wavefunctions Essay.', type: 'assignment', time: 'Just now', read: false },
      { id: `sim-${Date.now()}-2`, title: 'New Group Message', desc: 'Sophia Patel posted: “I uploaded the formulas slides”', type: 'message', time: 'Just now', read: false },
      { id: `sim-${Date.now()}-3`, title: 'Announcement Broadcast Successful', desc: 'Your bulletin is successfully pinned in 11C Physics.', type: 'announcement', time: 'Just now', read: false },
    ];

    const randomAlert = simulationPool[Math.floor(Math.random() * simulationPool.length)];
    setAlerts([randomAlert, ...alerts]);
    showToast('Simulated notification triggered!');
  };

  const filteredAlerts = alerts.filter(a => filter === 'all' ? true : !a.read);

  return (
    <div className="flex-1 flex flex-col overflow-hidden h-full">
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-xl shadow-2xl text-[13px] font-medium border border-blue-400 animate-fade-in">
          <CheckCircle2 size={15} />
          {toast}
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-[800px] mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[22px] font-bold text-white tracking-tight">System Alerts</h1>
              <p className="text-[12px] text-slate-500 mt-0.5 font-normal">Stay up to date with homework submissions, student chat requests, and school announcements.</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSimulateAlert}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600/15 border border-blue-500/10 text-blue-400 text-[11px] font-bold hover:bg-blue-600/25 transition-all">
                <Play size={12} fill="currentColor" /> Simulate Alert
              </button>
              
              <button
                onClick={handleMarkAllRead}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-800 text-slate-400 text-[11px] font-bold hover:text-white transition-all">
                <Check size={13} /> Mark All Read
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-[12px] font-semibold transition-all ${filter === 'all' ? 'text-blue-400 border-b-2 border-blue-500' : 'text-slate-500'}`}>
              All Notifications ({alerts.length})
            </button>
            <button 
              onClick={() => setFilter('unread')}
              className={`px-3 py-1.5 text-[12px] font-semibold transition-all ${filter === 'unread' ? 'text-blue-400 border-b-2 border-blue-500' : 'text-slate-500'}`}>
              Unread ({alerts.filter(a => !a.read).length})
            </button>
          </div>

          {/* Alert Stream Feed */}
          <div className="space-y-3.5">
            {filteredAlerts.length === 0 ? (
              <div className="text-center py-16 border rounded-2xl border-dashed" style={{ borderColor: '#1C2D42', background: '#0D1220' }}>
                <Bell size={24} className="text-slate-600 mx-auto mb-2.5 animate-bounce" />
                <p className="text-[13px] text-slate-400 font-medium">All caught up!</p>
                <p className="text-[11px] text-slate-600 mt-1">No unread alerts in your student tracking streams.</p>
              </div>
            ) : (
              filteredAlerts.map(alert => (
                <div 
                  key={alert.id} 
                  onClick={() => setAlerts(alerts.map(a => a.id === alert.id ? { ...a, read: true } : a))}
                  className="p-4 rounded-xl border flex items-center justify-between gap-4 cursor-pointer transition-all hover:bg-white/2"
                  style={{ 
                    background: alert.read ? '#0D1220' : 'rgba(59,130,246,0.03)', 
                    borderColor: alert.read ? '#1C2D42' : '#3B82F635' 
                  }}>
                  
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      alert.type === 'assignment' ? 'bg-emerald-500/10 text-emerald-400' :
                      alert.type === 'message' ? 'bg-blue-500/10 text-blue-400' :
                      alert.type === 'announcement' ? 'bg-purple-500/10 text-purple-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {alert.type === 'assignment' ? <BookOpen size={14} /> :
                       alert.type === 'message' ? <MessageSquare size={14} /> : <Bell size={14} />}
                    </div>

                    <div className="space-y-1">
                      <p className={`text-[12.5px] font-semibold text-white truncate ${alert.read ? '' : 'font-bold'}`}>{alert.title}</p>
                      <p className="text-[11px] text-slate-400 leading-relaxed truncate max-w-lg">{alert.desc}</p>
                      <p className="text-[9.5px] text-slate-600 font-semibold">{alert.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!alert.read && (
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                    )}
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDelete(alert.id); }}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors">
                      <Trash2 size={12} />
                    </button>
                  </div>

                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
