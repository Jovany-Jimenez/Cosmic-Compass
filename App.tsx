import React, { useState } from 'react';
import type { ZodiacSign } from './types';
import SignSelector from './components/SignSelector';
import HoroscopeDetail from './components/HoroscopeCard';
import DateSelector from './components/DateSelector';
import Header from './components/Header';
import LanguageSelector from './components/LanguageSelector';

const App: React.FC = () => {
    const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [language, setLanguage] = useState('en');

    const handleSignSelect = (sign: ZodiacSign) => {
        setSelectedSign(sign);
    };

    const handleBack = () => {
        setSelectedSign(null);
    };

    return (
        <div className="app-container">
            <div 
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-20"
                style={{backgroundImage: 'url(https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2093&auto=format&fit=crop)', zIndex: 0}}
            ></div>
            <div className="relative z-10 flex-grow flex flex-col">
                {selectedSign ? (
                    <HoroscopeDetail sign={selectedSign} onBack={handleBack} selectedDate={selectedDate} language={language} />
                ) : (
                    <main className="flex-grow flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-end pt-6 pb-2">
                            <LanguageSelector value={language} onChange={setLanguage} />
                        </div>
                        <Header language={language} />
                        <div className="mt-4 sm:mt-8">
                            <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
                        </div>
                        <div className="mt-8">
                            <SignSelector onSignSelect={handleSignSelect} />
                        </div>
                         <footer className="text-center text-slate-500 text-xs py-4 mt-auto">
                            <p>Created for Sara H. G. 2025</p>
                        </footer>
                    </main>
                )}
            </div>
        </div>
    );
};

export default App;