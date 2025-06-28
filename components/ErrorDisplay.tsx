
import React from 'react';

interface ErrorDisplayProps {
    message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
    return (
        <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg relative w-full max-w-md text-center" role="alert">
            <strong className="font-bold block sm:inline">Cosmic Disturbance! </strong>
            <span className="block sm:inline">{message}</span>
        </div>
    );
};

export default ErrorDisplay;