import { Users, BookOpen, Upload, Sparkles, ArrowRight, Plus, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    icon: Users,
    label: 'Create your first class',
    description: 'Add a group and invite students to get started.',
    action: 'Create class',
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.1)',
    done: false,
  },
  {
    icon: BookOpen,
    label: 'Schedule a lesson',
    description: 'Set up a lesson time so students know when to show up.',
    action: 'Add lesson',
    color: '#06B6D4',
    bg: 'rgba(6,182,212,0.1)',
    done: false,
  },
  {
    icon: Upload,
    label: 'Upload study materials',
    description: 'Share notes, PDFs, and resources with your class.',
    action: 'Upload files',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.1)',
    done: false,
  },
];

interface EmptyDashboardProps {
  onGetStarted: () => void;
}

export default function EmptyDashboard({ onGetStarted }: EmptyDashboardProps) {
  return (
    <div className="min-h-full flex flex-col">
      
      {/* Welcome hero */}
      <div className="relative overflow-hidden rounded-2xl mb-6 p-8"
        style={{
          background: 'linear-gradient(135deg, #0D1220 0%, #111827 100%)',
          border: '1px solid #1C2D42',
        }}>
        
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-[0.04]"
            style={{ background: 'radial-gradient(circle, #3B82F6, transparent)' }} />
          <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full opacity-[0.03]"
            style={{ background: 'radial-gradient(circle, #06B6D4, transparent)' }} />
          {/* Grid dots */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }} />
        </div>

        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.2))', border: '1px solid rgba(6,182,212,0.2)' }}>
              <Sparkles size={20} style={{ color: '#22D3EE' }} />
            </div>
            <span className="text-[12px] font-medium px-3 py-1 rounded-full"
              style={{ background: 'rgba(6,182,212,0.1)', color: '#22D3EE', border: '1px solid rgba(6,182,212,0.2)' }}>
              Welcome to Studyfy
            </span>
          </div>

          <h1 className="text-3xl font-bold text-white leading-tight mb-3">
            Your AI-powered classroom<br />
            <span className="gradient-text">starts here.</span>
          </h1>
          <p className="text-[14px] text-slate-400 leading-relaxed mb-6 max-w-md">
            Studyfy replaces the chaos of juggling multiple tools. Manage lessons, students, assignments, and communication — all in one intelligent space.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onGetStarted}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 hover:scale-[1.03] hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #06B6D4)', color: 'white', boxShadow: '0 4px 20px rgba(59,130,246,0.3)' }}>
              <Plus size={15} /> Create your first class
            </button>
            <button
              onClick={onGetStarted}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 hover:bg-white/5"
              style={{ color: '#94A3B8', border: '1px solid #1C2D42' }}>
              Explore demo <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Setup steps */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[14px] font-semibold text-slate-300">Get started in 3 steps</h2>
          <span className="text-[11px] text-slate-500">0 of 3 complete</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i}
                className="rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:scale-[1.02] group"
                style={{ background: '#0D1220', border: '1px solid #1C2D42' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#243A52'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = '#1C2D42'}>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: step.bg, color: step.color }}>
                    <Icon size={20} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-600">0{i + 1}</span>
                </div>
                <h3 className="text-[13px] font-semibold text-slate-200 mb-1.5">{step.label}</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-4">{step.description}</p>
                <button className="flex items-center gap-1.5 text-[12px] font-semibold transition-colors"
                  style={{ color: step.color }}>
                  {step.action} <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Capability preview */}
      <div className="rounded-2xl p-6" style={{ background: '#0D1220', border: '1px solid #1C2D42' }}>
        <div className="flex items-center gap-2 mb-5">
          <Sparkles size={14} style={{ color: '#22D3EE' }} />
          <h3 className="text-[13px] font-semibold text-slate-300">What Studyfy can do for you</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            'Track attendance automatically with AI',
            'Grade assignments with smart suggestions',
            'Get insights on struggling students early',
            'Schedule and run live lessons from one place',
            'Share materials and track who\'s viewed them',
            'Communicate with parents in real-time',
          ].map((cap, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <CheckCircle2 size={13} style={{ color: '#10B981', flexShrink: 0 }} />
              <span className="text-[12px] text-slate-400">{cap}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
