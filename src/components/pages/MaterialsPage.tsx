import { useState } from 'react';
import { 
  Folder, File, Search, MoreVertical, 
  Trash2, Edit3, Download, Share2, CheckCircle2, Upload
} from 'lucide-react';

interface MaterialItem {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'link' | 'video' | 'doc';
  size?: string;
  updatedAt: string;
  url?: string;
}

const initialMaterials: MaterialItem[] = [
  { id: 'm-f1', name: 'Quantum Mechanics Core Slides', type: 'folder', updatedAt: 'July 10, 2026' },
  { id: 'm-f2', name: 'Homework Formula Sheets', type: 'folder', updatedAt: 'July 08, 2026' },
  { id: 'm-1', name: 'Schrodinger Wave Theory Manual.pdf', type: 'pdf', size: '3.4 MB', updatedAt: 'July 05, 2026' },
  { id: 'm-2', name: 'Bohr Hydrogen Orbit Simulator', type: 'link', updatedAt: 'July 01, 2026', url: 'https://phet.colorado.edu/hydrogen' },
  { id: 'm-3', name: 'Superconductor Meissner Lecture.mp4', type: 'video', size: '142 MB', updatedAt: 'June 28, 2026' },
];

export default function MaterialsPage() {
  const [items, setItems] = useState<MaterialItem[]>(initialMaterials);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'folder' | 'pdf' | 'link'>('all');
  
  // Modals / Interaction State
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadName, setUploadName] = useState('');
  const [uploadType, setUploadType] = useState<'pdf' | 'link'>('pdf');
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<MaterialItem | null>(null);

  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName) return;
    const newFld: MaterialItem = {
      id: `m-f-${Date.now()}`,
      name: folderName,
      type: 'folder',
      updatedAt: 'Today'
    };
    setItems([newFld, ...items]);
    setFolderName('');
    setShowFolderModal(false);
    triggerToast(`Folder "${folderName}" created successfully!`);
  };

  const handleUploadItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadName) return;
    const newUpload: MaterialItem = {
      id: `m-up-${Date.now()}`,
      name: uploadType === 'pdf' ? `${uploadName}.pdf` : uploadName,
      type: uploadType,
      size: uploadType === 'pdf' ? '1.2 MB' : undefined,
      updatedAt: 'Today',
      url: uploadType === 'link' ? 'https://google.com' : undefined,
    };
    setItems([newUpload, ...items]);
    setUploadName('');
    setShowUploadModal(false);
    triggerToast(`Resource uploaded successfully!`);
  };

  const handleDeleteItem = (id: string) => {
    const item = items.find(i => i.id === id);
    setItems(items.filter(i => i.id !== id));
    setActiveItemId(null);
    triggerToast(`"${item?.name}" deleted.`);
  };

  const handleRenameItem = (id: string) => {
    const newName = prompt('Enter new name:');
    if (newName) {
      setItems(items.map(i => i.id === id ? { ...i, name: newName } : i));
      triggerToast('Resource renamed successfully.');
    }
    setActiveItemId(null);
  };

  const filteredItems = items.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' ? true : i.type === filterType;
    return matchesSearch && matchesFilter;
  });

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
              <h1 className="text-[22px] font-bold text-white tracking-tight">Class Materials</h1>
              <p className="text-[12px] text-slate-500 mt-0.5">Secure, cloud-hosted files, learning guides, simulator shortcuts, and slides.</p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setShowFolderModal(true)}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-[11px] font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                style={{ borderColor: '#1C2D42' }}>
                Create Folder
              </button>
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all duration-200 hover:opacity-95"
                style={{ background: 'linear-gradient(135deg, #3B82F6, #06B6D4)' }}>
                <Upload size={14} />
                Upload File / Link
              </button>
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl border" style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
            <div className="flex items-center gap-2">
              {[
                { id: 'all', label: 'All Files' },
                { id: 'folder', label: 'Folders' },
                { id: 'pdf', label: 'PDF Guides' },
                { id: 'link', label: 'Shared Links' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterType(f.id as 'all' | 'folder' | 'pdf' | 'link')}
                  className="px-3.5 py-1.5 rounded-xl text-[12px] font-medium transition-all"
                  style={{
                    background: filterType === f.id ? 'rgba(59,130,246,0.12)' : 'transparent',
                    color: filterType === f.id ? '#60A5FA' : '#64748B',
                    border: filterType === f.id ? '1px solid rgba(59,130,246,0.2)' : '1px solid transparent',
                  }}>
                  {f.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border w-48"
              style={{ background: 'rgba(255,255,255,0.02)', borderColor: '#1C2D42' }}>
              <Search size={13} className="text-slate-500" />
              <input
                type="text"
                placeholder="Search file name..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent text-white text-[11px] placeholder-slate-600 focus:outline-none w-full"
              />
            </div>
          </div>

          {/* Directory listing layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                onClick={() => { if (item.type !== 'folder') setPreviewItem(item); }}
                className="card-hover p-4 rounded-2xl border relative flex flex-col justify-between h-40 cursor-pointer" 
                style={{ background: '#0D1220' }}>
                
                <div>
                  <div className="flex items-start justify-between">
                    {/* Icon by type */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      item.type === 'folder' ? 'bg-amber-500/10 text-amber-400' :
                      item.type === 'pdf' ? 'bg-rose-500/10 text-rose-400' :
                      item.type === 'link' ? 'bg-blue-500/10 text-blue-400' : 'bg-cyan-500/10 text-cyan-400'
                    }`}>
                      {item.type === 'folder' ? <Folder size={20} /> : <File size={20} />}
                    </div>

                    {/* Context menu toggle */}
                    <div className="relative">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveItemId(activeItemId === item.id ? null : item.id); }}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-white transition-colors">
                        <MoreVertical size={14} />
                      </button>

                      {activeItemId === item.id && (
                        <div className="absolute right-0 mt-1.5 w-32 rounded-xl border shadow-2xl z-20 py-1.5"
                          style={{ background: '#121829', borderColor: '#1C2D42' }}>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleRenameItem(item.id); }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 text-left text-[11px] text-slate-300 hover:bg-white/5 hover:text-white transition-all">
                            <Edit3 size={11} /> Rename
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleDeleteItem(item.id); }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 text-left text-[11px] text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all">
                            <Trash2 size={11} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className="text-[12px] font-bold text-white mt-3.5 tracking-tight truncate" title={item.name}>
                    {item.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between mt-3 text-[10px] text-slate-500 border-t border-slate-800/60 pt-2.5">
                  <span>{item.type === 'folder' ? 'Roster Folder' : item.size || 'Shared URL'}</span>
                  <span>{item.updatedAt}</span>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Preview Dialog Overlay */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border p-6 animate-fade-in"
            style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <h2 className="text-[14px] font-bold text-white">Document Preview</h2>
              <button 
                onClick={() => setPreviewItem(null)}
                className="text-[11px] text-slate-500 hover:text-white transition-colors">Close</button>
            </div>

            <div className="p-8 border rounded-xl text-center bg-slate-900/30 border-slate-800 space-y-4">
              <File size={36} className="text-blue-400 mx-auto" />
              <div>
                <p className="text-[13px] font-bold text-slate-200 truncate">{previewItem.name}</p>
                <p className="text-[10px] text-slate-500 mt-1">{previewItem.size || 'Shared Web Asset'} • {previewItem.updatedAt}</p>
              </div>

              {previewItem.url && (
                <a 
                  href={previewItem.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold transition-all">
                  Visit URL <Share2 size={11} />
                </a>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 mt-5">
              <button
                onClick={() => { setPreviewItem(null); triggerToast('Material downloaded successfully!'); }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600/15 text-blue-400 border border-blue-500/10 hover:bg-blue-600/25 text-[11px] font-bold transition-all">
                <Download size={12} /> Download Resource
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Folder Modal */}
      {showFolderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border p-6 animate-fade-in"
            style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
            <h2 className="text-[15px] font-bold text-white mb-4">Create Resource Folder</h2>
            
            <form onSubmit={handleCreateFolder} className="space-y-4">
              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1.5">Folder Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Core Lecture Slides"
                  value={folderName}
                  onChange={e => setFolderName(e.target.value)}
                  className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowFolderModal(false)}
                  className="px-4 py-2 rounded-xl text-[12px] font-semibold text-slate-400 hover:bg-white/5 transition-all">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-[12px] font-semibold hover:bg-blue-500 transition-all">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Material Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border p-6 animate-fade-in"
            style={{ background: '#0D1220', borderColor: '#1C2D42' }}>
            <h2 className="text-[15px] font-bold text-white mb-4">Upload / Add Class Material</h2>
            
            <form onSubmit={handleUploadItem} className="space-y-4">
              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1.5">Resource Name / Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bohr Hydrogen Simulator Link"
                  value={uploadName}
                  onChange={e => setNewTitle(e.target.value)} // wait, it's setUploadName
                  className="w-full bg-white/5 border border-slate-800 text-white rounded-xl text-[12px] px-3.5 py-2.5 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1.5">Resource Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setUploadType('pdf')}
                    className={`py-2 rounded-xl text-[11px] font-bold border transition-all ${
                      uploadType === 'pdf' ? 'bg-blue-600/15 text-blue-400 border-blue-500/20' : 'bg-white/5 border-slate-800 text-slate-400'
                    }`}>
                    PDF Document
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadType('link')}
                    className={`py-2 rounded-xl text-[11px] font-bold border transition-all ${
                      uploadType === 'link' ? 'bg-blue-600/15 text-blue-400 border-blue-500/20' : 'bg-white/5 border-slate-800 text-slate-400'
                    }`}>
                    Hyperlink / URL
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-[12px] font-semibold text-slate-400 hover:bg-white/5 transition-all">
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    // Let's manually trigger upload action to avoid form issue
                    e.preventDefault();
                    if (!uploadName) return;
                    const newUpload: MaterialItem = {
                      id: `m-up-${Date.now()}`,
                      name: uploadType === 'pdf' ? `${uploadName}.pdf` : uploadName,
                      type: uploadType,
                      size: uploadType === 'pdf' ? '1.2 MB' : undefined,
                      updatedAt: 'Today',
                      url: uploadType === 'link' ? 'https://google.com' : undefined,
                    };
                    setItems([newUpload, ...items]);
                    setUploadName('');
                    setShowUploadModal(false);
                    triggerToast(`Resource uploaded successfully!`);
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-[12px] font-semibold hover:bg-blue-500 transition-all">
                  Upload Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
