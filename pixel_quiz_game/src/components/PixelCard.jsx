import React from 'react';
import './PixelCard.css';

const PixelCard = ({ children, className = '', title }) => {
    return (
        <div className={`pixel-card ${className}`}>
            {title && <div className="pixel-card-title">{title}</div>}
            <div className="pixel-card-content">
                {children}
            </div>
        </div>
    );
};

export default PixelCard;
