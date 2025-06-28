import React from 'react';

const WELCOME_MESSAGES: Record<string, string> = {
    en: 'Welcome to Cosmic Compass!',
    es: '¡Bienvenido a la Brújula Cósmica!',
    fr: 'Bienvenue sur Cosmic Compass !',
    zh: '欢迎来到宇宙指南针！',
    ja: 'コズミックコンパスへようこそ！',
    de: 'Willkommen bei Cosmic Compass!',
    ru: 'Добро пожаловать в Cosmic Compass!',
};

interface HeaderProps {
    language: string;
}

const Header: React.FC<HeaderProps> = ({ language }) => {
    const welcome = WELCOME_MESSAGES[language] || WELCOME_MESSAGES.en;
    return (
        <header className="flex flex-col items-center justify-center pt-8 pb-4 sm:pt-12 sm:pb-6">
            <img src="/images/header/cosmic_compass_no_bg.png" alt="Cosmic Compass Logo" className="w-48 h-auto sm:w-56 md:w-64" />
            <div className="mt-2 text-xl font-semibold text-white">{welcome}</div>
        </header>
    );
};

export default Header;