import React from 'react';

import '../../css/misc/Icon.css'

const style: React.CSSProperties = {
    width: '1em',
    height: '1em',
}

export const Plus: React.FC = () => {
    return (
        <div className="Plus" style={style}></div>
    );        
};

export const Minus: React.FC = () => {
    return (
        <div className="Minus" style={style}></div>
    );
}

export const Submit: React.FC = () => {
    return (
        <div className="Submit" style={style}></div>
    );
}