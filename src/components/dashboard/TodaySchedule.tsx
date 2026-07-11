import { Users, Video, ChevronRight, Play, Circle } from 'lucide-react';

interface Lesson {
  time: string;
  endTime: string;
  subject: string;
  group: string;
  students: number;
  type: 'live' | 'upcoming' | 'completed';
  color: string;
}

const lessons: Lesson[] = [
  {
    time: '09:00',
    endTime: '10:30',
    subject: 'Mathematics',
    group: 'Grade 9A',
    students: 24,
    type: 'live',
    color: '#3B82F6',
  },
  {
    time: '11:00',
    endTime: '12:30',
    subject: 'Physics Fundamentals',
    group: 'Grade 10B',
    students: 21,
    type: 'upcoming',
    color: '#06B6D4',
  },
  {
    time: '14:00',
    endTime: '15:30',
    subject: 'Advanced Calculus',
    group: 'Grade 11C',
    students: 18,
    type: 'upcoming',
    color: '#8B5CF6',
  },
];

const completedToday: Lesson = {
  time: '07:30',
  endTime: '08:30',
  subject: 'Physics Lab Review',
  group: 'Grade 10A',
  students: 22,
  type: 'completed',
  color: '#10B981',
};

export default function TodaySchedule() {
  const allLessons = [completedToday, ...lessons];

  return (
    <div className="card-hover rounded-2xl p-5 anim-init animate-fade-up delay-200"
      style={{ background: '#0D1220', animationFillMode: 'forwards' }}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-[14px] font-semibold text-white">Today's Schedule</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Friday, July 11 · 4 lessons</p>
        </div>
        <button className="text-[11px] font-medium text-blue-400 flex items-center gap-1 hover:text-blue-300 transition-colors">
          Full calendar <ChevronRight size={12} />
        </button>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[38px] top-4 bottom-4 w-px" style={{ background: 'rgba(30,45,66,0.8)' }} />

        <div className="space-y-3">
          {allLessons.map((lesson, i) => (
            <div key={i}
              className="flex gap-4 group cursor-pointer anim-init animate-fade-up"
              style={{ animationDelay: `${250 + i * 70}ms`, animationFillMode: 'forwards' }}>
              
              {/* Time + dot */}
              <div className="flex-shrink-0 w-[76px] flex flex-col items-end gap-0.5 pt-1">
                <span className="text-[11px] font-semibold"
                  style={{ color: lesson.type === 'completed' ? '#475569' : '#94A3B8' }}>
                  {lesson.time}
                </span>
                <span className="text-[9px]"
                  style={{ color: '#334155' }}>
                  {lesson.endTime}
                </span>
              </div>

              {/* Dot on timeline */}
              <div className="flex-shrink-0 flex flex-col items-center" style={{ width: '2px' }}>
                <div className="w-3 h-3 rounded-full mt-1.5 relative flex-shrink-0"
                  style={{
                    background: lesson.type === 'completed' ? '#1C2D42' : lesson.color,
                    border: `2px solid ${lesson.type === 'completed' ? '#243A52' : lesson.color}`,
                    boxShadow: lesson.type === 'live' ? `0 0 8px ${lesson.color}` : 'none',
                  }}>
                  {lesson.type === 'live' && (
                    <span className="absolute inset-0 rounded-full animate-ping"
                      style={{ background: lesson.color, opacity: 0.4 }} />
                  )}
                </div>
              </div>

              {/* Card */}
              <div className="flex-1 rounded-xl px-4 py-3 transition-all duration-200"
                style={{
                  background: lesson.type === 'live'
                    ? `rgba(59,130,246,0.08)`
                    : lesson.type === 'completed'
                    ? 'rgba(255,255,255,0.02)'
                    : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${lesson.type === 'live' ? 'rgba(59,130,246,0.2)' : '#1C2D42'}`,
                  opacity: lesson.type === 'completed' ? 0.5 : 1,
                }}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[13px] font-semibold"
                        style={{ color: lesson.type === 'completed' ? '#64748B' : '#E2E8F0' }}>
                        {lesson.subject}
                      </p>
                      {lesson.type === 'live' && (
                        <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(239,68,68,0.15)', color: '#EF4444' }}>
                          <span className="live-dot w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                          LIVE
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[11px] text-slate-500">{lesson.group}</span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-600">
                        <Users size={10} /> {lesson.students} students
                      </span>
                    </div>
                  </div>
                  {lesson.type === 'live' && (
                    <button className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105"
                      style={{ background: 'rgba(59,130,246,0.2)', color: '#60A5FA' }}>
                      <Video size={11} /> Join
                    </button>
                  )}
                  {lesson.type === 'upcoming' && (
                    <button className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-lg transition-all duration-200 hover:opacity-80"
                      style={{ background: 'rgba(255,255,255,0.04)', color: '#64748B', border: '1px solid #1C2D42' }}>
                      <Play size={10} /> Start
                    </button>
                  )}
                  {lesson.type === 'completed' && (
                    <span className="flex items-center gap-1 text-[10px] font-medium"
                      style={{ color: '#10B981' }}>
                      <Circle size={8} fill="#10B981" /> Done
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
