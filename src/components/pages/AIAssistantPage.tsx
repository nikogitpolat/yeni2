import { useState } from 'react';
import { 
  Sparkles, Send, FileText, CheckCircle2, Copy, RefreshCw, Check
} from 'lucide-react';

interface ChatMessage {
  sender: 'ai' | 'teacher';
  text: string;
  timestamp: string;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: "Hello Sarah Chen! I am your AI Teaching Assistant. How can I assist with your curriculum preparation today?\n\nSelect a template below to draft detailed lesson materials, exam quiz keys, or performance recaps immediately.",
      timestamp: '10:00 AM'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [editorTitle, setEditorTitle] = useState('Workspace Document Draft');
  const [editorContent, setEditorContent] = useState(
    "Select or trigger any AI assistant prompt to populate the live workspace document draft on this side."
  );

  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(editorContent);
    setCopied(true);
    triggerToast('Workspace document copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerAIResponse = (promptText: string) => {
    setIsGenerating(true);
    
    // Add teacher message
    const teacherMsg: ChatMessage = {
      sender: 'teacher',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, teacherMsg]);

    setTimeout(() => {
      let aiText = '';
      let generatedDoc = '';
      let docTitle = '';

      if (promptText.toLowerCase().includes('lesson plan')) {
        docTitle = 'Lesson Plan: Quantum Mechanics Core';
        aiText = "I have drafted a comprehensive Lesson Plan on Quantum Mechanics Core and populated your workspace editor on the right.";
        generatedDoc = `# Course Lesson Plan: Quantum Mechanics Core
**Target Group:** Grade 11C Advanced Physics
**Duration:** 90 Minutes

## Learning Objectives:
1. Understand wave-particle duality and the historical double-slit experiment.
2. Formulate and solve basic 1D Schrodinger equations.
3. Compute Bohr hydrogen radius orbits probability fields.

## Syllabus Breakdown:
* **00:00 - 00:15:** Welcome, Bohr Orbit recap, dual-nature slides.
* **00:15 - 00:45:** Double-slit mathematical interference demonstration.
* **00:45 - 01:15:** Wavefunction magnitude probability solving exercises.
* **01:15 - 01:30:** Interactive Bohr hydrogen simulation, summary, Q&A.

---
*Created by Studyfy AI Copilot Workspace*`;
      } else if (promptText.toLowerCase().includes('quiz')) {
        docTitle = '5-Question Physics Quiz Key';
        aiText = "I have compiled a 5-Question Physics Quiz complete with answers and options in the editor panel.";
        generatedDoc = `# Quiz: Wave-Particle Dualities & Schrodinger
**Max Points:** 50 Points

### Q1: What does |Ψ|² express?
* A. Absolute kinetic force
* B. Probability density coordinate field [CORRECT]
* C. Relativity momentum
* D. Standard wave speed

### Q2: State standard de Broglie equation.
* **Answer Key:** λ = h / p.

### Q3: (True/False) Electrons exhibit wave traits only when travelling in high vacuum chambers.
* **Answer Key:** False. Electrons display quantum properties across materials.

---
*Created by Studyfy AI Copilot Workspace*`;
      } else {
        docTitle = 'AI Answer Notes';
        aiText = "I have responded to your custom question and structured the results in the workspace draft card on the right.";
        generatedDoc = `# AI Research Summary
## Topic: ${promptText}

### Key Academic Explanations:
1. Particle wave dualities describe how massive entities display wave properties.
2. The de Broglie wavelength links kinetic mass velocity to structural frequency.
3. Class attendance rate and simulator tool preparation highly correlate with scoring over 85% on midterm testing.

---
*Created by Studyfy AI Copilot Workspace*`;
      }

      const aiMsg: ChatMessage = {
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setEditorTitle(docTitle);
      setEditorContent(generatedDoc);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    triggerAIResponse(inputText);
    setInputText('');
  };

  return (
    <div className="flex-1 flex overflow-hidden h-full">
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-xl shadow-2xl text-[13px] font-medium border border-blue-400 animate-fade-in">
          <CheckCircle2 size={15} />
          {toast}
        </div>
      )}

      {/* Left Chat side */}
      <div className="w-[450px] border-r flex flex-col h-full bg-[#080C14] flex-shrink-0" style={{ borderColor: '#1C2D42' }}>
        
        {/* Header bar */}
        <div className="p-4 border-b flex items-center gap-2.5" style={{ borderColor: '#1C2D42' }}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-blue-400"
            style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)' }}>
            <Sparkles size={15} className="pulse-dot" />
          </div>
          <div>
            <h2 className="text-[14.5px] font-bold text-white tracking-tight">AI Copilot Chat</h2>
            <p className="text-[10px] text-slate-500 font-normal">Generate homeworks, quizzes, and plans.</p>
          </div>
        </div>

        {/* Message streams */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 max-w-[85%] ${msg.sender === 'teacher' ? 'ml-auto flex-row-reverse' : ''}`}>
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] flex-shrink-0">
                  AI
                </div>
              )}
              <div className="space-y-1">
                <div className={`p-3.5 rounded-2xl text-[11px] leading-relaxed font-normal ${
                  msg.sender === 'teacher' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-[#0D1220] border border-[#1C2D42] text-slate-300 rounded-tl-none'
                }`}>
                  {msg.text.split('\n').map((para, k) => (
                    <p key={k} className="mt-1 first:mt-0">{para}</p>
                  ))}
                </div>
                <p className="text-[9px] text-slate-600 mt-1">{msg.timestamp}</p>
              </div>
            </div>
          ))}

          {isGenerating && (
            <div className="flex items-center gap-2 text-[10px] text-blue-400 animate-pulse bg-blue-500/5 px-3 py-2 rounded-xl border border-blue-500/10 w-fit">
              <RefreshCw size={11} className="animate-spin" />
              <span>AI is drafting your curriculum material...</span>
            </div>
          )}
        </div>

        {/* Templates suggestions shortcuts */}
        <div className="p-4 border-t space-y-2" style={{ borderColor: '#1C2D42' }}>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Quick Actions Shortcuts</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Generate Lesson Plan', prompt: 'Generate lesson plan for Quantum Mechanics Grade 11C' },
              { label: 'Draft Quiz Questions', prompt: 'Draft 5 quiz questions for wave mechanics' },
              { label: 'Suggest Lab Activity', prompt: 'Suggest laboratory activity ideas for wave particle duality' },
              { label: 'Review At-Risk Students', prompt: 'Review at-risk student academic outreach guidelines' },
            ].map((tmpl, i) => (
              <button
                key={i}
                onClick={() => triggerAIResponse(tmpl.prompt)}
                className="p-2 border rounded-xl hover:bg-white/5 text-[10.5px] font-semibold text-slate-300 text-left transition-all truncate"
                style={{ borderColor: '#1C2D42' }}>
                {tmpl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input bar */}
        <form onSubmit={handleCustomSubmit} className="p-4 border-t flex items-center gap-2" style={{ borderColor: '#1C2D42' }}>
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Ask AI anything, generate syllabus files..."
            className="flex-1 bg-white/5 border border-slate-800 rounded-xl text-[11.5px] px-3.5 py-2 text-white focus:outline-none"
          />
          <button type="submit" className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center justify-center transition-colors">
            <Send size={13} fill="white" />
          </button>
        </form>

      </div>

      {/* Right Document Workspace Editor panel */}
      <div className="flex-1 flex flex-col h-full bg-[#05080F]">
        
        {/* Editor navbar details */}
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded bg-blue-500/10 flex items-center justify-center text-blue-400">
              <FileText size={12} />
            </div>
            <h3 className="text-[13px] font-bold text-white tracking-tight">{editorTitle}</h3>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleCopyText}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border text-[11px] font-bold text-slate-400 hover:text-white transition-all"
              style={{ borderColor: '#1C2D42' }}>
              {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
              {copied ? 'Copied' : 'Copy Text'}
            </button>
            <button 
              onClick={() => triggerToast('Document saved successfully to Materials/Resources Folder!')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-[11px] font-bold hover:bg-blue-500 transition-all">
              Save to Materials
            </button>
          </div>
        </div>

        {/* Large Editor Content text area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <textarea
            value={editorContent}
            onChange={e => setEditorContent(e.target.value)}
            className="w-full h-full bg-transparent text-slate-300 text-[12.5px] leading-relaxed font-mono focus:outline-none resize-none border-0 p-0"
          />
        </div>

      </div>

    </div>
  );
}
