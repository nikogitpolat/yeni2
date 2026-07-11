import { Sparkles, AlertCircle, TrendingUp, ChevronRight, RefreshCw } from 'lucide-react';

interface Insight {
  type: 'warning' | 'positive' | 'info';
  title: string;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
}

const insights: Insight[] = [
  {
    type: 'warning',
    title: '3 students disengaging',
    description: 'Alex M., Tom K., and Priya S. in Grade 9A have missed 2+ activities this week.',
    action: 'Send check-in',
    priority: 'high',
  },
  {
    type: 'positive',
    title: "Emma's breakthrough",
    description: 'Emma Johnson improved 23% in Mathematics over the last 30 days — exceptional progress.',
    action: 'View report',
    priority: 'low',
  },
  {
    type: 'warning',
    title: 'Assignment completion dropped',
    description: 'Physics Fundamentals shows a 12% drop in on-time submissions vs last week.',
    action: 'Review class',
    priority: 'medium',
  },
  {
    type: 'info',
    title: 'Optimal teaching window',
    description: "Your Grade 11C responds best on Tuesday/Thursday mornings based on engagement patterns.",
    action: 'See analytics',
    priority: 'low',
  },
];

const typeConfig = {
  warning: { icon: AlertCircle, color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', dot: '#F59E0B' },
  positive: { icon: TrendingUp, color: '#10B981', bg: 'rgba(16,185,129,0.1)', dot: '#10B981' },
  info: { icon: Sparkles, color: '#06B6D4', bg: 'rgba(6,182,212,0.1)', dot: '#06B6D4' },
};

const priorityLabel = { high: 'High', medium: 'Med', low: 'Low' };
const priorityColor = { high: '#EF4444', medium: '#F59E0B', low: '#10B981' };

export default function AIInsightsPanel() {
  return (
    <div className="anim-init animate-fade-up delay-300 h-full"
      style={{ animationFillMode: 'forwards' }}>
      <div className="rounded-2xl overflow-hidden h-full flex flex-col"
        style={{
          background: '#0D1220',
          border: '1px solid rgba(6,182,212,0.2)',
          boxShadow: '0 0 32px rgba(6,182,212,0.06)',
        }}>
        
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(6,182,212,0.1)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.2))' }}>
              <Sparkles size={15} style={{ color: '#22D3EE' }} />
            </div>
            <div>
              <h3 className="text-[13px] font-semibold text-white">AI Insights</h3>
              <p className="text-[10px] text-slate-500">Updated just now</p>
            </div>
          </div>
          <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5"
            style={{ color: '#475569' }}>
            <RefreshCw size={13} />
          </button>
        </div>

        {/* AI strip */}
        <div className="mx-4 mt-3 px-3 py-2.5 rounded-xl flex items-center gap-2"
          style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(6,182,212,0.08))', border: '1px solid rgba(6,182,212,0.15)' }}>
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse" style={{ background: '#22D3EE' }} />
          <p className="text-[11px] leading-relaxed" style={{ color: '#94A3B8' }}>
            <span style={{ color: '#22D3EE' }} className="font-medium">4 patterns detected</span> · 1 action recommended
          </p>
        </div>

        {/* Insights */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5">
          {insights.map((insight, i) => {
            const cfg = typeConfig[insight.type];
            const Icon = cfg.icon;
            return (
              <div key={i}
                className="rounded-xl p-3.5 transition-all duration-200 hover:scale-[1.01] cursor-pointer group"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1C2D42' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#243A52';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#1C2D42';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                }}>
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: cfg.bg, color: cfg.color }}>
                    <Icon size={13} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="text-[12px] font-semibold text-slate-200 leading-tight">{insight.title}</p>
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded flex-shrink-0"
                        style={{ background: `${priorityColor[insight.priority]}18`, color: priorityColor[insight.priority] }}>
                        {priorityLabel[insight.priority]}
                      </span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-500">{insight.description}</p>
                    <button className="mt-2 flex items-center gap-1 text-[11px] font-medium transition-colors group-hover:gap-1.5"
                      style={{ color: cfg.color }}>
                      {insight.action} <ChevronRight size={11} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-4 pb-4 pt-2 flex-shrink-0">
          <button className="w-full py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-200 hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(6,182,212,0.15))', color: '#60A5FA', border: '1px solid rgba(59,130,246,0.2)' }}>
            Open AI Assistant
          </button>
        </div>
      </div>
    </div>
  );
}
