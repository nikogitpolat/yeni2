import { useState } from 'react';
import { 
  Plus, Calendar, Award, CheckCircle2, 
  ChevronRight, ArrowLeft, Download
} from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  classGroup: string;
  dueDate: string;
  maxScore: number;
  status: 'Published' | 'Draft';
  submissionsCount: number;
  gradedCount: number;
  totalStudents: number;
  instructions: string;
}

interface Submission {
  studentId: string;
  studentName: string;
  submittedAt: string;
  status: 'Graded' | 'Pending Review' | 'Missing';
  fileAttachment?: string;
  score?: number;
  feedback?: string;
}

const initialAssignments: Assignment[] = [
  {
    id: 'asm-1',
    title: 'Electromagnetic Field Theory Problem Set',
    classGroup: 'Grade 11C Physics',
    dueDate: 'July 18, 2026',
    maxScore: 100,
    status: 'Published',
    submissionsCount: 18,
    gradedCount: 12,
    totalStudents: 24,
    instructions: 'Please answer questions 1 through 10 in detail. Show all formula derivations and upload a clean scanned PDF of your handwritten worksheets.',
  },
  {
    id: 'asm-2',
    title: 'Quantum Wavefunctions Essay',
    classGroup: 'Grade 11C Physics',
    dueDate: 'July 25, 2026',
    maxScore: 50,
    status: 'Published',
    submissionsCount: 4,
    gradedCount: 0,
    totalStudents: 24,
    instructions: 'Explain the physical significance of the Schrödinger equation wavefunction. Support your points with historical contexts (Bohr-Einstein debate).',
  },
  {
    id: 'asm-3',
    title: 'Kinetic Theory Formula Lab Report',
    classGroup: 'Grade 10B Physics',
    dueDate: 'Draft',
    maxScore: 100,
    status: 'Draft',
    submissionsCount: 0,
    gradedCount: 0,
    totalStudents: 18,
    instructions: 'Provide summary graphs of heat transfer simulator data. Identify anomalous nodes.',
  }
];

const mockSubmissions: Record<string, Submission[]> = {
  'asm-1': [
    { studentId: 's-1', studentName: 'Emma Johnson', submittedAt: 'July 10, 4:15 PM', status: 'Graded', fileAttachment: 'Emma_Johnson_EM_Fields.pdf', score: 98, feedback: 'Excellent formula work on question 7!' },
    { studentId: 's-2', studentName: 'Lucas Rivera', submittedAt: 'July 11, 2:30 AM', status: 'Pending Review', fileAttachment: 'LucasR_Electromagnetism.pdf' },
    { studentId: 's-3', studentName: 'Sophia Patel', submittedAt: 'July 11, 8:45 AM', status: 'Pending Review', fileAttachment: 'Sophia_P_Field_Derivations.pdf' },
    { studentId: 's-4', studentName: 'Alex Morrison', submittedAt: '—', status: 'Missing' },
  ]
};

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [selectedAsmId, setSelectedAsmId] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<Record<string, Submission[]>>(mockSubmissions);
  const [gradingSubId, setGradingSubId] = useState<string | null>(null);
  
  // Grading forms state
  const [gradeInput, setGradeInput] = useState<number | ''>('');
  const [feedbackInput, setFeedbackInput] = useState('');

  // Creation State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newClassGroup, setNewClassGroup] = useState('Grade 11C Physics');
  const [newDueDate, setNewDueDate] = useState('');
  const [newMaxScore, setNewMaxScore] = useState(100);
  const [newInstructions, setNewInstructions] = useState('');

  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const selectedAsm = assignments.find(a => a.id === selectedAsmId);

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDueDate) return;
    const newAsm: Assignment = {
      id: `asm-${Date.now()}`,
      title: newTitle,
      classGroup: newClassGroup,
      dueDate: newDueDate,
      maxScore: newMaxScore,
      status: 'Published',
      submissionsCount: 0,
      gradedCount: 0,
      totalStudents: newClassGroup.includes('11C') ? 24 : 18,
      instructions: newInstructions,
    };
    setAssignments([newAsm, ...assignments]);
    setShowCreateModal(false);
    setNewTitle('');
    setNewDueDate('');
    setNewInstructions('');
    showToast(`Assignment "${newTitle}" created & published!`);
  };

  const handlePublishDraft = (id: string) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, status: 'Published', dueDate: 'July 30, 2026' } : a));
    showToast('Draft assignment has been published to class stream.');
  };

  const handleGradeSubmission = (sub: Submission) => {
    setGradingSubId(sub.studentId);
    setGradeInput(sub.score !== undefined ? sub.score : '');
    setFeedbackInput(sub.feedback || '');
  };

  const handleSaveGrade = (studentId: string) => {
    if (!selectedAsmId) return;
    const currentSubs = submissions[selectedAsmId] || [];
    const scoreVal = Number(gradeInput) || 0;
    
    const updated = currentSubs.map(s => 
      s.studentId === studentId 
        ? { ...s, status: 'Graded' as const, score: scoreVal, feedback: feedbackInput } 
        : s
    );

    setSubmissions({
      ...submissions,
      [selectedAsmId]: updated
    });

    // Update assignment counter
    setAssignments(assignments.map(a => 
      a.id === selectedAsmId 
        ? { ...a, gradedCount: a.gradedCount + (currentSubs.find(s => s.studentId === studentId)?.status !== 'Graded' ? 1 : 0) } 
        : a
    ));

    setGradingSubId(null);
    showToast(`Grade submitted for student!`);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden h-full">
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-xl shadow-2xl text-[13px] font-medium border border-blue-400 animate-fade-in">
          <CheckCircle2 size={15} />
          {toast}
        </div>
      )}

      {!selectedAsmId ? (
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-[1400px] mx-auto space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[22px] font-bold text-white tracking-tight">Assignments & Quizzes</h1>
                <p className="text-[12px] text-slate-500 mt-0.5">Publish coursework worksheets, manage grade criteria, and check student files.</p>
              </div>

              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all duration-200 hover:opacity-95"
                style={{ background: 'linear-gradient(135deg, #3B82F6, #06B6D4)' }}>
                <Plus size={15} />
                Create Assignment
              </button>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-4">
              {assignments.map(asm => (
                <div key={asm.id} className="card-hover p-5 rounded-2xl border flex items-center justify-between" style={{ background: '#0D1220' }}>
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] font-bold text-slate-400 bg-white/5 border border-slate-800 px-2 py-0.5 rounded">
                        {asm.classGroup}
                      </span>
                      {asm.status === 'Draft' ? (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          DRAFT
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          PUBLISHED
                        </span>
                      )}
                    </div>

                    <h3 className="text-[14px] font-bold text-white tracking-tight truncate max-w-lg">{asm.title}</h3>
                    
                    <div className="flex items-center gap-4 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1"><Calendar size={11} /> Due Date: {asm.dueDate}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Award size={11} /> Max Points: {asm.maxScore}</span>
                    </div>
                  </div>

                  {/* Submission and grade review */}
                  <div className="flex items-center gap-5 flex-shrink-0">
                    {asm.status === 'Draft' ? (
                      <button 
                        onClick={() => handlePublishDraft(asm.id)}
                        className="px-4 py-2 rounded-xl text-[11px] font-bold bg-blue-600/15 text-blue-400 border border-blue-500/10 hover:bg-blue-600/25 transition-all">
                        Publish Homework
                      </button>
                    ) : (
                      <div className="text-right">
                        <p className="text-[11px] text-slate-400">Submissions Status</p>
                        <p className="text-[13px] font-bold text-white mt-0.5">
                          {asm.submissionsCount} <span className="text-slate-600">/ {asm.totalStudents}</span>
                        </p>
                      </div>
                    )}

                    {asm.status === 'Published' && (
                      <button
                        onClick={() => setSelectedAsmId(asm.id)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-bold border border-slate-800 text-blue-400 hover:text-blue-300 hover:bg-white/5 transition-all">
                        Evaluate Submissions
                        <ChevronRight size={13} />
                      </button>
                    )}
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      ) : (
        /* Assignment Submissions Workspace */
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-[1400px] mx-auto space-y-6">
            
            {/* Header Details */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => { setSelectedAsmId(null); setGradingSubId(null); }}
                  className="w-8 h-8 rounded-xl border flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                  style={{ borderColor: '#1C2D42' }}>
                  <ArrowLeft size={14} />
                </button>
                <div>
                  <h1 className="text-[18px] font-bold text-white tracking-tight">{selectedAsm?.title}</h1>
                  <p className="text-[11px] text-slate-500 mt-0.5">Workspace Class: <span className="text-slate-300 font-semibold">{selectedAsm?.classGroup}</span></p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-500">Grading state: <span className="text-emerald-400 font-bold">{selectedAsm?.gradedCount} / {selectedAsm?.submissionsCount} evaluated</span></span>
              </div>
            </div>

            {/* Instruction Card */}
            <div className="p-4 rounded-xl border" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
              <p className="text-[11.5px] font-semibold text-slate-300">Homework Guidelines</p>
              <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">{selectedAsm?.instructions}</p>
            </div>

            {/* Submissions List & Grading Pane Side-by-Side */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              
              {/* Submission Roster List */}
              <div className="lg:col-span-2 space-y-3">
                <h3 className="text-[13px] font-bold text-white">Student Submission Board</h3>
                <div className="space-y-2.5">
                  {(submissions[selectedAsmId] || []).map(sub => (
                    <div key={sub.studentId} className="p-4 rounded-xl border flex items-center justify-between" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
                      <div className="space-y-1">
                        <p className="text-[12.5px] font-bold text-white">{sub.studentName}</p>
                        <p className="text-[10px] text-slate-500">Uploaded: {sub.submittedAt}</p>
                        {sub.fileAttachment && (
                          <div className="flex items-center gap-1.5 text-[10px] text-blue-400 font-semibold cursor-pointer hover:underline mt-1.5">
                            <Download size={11} /> {sub.fileAttachment}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-4">
                        {sub.status === 'Graded' ? (
                          <div className="text-right">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">GRADED</span>
                            <p className="text-[13px] font-bold text-emerald-400 mt-1">{sub.score} <span className="text-[10px] text-slate-500">/ {selectedAsm?.maxScore}</span></p>
                          </div>
                        ) : sub.status === 'Pending Review' ? (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold animate-pulse">PENDING REVIEW</span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 font-bold">MISSING</span>
                        )}

                        {sub.status !== 'Missing' && (
                          <button
                            onClick={() => handleGradeSubmission(sub)}
                            className="px-3.5 py-1.5 rounded-xl border border-slate-800 text-[11px] font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                            {sub.status === 'Graded' ? 'Edit Grade' : 'Score Assignment'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grading Pane */}
              <div className="p-5 rounded-2xl border h-fit" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
                {gradingSubId ? (
                  <div className="space-y-4">
                    <h4 className="text-[13px] font-bold text-white">Grading Worksheet</h4>
                    <p className="text-[11px] text-slate-500">Provide scores and feedback for <span className="text-white font-semibold">{(submissions[selectedAsmId] || []).find(s => s.studentId === gradingSubId)?.studentName}</span>.</p>
                    
                    <div>
                      <label className="block text-[11px] text-slate-400 font-medium mb-1.5">Assigned Points (Max {selectedAsm?.maxScore})</label>
                      <input
                        type="number"
                        placeholder="e.g. 95"
                        value={gradeInput}
                        onChange={e => setGradeInput(e.target.value ? Number(e.target.value) : '')}
                        className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 font-medium mb-1.5">Constructive Comments & Remarks</label>
                      <textarea
                        placeholder="Well derived formulas! Make sure to watch out for signs in equations..."
                        value={feedbackInput}
                        onChange={e => setFeedbackInput(e.target.value)}
                        rows={3}
                        className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none focus:border-blue-500 resize-none"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => setGradingSubId(null)}
                        className="flex-1 py-2 rounded-xl text-[11px] font-bold border border-slate-800 text-slate-400 hover:bg-white/5 transition-colors">
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveGrade(gradingSubId)}
                        className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold transition-colors">
                        Return Work
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-10 h-10 rounded-full bg-slate-800/60 flex items-center justify-center mx-auto mb-2.5">
                      <Award size={16} className="text-slate-500" />
                    </div>
                    <p className="text-[12px] text-slate-400 font-semibold">No submission selected</p>
                    <p className="text-[10px] text-slate-600 mt-1 max-w-[200px] mx-auto">Select a student submission from the worksheet left to score it.</p>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Creation Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border p-6 animate-fade-in"
            style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
            <h2 className="text-[16px] font-bold text-white mb-1">Create Assignment</h2>
            <p className="text-[11px] text-slate-500 mb-4 font-normal">Create comprehensive homework worksheets, grade requirements, and distribute instructions immediately.</p>
            
            <form onSubmit={handleCreateAssignment} className="space-y-4">
              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1">Assignment Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Midterm Electromagnetic Field Exercises"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 font-medium mb-1">Roster Class</label>
                  <select
                    value={newClassGroup}
                    onChange={e => setNewClassGroup(e.target.value)}
                    className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none focus:border-blue-500 transition-all">
                    <option value="Grade 11C Physics">Grade 11C Physics</option>
                    <option value="Grade 10B Math">Grade 10B Math</option>
                    <option value="Grade 9A Calculus">Grade 9A Calculus</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-medium mb-1">Maximum Points</label>
                  <input
                    type="number"
                    value={newMaxScore}
                    onChange={e => setNewMaxScore(Number(e.target.value))}
                    className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1">Due Date</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. July 25, 2026"
                  value={newDueDate}
                  onChange={e => setNewDueDate(e.target.value)}
                  className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1">Instructions</label>
                <textarea
                  placeholder="Clearly outline assignment details, expected formats, and attached materials..."
                  value={newInstructions}
                  onChange={e => setNewInstructions(e.target.value)}
                  rows={3}
                  className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none focus:border-blue-500 resize-none"
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
                  Publish Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
