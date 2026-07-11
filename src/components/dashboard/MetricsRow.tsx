import { useEffect, useRef } from 'react';
import { Users, BookOpen, ClipboardList, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Metric {
  label: string;
  value: string;
  subtext: string;
  trend: number;
  trendLabel: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
}

const metrics: Metric[] = [
  {
    label: 'Active Students',
    value: '128',
    subtext: 'Across 6 classes',
    trend: 4.2,
    trendLabel: 'vs last month',
    icon: <Users size={18} />,
    color: '#3B82F6',
    glowColor: 'rgba(59,130,246,0.15)',
  },
  {
    label: "Today's Lessons",
    value: '3',
    subtext: '2 remaining today',
    trend: 0,
    trendLabel: 'On schedule',
    icon: <BookOpen size={18} />,
    color: '#06B6D4',
    glowColor: 'rgba(6,182,212,0.15)',
  },
  {
    label: 'Pending Reviews',
    value: '12',
    subtext: '8 assignments, 4 exams',
    trend: -18.5,
    trendLabel: 'vs last week',
    icon: <ClipboardList size={18} />,
    color: '#F59E0B',
    glowColor: 'rgba(245,158,11,0.15)',
  },
  {
    label: 'Class Average',
    value: '84.6%',
    subtext: 'Across all subjects',
    trend: 2.8,
    trendLabel: 'vs last term',
    icon: <TrendingUp size={18} />,
    color: '#10B981',
    glowColor: 'rgba(16,185,129,0.15)',
  },
];

function AnimatedCounter({ target }: { target: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const numericPart = parseFloat(target.replace(/[^0-9.]/g, ''));
  const suffix = target.replace(/[0-9.]/g, '');

  useEffect(() => {
    const el = ref.current;
    if (!el || isNaN(numericPart)) return;
    const duration = 1200;
    const startTime = performance.now();
    const isDecimal = target.includes('.');

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * numericPart;
      el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current).toString()) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [numericPart, suffix, target]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function MetricsRow() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {metrics.map((metric, i) => (
        <div
          key={metric.label}
          className="card-hover rounded-2xl p-5 anim-init animate-fade-up cursor-default"
          style={{
            background: '#0D1220',
            animationDelay: `${i * 80}ms`,
            animationFillMode: 'forwards',
          }}
        >
          {/* Icon + trend */}
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: metric.glowColor, color: metric.color }}>
              {metric.icon}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-medium"
              style={{ color: metric.trend > 0 ? '#10B981' : metric.trend < 0 ? '#F43F5E' : '#64748B' }}>
              {metric.trend > 0 && <ArrowUpRight size={12} />}
              {metric.trend < 0 && <ArrowDownRight size={12} />}
              <span>
                {metric.trend !== 0 ? `${Math.abs(metric.trend)}%` : metric.trendLabel}
              </span>
            </div>
          </div>

          {/* Value */}
          <div className="text-[28px] font-bold text-white leading-none mb-1 tracking-tight">
            <AnimatedCounter target={metric.value} />
          </div>

          {/* Label */}
          <p className="text-[12px] font-semibold text-slate-400 mt-1">{metric.label}</p>
          <p className="text-[11px] text-slate-600 mt-0.5">{metric.subtext}</p>

          {/* Bottom accent bar */}
          <div className="mt-4 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <div className="h-full rounded-full transition-all duration-1000"
              style={{ background: metric.color, width: '70%' }} />
          </div>
        </div>
      ))}
    </div>
  );
}
