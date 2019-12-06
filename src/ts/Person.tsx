import React from 'react';

import { Minus, Plus } from './misc/Icon';

import '../css/Person.css';

export interface PersonDTO {
    first_name: string;
    last_name: string;
    age: number;
    city_or_cc: string;
    risk_percentage: number;
}

export interface PersonProps {
    first_name: string;
    last_name: string;
    age: number;
    city_or_cc: string;
    risk_percentage: number;
    expanded?: boolean;
    onClick(): void;
}

const Person: React.FC<PersonProps> = (props) => {
    const fullName = props.first_name + ' ' + props.last_name;
    const expanded = props.expanded;

    return (
        <div className="Person" onClick={(ev) => props.onClick()}>
            <div className="topDescr">
                <div className="name">{fullName}</div>
                {expanded ? <Minus/> : <Plus/>}
            </div>
            {expanded  &&
            <div className="botDescr">
                <div className="botDescrSection">
                    <div>Age:</div>
                    <div>{props.age}</div>
                </div>
                <div className="botDescrSection">
                    <div>City or country code:</div>
                    <div>{props.city_or_cc}</div>
                    <div>Privacy Risk:</div>
                    <div>{'' + props.risk_percentage + '%'}</div>
                </div>
            </div>
            }
        </div>
    );
}

export default Person;