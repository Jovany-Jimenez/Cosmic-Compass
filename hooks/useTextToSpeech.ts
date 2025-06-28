import { useState, useEffect } from 'react';

const useTextToSpeech = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const synth = window.speechSynthesis;

    const speak = (text: string, lang: string) => {
        if (synth.speaking) {
            synth.cancel();
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = (e) => {
            console.error('Speech synthesis error', e);
            setIsSpeaking(false);
        };
        synth.speak(utterance);
        setIsSpeaking(true);
    };

    const cancel = () => {
        synth.cancel();
        setIsSpeaking(false);
    };

    useEffect(() => {
        const handleBeforeUnload = () => {
            synth.cancel();
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            synth.cancel();
        };
    }, [synth]);

    return { isSpeaking, speak, cancel };
};

export default useTextToSpeech; 