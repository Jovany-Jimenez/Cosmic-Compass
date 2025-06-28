import React from 'react';
import type { ZodiacSign } from '../types';
import { ZODIAC_SIGNS } from '../constants';

interface SignSelectorProps {
    onSignSelect: (sign: ZodiacSign) => void;
}

const SignSelector: React.FC<SignSelectorProps> = ({ onSignSelect }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 pb-8">
            {ZODIAC_SIGNS.map((sign) => (
                <button
                    key={sign.name}
                    onClick={() => onSignSelect(sign)}
                    className="group flex flex-col items-center p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105"
                    aria-label={sign.name}
                >
                    <img src={sign.imageUrl} alt={sign.name} className="w-16 h-16 object-contain" />
                    <span className="mt-2 font-semibold text-sm text-white text-center">{sign.name}</span>
                </button>
            ))}
        </div>
    );
};

export default SignSelector;