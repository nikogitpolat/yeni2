import {
  LayoutDashboard, Users, BookOpen, ClipboardCheck,
  FileText, Award, FolderOpen, MessageSquare,
  Megaphone, Calendar, BarChart3, Sparkles,
  Settings, Zap, ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Users, label: 'Groups' },
  { icon: BookOpen, label: 'Lessons' },
  { icon: ClipboardCheck, label: 'Attendance' },
  { icon: FileText, label: 'Assignments', badge: 8 },
  { icon: Award, label: 'Question Bank' },
  { icon: FolderOpen, label: 'Materials' },
  { icon: MessageSquare, label: 'Messages', badge: 3 },
  { icon: Megaphone, label: 'Announcements' },
  { icon: Calendar, label: 'Calendar' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Sparkles, label: 'AI Assistant' },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-full w-[220px] flex flex-col z-20"
      style={{ background: '#080C14', borderRight: '1px solid #1C2D42' }}>
      
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b cursor-pointer" 
        style={{ borderColor: '#1C2D42' }}
        onClick={() => onTabChange('Dashboard')}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #3B82F6, #06B6D4)' }}>
          <Zap size={16} className="text-white" fill="white" />
        </div>
        <span className="text-white font-semibold text-[17px] tracking-tight">Studyfy</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-0.5">
          {navItems.map(({ icon: Icon, label, badge }) => {
            const isActive = activeTab === label;
            return (
              <button
                key={label}
                onClick={() => onTabChange(label)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group relative"
                style={{
                  background: isActive ? 'rgba(59,130,246,0.12)' : 'transparent',
                  color: isActive ? '#60A5FA' : '#64748B',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                    (e.currentTarget as HTMLElement).style.color = '#94A3B8';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = '#64748B';
                  }
                }}
              >
                <Icon size={17} className="flex-shrink-0" />
                <span className="font-medium flex-1 text-left">{label}</span>
                {badge && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                    style={{ background: 'rgba(59,130,246,0.2)', color: '#60A5FA' }}>
                    {badge}
                  </span>
                )}
                {isActive && <ChevronRight size={13} className="opacity-60" />}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t" style={{ borderColor: '#1C2D42' }}>
        <button
          onClick={() => onTabChange('Settings')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200"
          style={{
            background: activeTab === 'Settings' ? 'rgba(59,130,246,0.12)' : 'transparent',
            color: activeTab === 'Settings' ? '#60A5FA' : '#64748B',
          }}
          onMouseEnter={e => {
            if (activeTab !== 'Settings') {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
              (e.currentTarget as HTMLElement).style.color = '#94A3B8';
            }
          }}
          onMouseLeave={e => {
            if (activeTab !== 'Settings') {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.color = '#64748B';
            }
          }}
        >
          <Settings size={17} />
          <span className="font-medium">Settings</span>
        </button>

        {/* Profile */}
        <div 
          onClick={() => onTabChange('Settings')}
          className="mt-2 flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/5"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1C2D42' }}>
          <div className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #3B82F6, #06B6D4)' }}>
            <img
              src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
              alt="Teacher"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-slate-300 truncate">Sarah Chen</p>
            <p className="text-[10px] text-slate-500 truncate">Math & Physics</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
