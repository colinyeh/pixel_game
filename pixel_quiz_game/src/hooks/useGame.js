import { useState, useEffect } from 'react';
import { fetchQuestions, submitScore } from '../services/googleSheets';

export const useGame = () => {
    const [gameState, setGameState] = useState('start'); // start, playing, finished, error
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userAnswers, setUserAnswers] = useState([]); // Array of { question, userAnswer, correctAnswer, isCorrect }

    const PASS_THRESHOLD = Number(import.meta.env.VITE_PASS_THRESHOLD) || 3;
    const QUESTION_COUNT = Number(import.meta.env.VITE_QUESTION_COUNT) || 5;

    const startGame = async (id) => {
        if (!id) return;
        setUserId(id);
        setLoading(true);
        setError('');

        try {
            const data = await fetchQuestions(QUESTION_COUNT);
            if (data && data.length > 0) {
                setQuestions(data);
                setGameState('playing');
                setCurrentQuestionIndex(0);
                setScore(0);
                setUserAnswers([]);
            } else {
                setError('No questions found.');
                setGameState('error');
            }
        } catch (err) {
            setError('Failed to load questions. Check connection.');
            setGameState('error');
        } finally {
            setLoading(false);
        }
    };

    const submitAnswer = (selectedOption) => {
        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = selectedOption === currentQuestion.answer;

        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        const answerData = {
            question: currentQuestion.question,
            userAnswer: selectedOption,
            correctAnswer: currentQuestion.answer,
            isCorrect: isCorrect
        };

        setUserAnswers(prev => [...prev, answerData]);

        // Move to next or finish
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            finishGame(score + (isCorrect ? 1 : 0)); // Pass updated score
        }
    };

    const finishGame = async (finalScore) => {
        setLoading(true);
        const passed = finalScore >= PASS_THRESHOLD;

        try {
            await submitScore(userId, finalScore, passed);
            setGameState('finished');
        } catch (err) {
            console.error(err);
            setError('Failed to submit score. But game finished.');
            setGameState('finished'); // Show result anyway
        } finally {
            setLoading(false);
        }
    };

    const resetGame = () => {
        setGameState('start');
        setQuestions([]);
        setScore(0);
        setCurrentQuestionIndex(0);
        setUserId('');
        setUserAnswers([]);
    };

    return {
        gameState,
        questions,
        currentQuestionIndex,
        score,
        loading,
        error,
        userId,
        startGame,
        submitAnswer,
        resetGame,
        userAnswers,
        currentQuestion: questions[currentQuestionIndex]
    };
};
