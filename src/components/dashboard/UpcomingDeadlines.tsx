import { FileText, BookOpen, Award, AlertCircle, ChevronRight, Calendar } from 'lucide-react';

interface Deadline {
  title: string;
  type: 'assignment' | 'exam' | 'material' | 'review';
  group: string;
  dueDate: string;
  dueLabel: string;
  urgency: 'overdue' | 'today' | 'tomorrow' | 'upcoming';
  count?: number;
}

const deadlines: Deadline[] = [
  {
    title: 'Grade Physics Mid-Term',
    type: 'exam',
    group: 'Grade 10B',
    dueDate: 'Jul 11',
    dueLabel: 'Due today',
    urgency: 'today',
    count: 21,
  },
  {
    title: 'Review Newton\'s Laws Lab',
    type: 'assignment',
    group: 'Grade 10A',
    dueDate: 'Jul 11',
    dueLabel: 'Due today',
    urgency: 'today',
    count: 3,
  },
  {
    title: 'Upload Chapter 8 Notes',
    type: 'material',
    group: 'Grade 11C',
    dueDate: 'Jul 12',
    dueLabel: 'Tomorrow',
    urgency: 'tomorrow',
  },
  {
    title: 'Advanced Calculus Quiz',
    type: 'exam',
    group: 'Grade 11C',
    dueDate: 'Jul 14',
    dueLabel: 'In 3 days',
    urgency: 'upcoming',
  },
  {
    title: 'Algebra Assignment #5',
    type: 'assignment',
    group: 'Grade 9A',
    dueDate: 'Jul 16',
    dueLabel: 'In 5 days',
    urgency: 'upcoming',
  },
];

const typeIcons = {
  assignment: FileText,
  exam: Award,
  material: BookOpen,
  review: AlertCircle,
};

const urgencyConfig = {
  overdue: { color: '#EF4444', bg: 'rgba(239,68,68,0.12)', label: 'Overdue' },
  today: { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', label: 'Today' },
  tomorrow: { color: '#3B82F6', bg: 'rgba(59,130,246,0.12)', label: 'Tomorrow' },
  upcoming: { color: '#475569', bg: 'rgba(71,85,105,0.12)', label: '' },
};

export default function UpcomingDeadlines() {
  return (
    <div className="card-hover rounded-2xl p-5 anim-init animate-fade-up delay-600"
      style={{ background: '#0D1220', animationFillMode: 'forwards' }}>
      
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[14px] font-semibold text-white">Upcoming Deadlines</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">2 items due today</p>
        </div>
        <button className="text-[11px] font-medium text-blue-400 flex items-center gap-1 hover:text-blue-300 transition-colors">
          Calendar <ChevronRight size={12} />
        </button>
      </div>

      <div className="space-y-2">
        {deadlines.map((item, i) => {
          const Icon = typeIcons[item.type];
          const urgency = urgencyConfig[item.urgency];
          return (
            <div key={i}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group"
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: urgency.bg, color: urgency.color }}>
                <Icon size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-slate-300 truncate">{item.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-slate-600">{item.group}</span>
                  {item.count && (
                    <span className="text-[10px] text-slate-700">· {item.count} to review</span>
                  )}
                </div>
              </div>
              <div className="flex-shrink-0 text-right">
                <span className="block text-[11px] font-semibold" style={{ color: urgency.color }}>
                  {item.dueLabel}
                </span>
                <span className="block text-[10px] text-slate-600">{item.dueDate}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Calendar mini-preview hint */}
      <div className="mt-4 pt-3 flex items-center justify-between" style={{ borderTop: '1px solid #1C2D42' }}>
        <div className="flex items-center gap-2">
          <Calendar size={12} style={{ color: '#3B82F6' }} />
          <span className="text-[11px] text-slate-500">Next: Physics class in 45 min</span>
        </div>
        <button className="text-[11px] font-medium text-blue-400 hover:text-blue-300 transition-colors">
          View
        </button>
      </div>
    </div>
  );
}
