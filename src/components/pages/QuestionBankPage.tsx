import { useState } from 'react';
import { 
  Plus, Search, Trash2, Eye, CheckCircle2 
} from 'lucide-react';

interface Question {
  id: string;
  text: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'Multiple Choice' | 'Written Equation' | 'Short Answer';
  tags: string[];
  options?: string[];
  correctAnswer: string;
}

const initialQuestions: Question[] = [
  {
    id: 'q-1',
    text: 'What is the physical interpretation of the square of the wavefunction magnitude |Ψ|² in wave mechanics?',
    category: 'Quantum Mechanics',
    difficulty: 'Medium',
    type: 'Multiple Choice',
    tags: ['Wavefunction', 'Bohr Probability'],
    options: [
      'The exact mechanical force of the particle.',
      'The probability density of locating the particle at a coordinate.',
      'The kinetic energy amplitude.',
      'The relativistic momentum coefficient.'
    ],
    correctAnswer: 'The probability density of locating the particle at a coordinate.'
  },
  {
    id: 'q-2',
    text: 'Calculate the de Broglie wavelength of an electron traveling at 1.0% the speed of light.',
    category: 'Quantum Mechanics',
    difficulty: 'Hard',
    type: 'Written Equation',
    tags: ['De Broglie', 'Relativity'],
    correctAnswer: 'λ = h / p ≈ 2.42 x 10^-10 meters (using standard plank constant h).'
  },
  {
    id: 'q-3',
    text: 'Which equation correctly expresses the vertex of a standard quadratic parabola ax² + bx + c = 0?',
    category: 'Algebra',
    difficulty: 'Easy',
    type: 'Multiple Choice',
    tags: ['Parabola', 'Vertex'],
    options: [
      'x = -b / (2a)',
      'x = b / (4a)',
      'x = -c / b',
      'x = (b² - 4ac) / 2a'
    ],
    correctAnswer: 'x = -b / (2a)'
  }
];

export default function QuestionBankPage() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Easy' | 'Medium' | 'Hard'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'Quantum Mechanics' | 'Algebra'>('all');

  // Preview / Edit state
  const [previewQId, setPreviewQId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Creation fields
  const [newText, setNewText] = useState('');
  const [newCat, setNewCat] = useState('Quantum Mechanics');
  const [newDiff, setNewDiff] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [newType, setNewType] = useState<'Multiple Choice' | 'Written Equation'>('Multiple Choice');
  const [newOptions, setNewOptions] = useState('Option A\nOption B\nOption C\nOption D');
  const [newCorrect, setNewCorrect] = useState('Option A');

  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText || !newCorrect) return;

    const parsedOptions = newType === 'Multiple Choice' ? newOptions.split('\n').filter(Boolean) : undefined;

    const newQ: Question = {
      id: `q-${Date.now()}`,
      text: newText,
      category: newCat,
      difficulty: newDiff,
      type: newType,
      tags: [newCat.split(' ')[0] || 'General'],
      options: parsedOptions,
      correctAnswer: newCorrect
    };

    setQuestions([newQ, ...questions]);
    setShowCreateModal(false);
    setNewText('');
    setNewCorrect('');
    showToast('Question saved successfully to the reusable Bank!');
  };

  const handleDelete = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
    showToast('Question deleted from repository.');
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiff = difficultyFilter === 'all' ? true : q.difficulty === difficultyFilter;
    const matchesCat = categoryFilter === 'all' ? true : q.category === categoryFilter;
    return matchesSearch && matchesDiff && matchesCat;
  });

  const previewQ = questions.find(q => q.id === previewQId);

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
              <h1 className="text-[22px] font-bold text-white tracking-tight">Question Bank</h1>
              <p className="text-[12px] text-slate-500 mt-0.5">Maintain reusable testing formulas, categorise difficulty levels, and inject questions directly into active worksheets.</p>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all duration-200 hover:opacity-95"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #06B6D4)' }}>
              <Plus size={15} />
              Add Question
            </button>
          </div>

          {/* Filters Row */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl border" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
            <div className="flex items-center gap-3">
              <div>
                <select
                  value={difficultyFilter}
                  onChange={e => setDifficultyFilter(e.target.value as 'all' | Question['difficulty'])}
                  className="bg-white/5 border border-slate-800 text-white rounded-xl text-[11px] px-3 py-1.5 focus:outline-none">
                  <option value="all">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <select
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value)}
                  className="bg-white/5 border border-slate-800 text-white rounded-xl text-[11px] px-3 py-1.5 focus:outline-none">
                  <option value="all">All Categories</option>
                  <option value="Quantum Mechanics">Quantum Mechanics</option>
                  <option value="Algebra">Algebra</option>
                </select>
              </div>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border w-48"
              style={{ background: 'rgba(255,255,255,0.02)', borderColor: '#1C2D42' }}>
              <Search size={13} className="text-slate-500" />
              <input
                type="text"
                placeholder="Search formulas..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent text-white text-[11px] placeholder-slate-600 focus:outline-none w-full"
              />
            </div>
          </div>

          {/* Table list view */}
          <div className="p-5 rounded-2xl border" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
            <h3 className="text-[14px] font-bold text-white mb-4">Question Library ({filteredQuestions.length})</h3>
            
            <div className="divide-y divide-slate-800">
              {filteredQuestions.map(q => (
                <div key={q.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-slate-400 bg-white/5 border border-slate-800 px-2 py-0.5 rounded">
                        {q.category}
                      </span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                        q.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
                        q.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {q.difficulty}
                      </span>
                      <span className="text-[10px] text-slate-500">{q.type}</span>
                    </div>

                    <p className="text-[12px] font-semibold text-white truncate max-w-2xl">{q.text}</p>
                    
                    <div className="flex items-center gap-1.5">
                      {q.tags.map(tag => (
                        <span key={tag} className="text-[9px] text-slate-500">#{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setPreviewQId(q.id)}
                      className="w-8 h-8 rounded-xl border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                      <Eye size={12} />
                    </button>
                    <button 
                      onClick={() => handleDelete(q.id)}
                      className="w-8 h-8 rounded-xl border border-slate-800 flex items-center justify-center text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Question Details preview sheet */}
      {previewQ && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border p-6 animate-fade-in"
            style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
            
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <h2 className="text-[14px] font-bold text-white">Question Specifications</h2>
              <button 
                onClick={() => setPreviewQId(null)}
                className="text-[11px] text-slate-500 hover:text-white transition-colors">Close</button>
            </div>

            <div className="space-y-4">
              <p className="text-[12px] text-slate-500 uppercase font-bold tracking-wider">Question Statement</p>
              <p className="text-[13px] font-semibold text-white leading-relaxed">{previewQ.text}</p>

              {previewQ.options && (
                <div className="space-y-2 mt-3">
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Multiple Choice Options</p>
                  {previewQ.options.map((opt, i) => (
                    <div key={i} className={`p-3 rounded-xl border text-[11px] font-medium flex items-center justify-between ${
                      opt === previewQ.correctAnswer ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'border-slate-800 text-slate-400'
                    }`}>
                      <span>{opt}</span>
                      {opt === previewQ.correctAnswer && <CheckCircle2 size={12} />}
                    </div>
                  ))}
                </div>
              )}

              {!previewQ.options && (
                <div className="p-3.5 rounded-xl border border-dashed border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[11px] mt-3">
                  <p className="font-bold">Correct Key / Resolution:</p>
                  <p className="mt-1">{previewQ.correctAnswer}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Question Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border p-6 animate-fade-in"
            style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
            <h2 className="text-[16px] font-bold text-white mb-1">Add Question to Repository</h2>
            <p className="text-[11px] text-slate-500 mb-4 font-normal">Build clean multiple choice or formula equations. Reuse these questions on any midterm sheets or quiz papers.</p>
            
            <form onSubmit={handleCreateQuestion} className="space-y-4">
              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1">Question Statement</label>
                <textarea
                  required
                  placeholder="e.g. Find the local derivative of dy/dx..."
                  value={newText}
                  onChange={e => setNewText(e.target.value)}
                  rows={2}
                  className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 font-medium mb-1">Category</label>
                  <select
                    value={newCat}
                    onChange={e => setNewCat(e.target.value)}
                    className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3 py-2">
                    <option value="Quantum Mechanics">Quantum Mechanics</option>
                    <option value="Algebra">Algebra</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-medium mb-1">Difficulty</label>
                  <select
                    value={newDiff}
                    onChange={e => setNewDiff(e.target.value as Question['difficulty'])}
                    className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3 py-2">
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1">Question Type</label>
                <select
                  value={newType}
                  onChange={e => setNewType(e.target.value as Question['type'])}
                  className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none">
                  <option value="Multiple Choice">Multiple Choice</option>
                  <option value="Written Equation">Written Equation / Short Answer</option>
                </select>
              </div>

              {newType === 'Multiple Choice' && (
                <div>
                  <label className="block text-[11px] text-slate-400 font-medium mb-1">Options list (one option per line)</label>
                  <textarea
                    value={newOptions}
                    onChange={e => setNewOptions(e.target.value)}
                    rows={4}
                    className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none resize-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1">Correct Answer Key</label>
                <input
                  type="text"
                  required
                  placeholder="Paste the precise option text or written formula key..."
                  value={newCorrect}
                  onChange={e => setNewCorrect(e.target.value)}
                  className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2.5 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-[12px] font-semibold text-slate-400 hover:bg-white/5 transition-all">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-[12px] font-semibold hover:bg-blue-500 transition-all">
                  Save to Repository
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
