import React from 'react';
import type { ZodiacSign } from '../types';
import DateSelector from './DateSelector';

interface ControlPanelProps {
    selectedSignData: ZodiacSign | undefined;
    selectedDate: Date;
    onDateChange: (date: Date) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ selectedSignData, selectedDate, onDateChange }) => {
    return (
        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 md:p-6 w-full z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    {selectedSignData ? (
                        <>
                            <div>
                                <img src={selectedSignData.iconUrl} alt={selectedSignData.name} className="w-16 h-16 object-contain" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">{selectedSignData.name}</h2>
                                <p className="text-slate-400">{selectedSignData.dateRange}</p>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-4 h-[72px]">
                             <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                             </div>
                             <h2 className="text-2xl font-bold text-slate-300">Select a Sign</h2>
                        </div>
                    )}
                </div>
                <div className="w-full md:w-auto">
                    <DateSelector
                        selectedDate={selectedDate}
                        onDateChange={onDateChange}
                        disabled={!selectedSignData}
                    />
                </div>
            </div>
        </section>
    );
};

export default ControlPanel;