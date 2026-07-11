import { useEffect, useRef, useState } from 'react';
import { TrendingUp, TrendingDown, Minus, ChevronRight } from 'lucide-react';

interface Student {
  name: string;
  avatar: string;
  group: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
  subjects: { name: string; score: number; color: string }[];
}

const students: Student[] = [
  {
    name: 'Emma Johnson',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
    group: 'Grade 11C',
    score: 94,
    trend: 'up',
    change: 23,
    subjects: [
      { name: 'Math', score: 96, color: '#3B82F6' },
      { name: 'Physics', score: 91, color: '#06B6D4' },
      { name: 'Calculus', score: 95, color: '#8B5CF6' },
    ],
  },
  {
    name: 'Lucas Rivera',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
    group: 'Grade 10B',
    score: 88,
    trend: 'up',
    change: 8,
    subjects: [
      { name: 'Math', score: 85, color: '#3B82F6' },
      { name: 'Physics', score: 90, color: '#06B6D4' },
      { name: 'Calculus', score: 89, color: '#8B5CF6' },
    ],
  },
  {
    name: 'Sophia Patel',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
    group: 'Grade 9A',
    score: 82,
    trend: 'stable',
    change: 1,
    subjects: [
      { name: 'Math', score: 84, color: '#3B82F6' },
      { name: 'Physics', score: 78, color: '#06B6D4' },
      { name: 'Calculus', score: 84, color: '#8B5CF6' },
    ],
  },
  {
    name: 'Alex Morrison',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
    group: 'Grade 9A',
    score: 61,
    trend: 'down',
    change: -14,
    subjects: [
      { name: 'Math', score: 58, color: '#3B82F6' },
      { name: 'Physics', score: 64, color: '#06B6D4' },
      { name: 'Calculus', score: 61, color: '#8B5CF6' },
    ],
  },
];

function getScoreColor(score: number) {
  if (score >= 90) return '#10B981';
  if (score >= 75) return '#3B82F6';
  if (score >= 60) return '#F59E0B';
  return '#EF4444';
}

function ProgressBar({ value, color }: { value: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
      <div ref={ref}
        className="h-full rounded-full"
        style={{
          background: color,
          width: started ? `${value}%` : '0%',
          transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: `0 0 8px ${color}60`,
        }} />
    </div>
  );
}

export default function StudentPerformance() {
  return (
    <div className="card-hover rounded-2xl p-5 anim-init animate-fade-up delay-500"
      style={{ background: '#0D1220', animationFillMode: 'forwards' }}>
      
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-[14px] font-semibold text-white">Student Performance</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Top & at-risk students</p>
        </div>
        <button className="text-[11px] font-medium text-blue-400 flex items-center gap-1 hover:text-blue-300 transition-colors">
          All students <ChevronRight size={12} />
        </button>
      </div>

      <div className="space-y-4">
        {students.map((student, i) => {
          const scoreColor = getScoreColor(student.score);
          return (
            <div key={i}
              className="group cursor-pointer rounded-xl p-3 transition-all duration-200"
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-slate-200 truncate">{student.name}</p>
                  <p className="text-[10px] text-slate-500">{student.group}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[14px] font-bold" style={{ color: scoreColor }}>
                    {student.score}
                  </span>
                  <div className="flex items-center gap-0.5 text-[10px]"
                    style={{
                      color: student.trend === 'up' ? '#10B981' : student.trend === 'down' ? '#EF4444' : '#64748B'
                    }}>
                    {student.trend === 'up' && <TrendingUp size={11} />}
                    {student.trend === 'down' && <TrendingDown size={11} />}
                    {student.trend === 'stable' && <Minus size={11} />}
                    <span className="font-medium">
                      {student.trend !== 'stable' ? `${Math.abs(student.change)}%` : ''}
                    </span>
                  </div>
                </div>
              </div>

              {/* Subject bars */}
              <div className="space-y-1.5 pl-11">
                {student.subjects.map((subj, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <span className="text-[9px] text-slate-600 w-12 flex-shrink-0">{subj.name}</span>
                    <div className="flex-1">
                      <ProgressBar value={subj.score} color={scoreColor} />
                    </div>
                    <span className="text-[10px] font-medium w-7 text-right" style={{ color: '#64748B' }}>
                      {subj.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
