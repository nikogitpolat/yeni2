import { useState } from 'react';
import { Bell, Search, Sparkles, ToggleLeft, ToggleRight } from 'lucide-react';
import MetricsRow from './MetricsRow';
import TodaySchedule from './TodaySchedule';
import AIInsightsPanel from './AIInsightsPanel';
import RecentActivity from './RecentActivity';
import QuickActions from './QuickActions';
import StudentPerformance from './StudentPerformance';
import UpcomingDeadlines from './UpcomingDeadlines';
import EmptyDashboard from './EmptyDashboard';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function formatDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });
}

interface TeacherDashboardProps {
  onNavigate?: (tab: string) => void;
}

export default function TeacherDashboard({ onNavigate }: TeacherDashboardProps) {
  const [hasData, setHasData] = useState(true);

  return (
    <div className="flex flex-col min-h-full">
      
      {/* Top nav bar */}
      <header className="flex-shrink-0 flex items-center justify-between px-8 py-4"
        style={{ borderBottom: '1px solid #1C2D42', background: 'rgba(8,12,20,0.8)', backdropFilter: 'blur(12px)' }}>
        
        <div>
          <h1 className="text-[18px] font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-[11px] text-slate-500 mt-0.5">{formatDate()}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Demo toggle */}
          <button
            onClick={() => setHasData(prev => !prev)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-medium transition-all duration-200 hover:opacity-80"
            style={{ background: 'rgba(255,255,255,0.04)', color: '#64748B', border: '1px solid #1C2D42' }}>
            {hasData ? <ToggleRight size={14} style={{ color: '#3B82F6' }} /> : <ToggleLeft size={14} />}
            {hasData ? 'With data' : 'Empty state'}
          </button>
 
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 cursor-text"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #1C2D42', width: '180px' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#243A52'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = '#1C2D42'}>
            <Search size={13} style={{ color: '#475569', flexShrink: 0 }} />
            <span className="text-[12px] text-slate-600">Search anything...</span>
            <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded"
              style={{ background: 'rgba(255,255,255,0.06)', color: '#475569' }}>⌘K</span>
          </div>

          {/* AI assistant button */}
          <button 
            onClick={() => onNavigate?.('AI Assistant')}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] font-medium transition-all duration-200 hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(6,182,212,0.12))',
              color: '#22D3EE',
              border: '1px solid rgba(6,182,212,0.2)',
            }}>
            <Sparkles size={13} />
            Ask AI
          </button>

          {/* Notifications */}
          <button 
            onClick={() => onNavigate?.('Notifications')}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-white/5"
            style={{ border: '1px solid #1C2D42', color: '#64748B' }}>
            <Bell size={15} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-blue-500" />
          </button>
        </div>
      </header>


      {/* Main content */}
      <main className="flex-1 overflow-y-auto px-8 py-6">
        {!hasData ? (
          <EmptyDashboard onGetStarted={() => setHasData(true)} />
        ) : (
          <div className="space-y-5 max-w-[1400px] mx-auto">
            
            {/* Greeting + AI strip */}
            <div className="anim-init animate-fade-up" style={{ animationFillMode: 'forwards' }}>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-[24px] font-bold text-white tracking-tight">
                    {getGreeting()}, <span className="gradient-text">Sarah</span> 👋
                  </h2>
                  <p className="text-[13px] text-slate-500 mt-1">
                    You have <span className="text-slate-300 font-medium">3 lessons</span> today and{' '}
                    <span className="text-slate-300 font-medium">12 pending reviews.</span>
                  </p>
                </div>
                {/* AI banner */}
                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 hover:opacity-90"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(6,182,212,0.08))',
                    border: '1px solid rgba(6,182,212,0.2)',
                  }}>
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#22D3EE' }} />
                  <p className="text-[12px]" style={{ color: '#94A3B8' }}>
                    <span style={{ color: '#22D3EE' }} className="font-semibold">AI: </span>
                    3 students may need your attention today
                  </p>
                  <Sparkles size={12} style={{ color: '#22D3EE' }} />
                </div>
              </div>
            </div>

            {/* Metrics */}
            <MetricsRow />

            {/* Main 2-column grid */}
            <div className="grid grid-cols-[1fr_340px] gap-5">
              {/* Left column */}
              <div className="space-y-5">
                <TodaySchedule />
                <RecentActivity />
              </div>
              {/* Right column */}
              <AIInsightsPanel />
            </div>

            {/* Bottom row: 3 columns */}
            <div className="grid grid-cols-3 gap-5">
              <StudentPerformance />
              <UpcomingDeadlines />
              <QuickActions />
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
