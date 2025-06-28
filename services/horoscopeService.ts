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