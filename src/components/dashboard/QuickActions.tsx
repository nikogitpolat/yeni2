import { Plus, ClipboardList, Video, Upload, MessageSquare, BookOpenCheck } from 'lucide-react';

const actions = [
  {
    icon: Plus,
    label: 'New Assignment',
    sublabel: 'Create & assign',
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.1)',
    hoverBg: 'rgba(59,130,246,0.18)',
    border: 'rgba(59,130,246,0.2)',
  },
  {
    icon: ClipboardList,
    label: 'Take Attendance',
    sublabel: 'Mark today',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.1)',
    hoverBg: 'rgba(16,185,129,0.18)',
    border: 'rgba(16,185,129,0.2)',
  },
  {
    icon: Upload,
    label: 'Upload Material',
    sublabel: 'Share with class',
    color: '#06B6D4',
    bg: 'rgba(6,182,212,0.1)',
    hoverBg: 'rgba(6,182,212,0.18)',
    border: 'rgba(6,182,212,0.2)',
  },
  {
    icon: MessageSquare,
    label: 'Message Class',
    sublabel: 'Announcement',
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.1)',
    hoverBg: 'rgba(245,158,11,0.18)',
    border: 'rgba(245,158,11,0.2)',
  },
  {
    icon: Video,
    label: 'Start Live Lesson',
    sublabel: 'Instant session',
    color: '#EF4444',
    bg: 'rgba(239,68,68,0.1)',
    hoverBg: 'rgba(239,68,68,0.18)',
    border: 'rgba(239,68,68,0.2)',
  },
  {
    icon: BookOpenCheck,
    label: 'Create Exam',
    sublabel: 'Quiz or test',
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.1)',
    hoverBg: 'rgba(139,92,246,0.18)',
    border: 'rgba(139,92,246,0.2)',
  },
];

export default function QuickActions() {
  return (
    <div className="card-hover rounded-2xl p-5 anim-init animate-fade-up delay-400"
      style={{ background: '#0D1220', animationFillMode: 'forwards' }}>
      
      <h3 className="text-[14px] font-semibold text-white mb-1">Quick Actions</h3>
      <p className="text-[11px] text-slate-500 mb-4">Common teaching tasks</p>

      <div className="grid grid-cols-2 gap-2.5">
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <button key={i}
              className="flex flex-col items-start gap-2 p-3.5 rounded-xl transition-all duration-200 text-left group hover:scale-[1.02]"
              style={{
                background: action.bg,
                border: `1px solid ${action.border}`,
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = action.hoverBg}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = action.bg}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${action.color}20`, color: action.color }}>
                <Icon size={16} />
              </div>
              <div>
                <p className="text-[12px] font-semibold text-slate-200 leading-tight">{action.label}</p>
                <p className="text-[10px] mt-0.5" style={{ color: action.color, opacity: 0.8 }}>{action.sublabel}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
