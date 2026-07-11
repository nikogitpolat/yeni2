import { useState } from 'react';
import { 
  User, Shield, Bell, Database, CheckCircle2 
} from 'lucide-react';

export default function SettingsPage() {
  const [name, setName] = useState('Sarah Chen');
  const [email, setEmail] = useState('sarah.chen@academy.edu');
  const [role, setRole] = useState('Senior Physics Professor');
  
  // Settings switches
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
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
        <div className="max-w-[900px] mx-auto space-y-6">
          
          {/* Header */}
          <div>
            <h1 className="text-[22px] font-bold text-white tracking-tight">System Settings</h1>
            <p className="text-[12px] text-slate-500 mt-0.5">Configure classroom streams, personal profile info, and system backups.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left selector menu links */}
            <div className="space-y-1.5 md:col-span-1">
              {[
                { id: 'profile', label: 'User Profile', icon: User },
                { id: 'alerts', label: 'Notification Slots', icon: Bell },
                { id: 'security', label: 'Security & Integrity', icon: Shield },
                { id: 'backup', label: 'Academic Backup', icon: Database },
              ].map(item => (
                <button
                  key={item.id}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[12px] font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all text-left">
                  <item.icon size={13} />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right configuration sheet */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Profile Card */}
              <div className="p-5 rounded-2xl border space-y-4" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
                <h3 className="text-[13px] font-bold text-white uppercase tracking-wider">Academic Profile</h3>
                
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] text-slate-400 font-medium mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 font-medium mb-1.5">Academic Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 font-medium mb-1.5">Teaching Faculty Title</label>
                    <input
                      type="text"
                      value={role}
                      onChange={e => setRole(e.target.value)}
                      className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={() => triggerToast('Profile details updated successfully!')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[11px] font-bold transition-colors">
                  Save Changes
                </button>
              </div>

              {/* Preferences switches */}
              <div className="p-5 rounded-2xl border space-y-4.5" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
                <h3 className="text-[13px] font-bold text-white uppercase tracking-wider">Alert Slots</h3>
                
                <div className="space-y-4">
                  {[
                    { label: 'Weekly Grade Digests', desc: 'Get automated weekly performance summaries regarding class results.', val: weeklyDigest, setter: setWeeklyDigest },
                    { label: 'Homework Submission Upload Notifications', desc: 'Receive real-time alerts whenever student attachments are uploaded.', val: emailAlerts, setter: setEmailAlerts },
                    { label: 'Student Chat Notifications', desc: 'Get instant push updates for incoming text messages.', val: pushAlerts, setter: setPushAlerts }
                  ].map((sw, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-4">
                      <div className="space-y-0.5">
                        <p className="text-[12px] font-bold text-white">{sw.label}</p>
                        <p className="text-[10px] text-slate-500 leading-relaxed">{sw.desc}</p>
                      </div>

                      <button
                        onClick={() => sw.setter(!sw.val)}
                        className={`w-9 h-5 rounded-full p-0.5 transition-colors focus:outline-none ${sw.val ? 'bg-blue-600' : 'bg-slate-800'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full transition-all ${sw.val ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
