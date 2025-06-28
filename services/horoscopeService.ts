import type { ZodiacSignName, Period } from '../types';

export const fetchHoroscope = async (
    sign: ZodiacSignName, 
    period: Period,
    date: string // e.g., '2024-07-13'
): Promise<string> => {
    
    let url;
    // The API expects lowercase sign names, e.g., "aries", "taurus"
    const signName = sign.toLowerCase();
    
    switch (period) {
        case 'Daily':
            url = `/api/get-horoscope/daily?sign=${signName}&day=${date}`;
            break;
        case 'Weekly':
            url = `/api/get-horoscope/weekly?sign=${signName}`;
            break;
        case 'Monthly':
            url = `/api/get-horoscope/monthly?sign=${signName}`;
            break;
        default:
            throw new Error(`Invalid period: ${period}`);
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API request failed with status ${response.status}: ${errorText}`);
        }
        const data = await response.json();
        
        // The API response nests the data, so we access it via data.data
        const horoscope = data?.data?.horoscope_data || "The celestial energies are quiet. No horoscope found.";
        
        return horoscope;

    } catch (error) {
        console.error('Error fetching or parsing horoscope from API:', error);
        throw new Error('A cosmic disturbance interfered with the prediction. Please try again.');
    }
};

export const generateLuckyNumber = (sign: ZodiacSignName, date: string): string => {
    // Create a deterministic seed from sign and date
    const input = `${sign.toLowerCase()}-${date}`;
    
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Ensure positive number and convert to 4-digit range (1000-9999)
    const positiveHash = Math.abs(hash);
    const luckyNumber = (positiveHash % 9000) + 1000;
    
    return luckyNumber.toString();
}; 