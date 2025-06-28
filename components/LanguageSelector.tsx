import React from 'react';

const LANGUAGES = [
  { code: 'en', name: 'English', emoji: '🇺🇸' },
  { code: 'es', name: 'Español', emoji: '🇪🇸' },
  { code: 'fr', name: 'Français', emoji: '🇫🇷' },
  { code: 'zh', name: '中文', emoji: '🇨🇳' },
  { code: 'ja', name: '日本語', emoji: '🇯🇵' },
  { code: 'de', name: 'Deutsch', emoji: '🇩🇪' },
  { code: 'ru', name: 'Русский', emoji: '🇷🇺' },
];

interface LanguageSelectorProps {
  value: string;
  onChange: (lang: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ value, onChange }) => {
  const [open, setOpen] = React.useState(false);
  const selected = LANGUAGES.find(l => l.code === value) || LANGUAGES[0];

  return (
    <div className="relative inline-block text-left z-50">
      <button
        className="flex items-center px-4 py-2 bg-white text-slate-900 rounded-full shadow-lg border border-slate-200 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-2xl mr-2">{selected.emoji}</span>
        <span className="font-semibold mr-2">{selected.name}</span>
        <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <ul className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 max-h-72 overflow-auto animate-fade-in" role="listbox">
          {LANGUAGES.map(lang => (
            <li
              key={lang.code}
              className={`flex items-center px-4 py-2 cursor-pointer hover:bg-cyan-100 transition ${lang.code === value ? 'bg-cyan-50 font-bold text-slate-900' : 'text-slate-900'}`}
              onClick={() => { onChange(lang.code); setOpen(false); }}
              role="option"
              aria-selected={lang.code === value}
            >
              <span className="text-2xl mr-2">{lang.emoji}</span>
              <span>{lang.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector; 