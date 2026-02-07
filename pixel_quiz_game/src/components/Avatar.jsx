import React from 'react';

const Avatar = ({ seed, size = 100, className = '' }) => {
    // Use DiceBear Pixel Art
    const url = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffdfbf,ffd5dc`;

    return (
        <div className={`pixel-avatar ${className}`} style={{ width: size, height: size, display: 'inline-block' }}>
            <img src={url} alt="Avatar" style={{ width: '100%', height: '100%', imageRendering: 'pixelated' }} />
        </div>
    );
};

export default Avatar;
