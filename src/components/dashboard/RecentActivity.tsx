import { Eye, CheckCircle2, MessageSquare, ChevronRight, Upload } from 'lucide-react';

interface Activity {
  type: 'submission' | 'view' | 'grade' | 'message';
  user: string;
  avatar: string;
  action: string;
  item: string;
  time: string;
  count?: number;
  unread?: boolean;
}

const activities: Activity[] = [
  {
    type: 'submission',
    user: 'Alex Morrison',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
    action: 'submitted',
    item: 'Quadratic Equations — HW #4',
    time: '10 min ago',
    unread: true,
  },
  {
    type: 'submission',
    user: 'Maria Santos',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
    action: 'submitted',
    item: "Newton's Laws — Lab Report",
    time: '1h ago',
    unread: true,
  },
  {
    type: 'view',
    user: '5 students',
    avatar: '',
    action: 'viewed',
    item: 'Calculus — Chapter 7 Notes',
    time: '2h ago',
    count: 5,
  },
  {
    type: 'message',
    user: 'Mrs. Johnson (Parent)',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
    action: 'sent a message about',
    item: "Emma's recent progress",
    time: '3h ago',
    unread: true,
  },
  {
    type: 'grade',
    user: 'James Park',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
    action: 'was graded',
    item: 'Physics Mid-Term · 91/100',
    time: 'Yesterday',
  },
];

const typeConfig = {
  submission: { icon: Upload, color: '#3B82F6', bg: 'rgba(59,130,246,0.12)' },
  view: { icon: Eye, color: '#06B6D4', bg: 'rgba(6,182,212,0.12)' },
  grade: { icon: CheckCircle2, color: '#10B981', bg: 'rgba(16,185,129,0.12)' },
  message: { icon: MessageSquare, color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
};

export default function RecentActivity() {
  return (
    <div className="card-hover rounded-2xl p-5 anim-init animate-fade-up delay-350"
      style={{ background: '#0D1220', animationFillMode: 'forwards' }}>
      
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[14px] font-semibold text-white">Recent Activity</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">3 new since your last visit</p>
        </div>
        <button className="text-[11px] font-medium text-blue-400 flex items-center gap-1 hover:text-blue-300 transition-colors">
          View all <ChevronRight size={12} />
        </button>
      </div>

      <div className="space-y-1">
        {activities.map((activity, i) => {
          const cfg = typeConfig[activity.type];
          const Icon = cfg.icon;
          return (
            <div key={i}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 relative group"
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
              
              {/* Unread dot */}
              {activity.unread && (
                <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
                  style={{ background: '#3B82F6' }} />
              )}

              {/* Avatar or icon */}
              {activity.avatar ? (
                <div className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden"
                  style={{ outline: '1px solid #1C2D42' }}>
                  <img src={activity.avatar} alt={activity.user} className="w-full h-full object-cover" style={{ borderRadius: '50%' }} />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ background: cfg.bg, color: cfg.color }}>
                  <Icon size={13} />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-[12px] text-slate-300 leading-tight">
                  <span className="font-semibold text-slate-200">{activity.user}</span>
                  {' '}{activity.action}{' '}
                  <span className="text-slate-400">{activity.item}</span>
                </p>
                <p className="text-[10px] text-slate-600 mt-0.5">{activity.time}</p>
              </div>

              {/* Type icon badge */}
              <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ background: cfg.bg, color: cfg.color }}>
                <Icon size={11} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
