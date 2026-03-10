import { useState, useEffect } from 'react';
import './App.css';
import PixelCard from './components/PixelCard';
import PixelButton from './components/PixelButton';
import Avatar from './components/Avatar';
import { useGame } from './hooks/useGame';

function App() {
    const {
        gameState,
        score,
        currentQuestionIndex,
        questions,
        currentQuestion,
        loading,
        error,
        startGame,
        submitAnswer,
        resetGame,
        userAnswers
    } = useGame();

    const [inputID, setInputID] = useState('');
    const [showReview, setShowReview] = useState(false);

    const handleStart = () => {
        if (inputID.trim()) {
            startGame(inputID);
        }
    };

    const handleRestart = () => {
        resetGame();
        setInputID('');
        setShowReview(false);
    };

    if (loading) {
        return (
            <div className="app-container">
                <PixelCard title="Loading..." className="loading-card">
                    <div className="loading-spinner">GETTING READY...</div>
                </PixelCard>
            </div>
        );
    }

    if (error) {
        return (
            <div className="app-container">
                <PixelCard title="Error">
                    <p>{error}</p>
                    <PixelButton onClick={handleRestart} variant="danger">TRY AGAIN</PixelButton>
                </PixelCard>
            </div>
        );
    }

    return (
        <div className="app-container">
            {gameState === 'start' && (
                <div className="screen-home">
                    <h1>PIXEL QUIZ</h1>
                    <div className="intro-avatar">
                        <Avatar seed={inputID || 'guest'} size={120} className="avatar-intro" />
                    </div>
                    <PixelCard className="login-card" title="IDENTIFICATION">
                        <input
                            type="text"
                            className="pixel-input"
                            placeholder="ENTER PLAYER ID"
                            value={inputID}
                            onChange={(e) => setInputID(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                        />
                        <PixelButton
                            onClick={handleStart}
                            disabled={!inputID.trim()}
                            className="start-btn"
                        >
                            INSERT COIN (START)
                        </PixelButton>
                    </PixelCard>
                </div>
            )}

            {gameState === 'playing' && currentQuestion && (
                <div className="screen-game">
                    <div className="game-header">
                        <span>LEVEL {currentQuestionIndex + 1}/{questions.length}</span>
                        <span>SCORE: {score}00s</span>
                    </div>

                    <div className="question-container">
                        <PixelCard className="question-card" title={`QUESTION`}>
                            <div className="question-text">
                                {currentQuestion.question}
                            </div>
                        </PixelCard>
                    </div>

                    <div className="options-grid">
                        {currentQuestion.options.map((option, idx) => (
                            <PixelButton
                                key={idx}
                                onClick={() => submitAnswer(option)}
                                className="option-btn"
                                variant="secondary"
                            >
                                {option}
                            </PixelButton>
                        ))}
                    </div>
                </div>
            )}

            {gameState === 'finished' && (
                <div className="screen-result">
                    <PixelCard title="MISSION REPORT" className="report-card">
                        <div className="result-layout">
                            <div className="result-stats">
                                <h2>FINAL SCORE</h2>
                                <div className="score-display">{score} / {questions.length}</div>

                                <div className="result-avatar">
                                    <Avatar seed={inputID} size={60} />
                                </div>

                                <p className="result-message">
                                    {score >= (Number(import.meta.env.VITE_PASS_THRESHOLD) || 3)
                                        ? "PASS! YOU'RE A LEGEND."
                                        : "FAIL. CONTINUE?"}
                                </p>

                                <PixelButton onClick={handleRestart} variant="success" className="play-again-btn">
                                    PLAY AGAIN
                                </PixelButton>
                            </div>

                            <div className="review-list">
                                {userAnswers.map((ans, idx) => (
                                    <div key={idx} className={`review-item ${ans.isCorrect ? 'correct' : 'incorrect'}`}>
                                        <div className="review-q">{idx + 1}. {ans.question}</div>
                                        <div className="review-a">
                                            <span className="answer-label">YOURS:</span> {ans.userAnswer}
                                        </div>
                                        {!ans.isCorrect && (
                                            <div className="review-a">
                                                <span className="answer-label">CORRECT:</span> {ans.correctAnswer}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </PixelCard>
                </div>
            )}
        </div>
    );
}

export default App;
