import React from 'react';

import '../css/Header.css';


interface HeaderProps {
    numberOfPpl: number;
}

const Header: React.FC<HeaderProps> = (props) => {
    const pplPropectedDescr = props.numberOfPpl ? (props.numberOfPpl + ' people protected') : '';

    return (
        <header>
            <div>Privacy Protector</div>
            <div>{pplPropectedDescr}</div>
        </header>
    );
}

export default Header;