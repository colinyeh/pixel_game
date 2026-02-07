import axios from 'axios';

const API_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

export const fetchQuestions = async (count = 5) => {
    // Mock data if no API URL provided (for testing)
    if (!API_URL) {
        console.warn("NO API URL PROVIDED. USING MOCK DATA.");
        return [
            { id: '1', question: 'What is 1+1?', options: ['1', '2', '3', '4'], answer: '2' },
            { id: '2', question: 'What is 2+2?', options: ['3', '4', '5', '6'], answer: '4' },
            { id: '3', question: 'Pixel Art is?', options: ['Retro', 'Modern', 'Vector', '3D'], answer: 'Retro' },
        ].slice(0, count);
    }

    try {
        const response = await axios.get(`${API_URL}?action=getQuestions&count=${count}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching questions:", error);
        throw error;
    }
};

export const submitScore = async (id, score, passed) => {
    if (!API_URL) {
        console.log("Mock Submit:", { id, score, passed });
        return { success: true };
    }

    try {
        const timeTaken = 0;
        const response = await axios.post(`${API_URL}?action=submitScore`, JSON.stringify({
            action: 'submitScore',
            id,
            score,
            passed,
            timeTaken
        }), {
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            }
        });
        console.log("GAS Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error submitting score:", error);
        throw error;
    }
};
