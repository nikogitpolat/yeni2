import { useState } from 'react';
import { 
  Sparkles, Download, RefreshCw, CheckCircle2 
} from 'lucide-react';

interface EngagementStudent {
  name: string;
  avatar: string;
  score: number;
  activityIndex: number; // 0-100
  status: 'Active' | 'Inactive';
}

const students: EngagementStudent[] = [
  { name: 'Emma Johnson', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2', score: 96, activityIndex: 98, status: 'Active' },
  { name: 'Lucas Rivera', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2', score: 85, activityIndex: 88, status: 'Active' },
  { name: 'Sophia Patel', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2', score: 84, activityIndex: 91, status: 'Active' },
  { name: 'Alex Morrison', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2', score: 58, activityIndex: 42, status: 'Inactive' },
];

export default function AnalyticsPage() {
  const [selectedClass, setSelectedClass] = useState('Grade 11C Physics');
  const [aiReport, setAiReport] = useState<string | null>(
    "• Overall class performance is stable with an average score of 87.5%.\n• Emma Johnson and Sophia Patel remain in the top 10% bracket.\n• Alex Morrison's activity level has decreased by 14% over the last week. Suggesting targeted outreach before the upcoming laboratory session."
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setAiReport(
        "• NEW REPORT GENERATED: Class engagement increased by 4.2% following the launch of the Bohr hydrogen orbits simulation link.\n• Formula homework assignment has a high submission completion rate (91.2%).\n• Midterm preparation workshop scheduled for Friday has been flagged as high-value for 4 students with scores under 75%."
      );
      setIsGenerating(false);
      showToast('AI Student analysis updated!');
    }, 2000);
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
        <div className="max-w-[1400px] mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[22px] font-bold text-white tracking-tight">Academic Analytics</h1>
              <p className="text-[12px] text-slate-500 mt-0.5">Examine class average trends, student participation metrics, and predictive AI reviews.</p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedClass}
                onChange={e => setSelectedClass(e.target.value)}
                className="bg-white/5 border border-slate-800 text-white rounded-xl text-[11px] px-3.5 py-2.5 focus:outline-none">
                <option value="Grade 11C Physics">Grade 11C Physics</option>
                <option value="Grade 10B Math">Grade 10B Math</option>
                <option value="Grade 9A Calculus">Grade 9A Calculus</option>
              </select>
              
              <button 
                onClick={() => showToast('Report PDF compiles to folder...')}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-800 text-[11px] font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                <Download size={13} /> Export PDF Report
              </button>
            </div>
          </div>

          {/* Top Performance indicators */}
          <div className="grid grid-cols-4 gap-5">
            {[
              { label: 'Overall Class Average', value: '87.5%', trend: '+2.4%', color: 'text-emerald-400', desc: 'Average grade score' },
              { label: 'Syllabus Progress', value: '62%', trend: 'On track', color: 'text-blue-400', desc: '4 of 7 chapters covered' },
              { label: 'Average Weekly Attendance', value: '94.8%', trend: '+0.5%', color: 'text-cyan-400', desc: 'Roster presence rate' },
              { label: 'At-Risk Students', value: '1 student', trend: 'Alex Morrison', color: 'text-rose-400', desc: 'Flagged for low activity' }
            ].map((stat, i) => (
              <div key={i} className="p-5 rounded-2xl border" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{stat.label}</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className={`text-[22px] font-bold ${stat.color}`}>{stat.value}</span>
                  <span className="text-[10px] text-slate-400 font-semibold">{stat.trend}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">{stat.desc}</p>
              </div>
            ))}
          </div>

          {/* Charts area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            
            {/* Visual Bar graph */}
            <div className="lg:col-span-2 p-5 rounded-2xl border flex flex-col justify-between" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
              <div>
                <h3 className="text-[13.5px] font-bold text-white">Grade Distributions</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Roster grade buckets count</p>
              </div>

              {/* Pure CSS clean bars */}
              <div className="grid grid-cols-5 gap-4 items-end h-40 mt-6 border-b border-slate-800 pb-2">
                {[
                  { label: 'A (90-100)', count: 12, percent: 'w-full h-[80%] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' },
                  { label: 'B (80-89)', count: 8, percent: 'w-full h-[55%] bg-blue-500/20 text-blue-400 border border-blue-500/30' },
                  { label: 'C (70-79)', count: 3, percent: 'w-full h-[20%] bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' },
                  { label: 'D (60-69)', count: 0, percent: 'w-full h-[3%] bg-amber-500/20 text-amber-400 border border-amber-500/30' },
                  { label: 'F (<60)', count: 1, percent: 'w-full h-[8%] bg-rose-500/20 text-rose-400 border border-rose-500/30' },
                ].map((bar, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-[10px] font-bold text-slate-400">{bar.count} std</span>
                    <div className={`rounded-lg transition-all duration-700 ${bar.percent}`} />
                    <span className="text-[9px] text-slate-500 font-bold whitespace-nowrap mt-1">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI insights card */}
            <div className="p-5 rounded-2xl border flex flex-col justify-between relative overflow-hidden" 
              style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
              
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <Sparkles size={11} />
                  </div>
                  <h3 className="text-[13.5px] font-bold text-white">AI Predictive Insights</h3>
                </div>

                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 mt-3 min-h-[140px] flex flex-col justify-center">
                  {isGenerating ? (
                    <div className="text-center space-y-2">
                      <RefreshCw size={18} className="animate-spin text-blue-400 mx-auto" />
                      <p className="text-[11px] text-slate-400">Analyzing grades & simulator logs...</p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {aiReport?.split('\n').map((line, idx) => (
                        <p key={idx} className="text-[11px] text-slate-300 leading-relaxed font-normal">{line}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-[11px] font-bold mt-4 transition-colors">
                Regenerate Analysis Report
              </button>
            </div>

          </div>

          {/* Engagement indices student participation logs */}
          <div className="p-5 rounded-2xl border" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
            <h3 className="text-[14px] font-bold text-white mb-4">Student Engagement Indices</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {students.map((std, i) => (
                <div key={i} className="p-4 rounded-xl border flex items-center justify-between" style={{ borderColor: '#1C2D42', background: 'rgba(255,255,255,0.01)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img src={std.avatar} alt={std.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-[12.5px] font-semibold text-white">{std.name}</h4>
                      <p className="text-[10px] text-slate-500">Average Grade: <span className="text-emerald-400 font-bold">{std.score}%</span></p>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Activity level</p>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${std.activityIndex}%` }} />
                      </div>
                      <span className="text-[11px] font-bold text-white">{std.activityIndex}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
