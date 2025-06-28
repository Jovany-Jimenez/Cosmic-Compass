export type ZodiacSignName = "Aries" | "Taurus" | "Gemini" | "Cancer" | "Leo" | "Virgo" | "Libra" | "Scorpio" | "Sagittarius" | "Capricorn" | "Aquarius" | "Pisces";

export type Period = 'Daily' | 'Weekly' | 'Monthly';

export interface ZodiacSign {
    name: ZodiacSignName;
    dateRange: string;
    imageUrl: string;
}

export interface CachedHoroscopeData {
    horoscopes: Record<Period, string>;
}
