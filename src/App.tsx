import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TeacherDashboard from './components/dashboard/TeacherDashboard';
import GroupsPage from './components/pages/GroupsPage';
import LessonsPage from './components/pages/LessonsPage';
import AttendancePage from './components/pages/AttendancePage';
import AssignmentsPage from './components/pages/AssignmentsPage';
import QuestionBankPage from './components/pages/QuestionBankPage';
import MaterialsPage from './components/pages/MaterialsPage';
import MessagesPage from './components/pages/MessagesPage';
import AnnouncementsPage from './components/pages/AnnouncementsPage';
import CalendarPage from './components/pages/CalendarPage';
import AnalyticsPage from './components/pages/AnalyticsPage';
import AIAssistantPage from './components/pages/AIAssistantPage';
import NotificationsPage from './components/pages/NotificationsPage';
import SettingsPage from './components/pages/SettingsPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const renderActivePage = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <TeacherDashboard onNavigate={setActiveTab} />;
      case 'Groups':
        return <GroupsPage />;
      case 'Lessons':
        return <LessonsPage />;
      case 'Attendance':
        return <AttendancePage />;
      case 'Assignments':
        return <AssignmentsPage />;
      case 'Question Bank':
        return <QuestionBankPage />;
      case 'Materials':
        return <MaterialsPage />;
      case 'Messages':
        return <MessagesPage />;
      case 'Announcements':
        return <AnnouncementsPage />;
      case 'Calendar':
        return <CalendarPage />;
      case 'Analytics':
        return <AnalyticsPage />;
      case 'AI Assistant':
        return <AIAssistantPage />;
      case 'Notifications':
        return <NotificationsPage />;
      case 'Settings':
        return <SettingsPage />;
      default:
        return <TeacherDashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#05080F' }}>
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden" style={{ marginLeft: '220px' }}>
        {renderActivePage()}
      </div>
    </div>
  );
}

