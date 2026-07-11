import { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, Search, Send, Paperclip, MoreVertical, 
  Users, Check, CheckCheck, Smile, Phone, Video
} from 'lucide-react';

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  isGroup: boolean;
  lastMessage: string;
  updatedAt: string;
  unreadCount: number;
  online?: boolean;
}

interface Message {
  id: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  time: string;
  isMe: boolean;
  status: 'sent' | 'delivered' | 'read';
}

const initialConversations: Conversation[] = [
  { id: 'c-1', name: 'Emma Johnson', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2', isGroup: false, lastMessage: 'Miss Chen, is the midterm paper multiple choice or written?', updatedAt: '10:15 AM', unreadCount: 1, online: true },
  { id: 'c-2', name: 'Grade 11C Physics Group', isGroup: true, lastMessage: 'Lucas Rivera: I uploaded the formulas slides to folder.', updatedAt: 'Yesterday', unreadCount: 0 },
  { id: 'c-3', name: 'Lucas Rivera', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2', isGroup: false, lastMessage: 'Got it, thank you so much!', updatedAt: 'Wednesday', unreadCount: 0, online: false },
  { id: 'c-4', name: 'Sophia Patel', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2', isGroup: false, lastMessage: 'Can we schedule a 10-minute help call?', updatedAt: 'July 05', unreadCount: 0, online: true },
];

const initialMessages: Record<string, Message[]> = {
  'c-1': [
    { id: 'm-1', senderName: 'Emma Johnson', content: 'Hi Miss Chen, I had a quick question regarding our upcoming laboratory exam.', time: '10:10 AM', isMe: false, status: 'read' },
    { id: 'm-2', senderName: 'Sarah Chen', content: 'Hi Emma! Of course, feel free to ask. What is on your mind?', time: '10:12 AM', isMe: true, status: 'read' },
    { id: 'm-3', senderName: 'Emma Johnson', content: 'Miss Chen, is the midterm paper multiple choice or written equation solving?', time: '10:15 AM', isMe: false, status: 'delivered' },
  ],
  'c-2': [
    { id: 'mg-1', senderName: 'Lucas Rivera', content: 'Hey guys, did we finalize the slide topics?', time: 'Yesterday', isMe: false, status: 'read' },
    { id: 'mg-2', senderName: 'Sophia Patel', content: 'Yes, let’s do Quantum superpositions and tunneling.', time: 'Yesterday', isMe: false, status: 'read' },
  ],
  'c-3': [
    { id: 'ml-1', senderName: 'Sarah Chen', content: 'Hi Lucas, please remember to upload your homework.', time: 'Wednesday', isMe: true, status: 'read' },
    { id: 'ml-2', senderName: 'Lucas Rivera', content: 'Got it, thank you so much!', time: 'Wednesday', isMe: false, status: 'read' },
  ],
  'c-4': [
    { id: 'ms-1', senderName: 'Sophia Patel', content: 'Hi Miss Chen, I am having trouble understanding standard parabolas.', time: 'July 05', isMe: false, status: 'read' },
    { id: 'ms-2', senderName: 'Sarah Chen', content: 'Let’s go through examples next lecture, or we can schedule a quick 10-minute help call.', time: 'July 05', isMe: true, status: 'read' },
  ],
};

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [activeConvId, setActiveConvId] = useState<string>('c-1');
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages);
  const [inputMsg, setInputMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeConvId]);

  const activeConv = conversations.find(c => c.id === activeConvId);
  const activeMessages = messages[activeConvId] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderName: 'Sarah Chen',
      content: inputMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      status: 'sent',
    };

    const updatedMsgs = [...activeMessages, newMsg];
    setMessages({
      ...messages,
      [activeConvId]: updatedMsgs
    });

    // Update last message in sidebar
    setConversations(conversations.map(c => 
      c.id === activeConvId 
        ? { ...c, lastMessage: `You: ${inputMsg}`, unreadCount: 0, updatedAt: 'Just now' } 
        : c
    ));

    setInputMsg('');

    // Simulate smart student automated reply
    setTimeout(() => {
      const replyMsg: Message = {
        id: `msg-reply-${Date.now()}`,
        senderName: activeConv?.name || 'Student',
        senderAvatar: activeConv?.avatar,
        content: `Thank you Miss Chen! I appreciate your guidance. I will study those modules immediately.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false,
        status: 'delivered',
      };

      setMessages(prev => ({
        ...prev,
        [activeConvId]: [...(prev[activeConvId] || []), replyMsg]
      }));

      setConversations(prev => prev.map(c => 
        c.id === activeConvId 
          ? { ...c, lastMessage: replyMsg.content, unreadCount: 0, updatedAt: 'Just now' } 
          : c
      ));
    }, 1500);
  };

  const filteredConversations = conversations.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex overflow-hidden h-full">
      
      {/* Chats sidebar */}
      <div className="w-[300px] flex flex-col border-r h-full flex-shrink-0" style={{ background: '#080C14', borderColor: '#1C2D42' }}>
        {/* Search header */}
        <div className="p-4 border-b space-y-3" style={{ borderColor: '#1C2D42' }}>
          <h2 className="text-[16px] font-bold text-white tracking-tight">Conversations</h2>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border bg-white/2" style={{ borderColor: '#1C2D42' }}>
            <Search size={13} className="text-slate-500" />
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent text-white text-[11px] placeholder-slate-600 focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredConversations.map(conv => {
            const isActive = conv.id === activeConvId;
            return (
              <div
                key={conv.id}
                onClick={() => {
                  setActiveConvId(conv.id);
                  setConversations(conversations.map(c => c.id === conv.id ? { ...c, unreadCount: 0 } : c));
                }}
                className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                  isActive ? 'bg-blue-600/10 border border-blue-500/10' : 'hover:bg-white/2 border border-transparent'
                }`}>
                
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  {conv.isGroup ? (
                    <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400 border border-blue-500/10">
                      <Users size={16} />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-full overflow-hidden border" style={{ borderColor: '#1C2D42' }}>
                      <img src={conv.avatar} alt={conv.name} className="w-full h-full object-cover" />
                    </div>
                  )}

                  {conv.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2" style={{ borderColor: '#080C14' }} />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] font-bold text-slate-200 truncate">{conv.name}</p>
                    <span className="text-[9px] text-slate-500 font-semibold">{conv.updatedAt}</span>
                  </div>

                  <p className="text-[11px] text-slate-500 truncate mt-0.5" style={{ color: conv.unreadCount > 0 ? '#60A5FA' : '#64748B' }}>
                    {conv.lastMessage}
                  </p>
                </div>

                {/* Badge unread count */}
                {conv.unreadCount > 0 && (
                  <span className="w-4.5 h-4.5 rounded-full bg-blue-600 text-white text-[8px] font-bold flex items-center justify-center flex-shrink-0 animate-pulse">
                    {conv.unreadCount}
                  </span>
                )}

              </div>
            );
          })}
        </div>
      </div>

      {/* Main chat window */}
      <div className="flex-1 flex flex-col h-full bg-[#05080F]">
        {activeConv ? (
          <>
            {/* Header chat bar */}
            <div className="px-6 py-4 border-b flex items-center justify-between" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
              <div className="flex items-center gap-3">
                {activeConv.isGroup ? (
                  <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400">
                    <Users size={16} />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-800">
                    <img src={activeConv.avatar} alt={activeConv.name} className="w-full h-full object-cover" />
                  </div>
                )}

                <div>
                  <h3 className="text-[13px] font-bold text-white tracking-tight">{activeConv.name}</h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    {activeConv.isGroup ? 'Classroom Group Chat' : activeConv.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button className="w-8 h-8 rounded-xl border flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all" style={{ borderColor: '#1C2D42' }}>
                  <Phone size={13} />
                </button>
                <button className="w-8 h-8 rounded-xl border flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all" style={{ borderColor: '#1C2D42' }}>
                  <Video size={13} />
                </button>
                <button className="w-8 h-8 rounded-xl border flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all" style={{ borderColor: '#1C2D42' }}>
                  <MoreVertical size={13} />
                </button>
              </div>
            </div>

            {/* Message Bubble Feed */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {activeMessages.map(msg => {
                return (
                  <div key={msg.id} className={`flex gap-3 max-w-[70%] ${msg.isMe ? 'ml-auto flex-row-reverse' : ''}`}>
                    
                    {!msg.isMe && (
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-slate-800">
                        <img src={msg.senderAvatar || activeConv.avatar} alt={msg.senderName} className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <div className={`p-3.5 rounded-2xl text-[11.5px] leading-relaxed relative ${
                        msg.isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-[#0D1220] border text-slate-300 rounded-tl-none border-[#1C2D42]'
                      }`}>
                        {msg.content}
                      </div>

                      <div className={`flex items-center gap-1 text-[9px] text-slate-500 ${msg.isMe ? 'justify-end' : ''}`}>
                        <span>{msg.time}</span>
                        {msg.isMe && (
                          <span>
                            {msg.status === 'read' ? <CheckCheck size={11} className="text-blue-400" /> : <Check size={11} />}
                          </span>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
              <div ref={chatBottomRef} />
            </div>

            {/* Input message drawer */}
            <form onSubmit={handleSendMessage} className="p-4 border-t flex items-center gap-3.5" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
              <button 
                type="button"
                className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-colors">
                <Paperclip size={14} />
              </button>

              <input
                type="text"
                value={inputMsg}
                onChange={e => setInputMsg(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-white/5 border border-slate-800 rounded-xl text-[12px] px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:bg-white/8 transition-colors"
              />

              <button 
                type="button"
                className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-colors">
                <Smile size={14} />
              </button>

              <button 
                type="submit"
                className="w-9 h-9 bg-blue-600 hover:bg-blue-500 rounded-xl flex items-center justify-center text-white transition-colors shadow-lg">
                <Send size={13} fill="white" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <MessageSquare size={36} className="text-slate-600 mb-2" />
            <p className="text-[13px] text-slate-400 font-medium">Select a conversation</p>
            <p className="text-[11px] text-slate-600 mt-0.5">Choose a student roster group or personal contact to start texting.</p>
          </div>
        )}
      </div>

    </div>
  );
}
