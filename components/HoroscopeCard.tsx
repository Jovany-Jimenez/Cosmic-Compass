import React, { useState, useEffect } from 'react';
import type { ZodiacSign, Period, CachedHoroscopeData } from '../types';
import { fetchHoroscope } from '../services/horoscopeService.ts';
import Loader from './Loader';
import ErrorDisplay from './ErrorDisplay';
import useTextToSpeech from '../hooks/useTextToSpeech';
import translate from 'translate';

interface HoroscopeDetailProps {
    sign: ZodiacSign;
    onBack: () => void;
    selectedDate: Date;
    language: string;
}

const isToday = (date: Date) => {
    const today = new Date();
    return date.getFullYear() === today.getFullYear() &&
           date.getMonth() === today.getMonth() &&
           date.getDate() === today.getDate();
};

const isYesterday = (date: Date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.getFullYear() === yesterday.getFullYear() &&
           date.getMonth() === yesterday.getMonth() &&
           date.getDate() === yesterday.getDate();
};

const isTomorrow = (date: Date) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return date.getFullYear() === tomorrow.getFullYear() &&
           date.getMonth() === tomorrow.getMonth() &&
           date.getDate() === tomorrow.getDate();
};

const formatDateForApi = (date: Date): string => {
    if (isToday(date)) return 'TODAY';
    if (isYesterday(date)) return 'YESTERDAY';
    if (isTomorrow(date)) return 'TOMORROW';
    return date.toISOString().split('T')[0];
};

const horoscopeCache = new Map<string, CachedHoroscopeData>();
const periods: Period[] = ['Daily', 'Weekly', 'Monthly'];

const HoroscopeDetail: React.FC<HoroscopeDetailProps> = ({ sign, onBack, selectedDate, language }) => {
    const { isSpeaking, speak, cancel } = useTextToSpeech();
    const [period, setPeriod] = useState<Period>('Daily');
    const [cachedData, setCachedData] = useState<CachedHoroscopeData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [translatedHoroscope, setTranslatedHoroscope] = useState<string>('');
    const translationCache = React.useRef(new Map<string, string>());

    useEffect(() => {
        const getHoroscopeData = async () => {
            setIsLoading(true);
            setError(null);
            const dateString = formatDateForApi(selectedDate);
            const cacheKey = `${sign.name}-${dateString}`;

            if (horoscopeCache.has(cacheKey)) {
                setCachedData(horoscopeCache.get(cacheKey)!);
                setIsLoading(false);
                return;
            }

            try {
                const horoscopePromises = periods.map(p => fetchHoroscope(sign.name, p, dateString));
                const fetchedHoroscopes = await Promise.all(horoscopePromises);
                const newData: CachedHoroscopeData = {
                    horoscopes: {
                        'Daily': fetchedHoroscopes[0],
                        'Weekly': fetchedHoroscopes[1],
                        'Monthly': fetchedHoroscopes[2],
                    },
                };
                horoscopeCache.set(cacheKey, newData);
                setCachedData(newData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setIsLoading(false);
            }
        };
        getHoroscopeData();
    }, [sign, selectedDate]);
    
    const currentHoroscope = cachedData?.horoscopes[period];

    useEffect(() => {
        if (!currentHoroscope) return;
        const lang = language;
        const cacheKey = `${sign.name}-${period}-${lang}-${currentHoroscope}`;
        if (lang === 'en') {
            setTranslatedHoroscope(currentHoroscope);
            return;
        }
        if (translationCache.current.has(cacheKey)) {
            setTranslatedHoroscope(translationCache.current.get(cacheKey)!);
            return;
        }
        (async () => {
            try {
                const translated = await translate(currentHoroscope, { to: lang });
                translationCache.current.set(cacheKey, translated);
                setTranslatedHoroscope(translated);
            } catch (err) {
                setTranslatedHoroscope(currentHoroscope);
            }
        })();
    }, [currentHoroscope, language, sign.name, period]);

    const handleToggleSpeech = () => {
        if (isSpeaking) {
            cancel();
        } else {
            speak(translatedHoroscope, language);
        }
    };

    return (
        <div className="flex flex-col w-full min-h-full fade-in text-slate-300">
            <div className="p-4 sm:p-6">
                <button onClick={onBack} className="p-2 rounded-full bg-white/10 hover:bg-white/20" aria-label="Go back">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
            </div>

            <div className="flex-grow overflow-y-auto scroll-container -mt-4 px-4 sm:px-6 pb-8">
                <div className="max-w-4xl mx-auto">
                    <img src={sign.imageUrl} alt={sign.name} className="w-48 h-48 sm:w-56 sm:h-56 mx-auto object-contain drop-shadow-lg" />
                    <h2 className="text-4xl sm:text-5xl font-bold text-center text-white mt-2">{sign.name}</h2>
                    <p className="text-center text-slate-400 mb-6 sm:text-lg">{sign.dateRange}</p>

                    <div className="flex justify-center items-center bg-slate-800 rounded-full p-1 my-6 sm:my-8 max-w-md mx-auto">
                        {periods.map(p => (
                            <button key={p} onClick={() => setPeriod(p)} className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-full flex-1 transition-colors duration-300 ${
                                period === p ? 'bg-white text-slate-900 shadow-md' : 'text-slate-300 hover:bg-slate-700'
                            }`}>
                                {p}
                            </button>
                        ))}
                    </div>

                    <div className="min-h-[200px] text-base sm:text-lg leading-relaxed sm:leading-loose">
                        {isLoading && <div className="pt-8"><Loader /></div>}
                        {error && <ErrorDisplay message={error} />}
                        {!isLoading && !error && cachedData && (
                            <div className="fade-in">
                                {translatedHoroscope && (
                                    <div>
                                        <div dangerouslySetInnerHTML={{ __html: translatedHoroscope.replace(/(\\n\\n)/g, '<br/><br/>').replace(/\\n/g, '<br/>') }}></div>
                                        <div className="flex justify-start mt-4">
                                            <button onClick={handleToggleSpeech} className="p-2 rounded-full bg-slate-700 hover:bg-slate-600" aria-label={isSpeaking ? 'Stop reading' : 'Read horoscope'}>
                                                {isSpeaking ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.858 8.464a5 5 0 000 7.072m2.828 9.9a9 9 0 000-12.728" /></svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HoroscopeDetail;
